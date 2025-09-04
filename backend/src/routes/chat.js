// src/routes/chat.js
import { Router } from "express";
import { prisma } from "../db/index.js";
import { llmReply } from "../llm/index.js";
import { successResponse, errorResponse } from "../utils.js";

export const chatRouter = Router();

/**
 * POST /api/chat
 * Body: { provider?: "gemini"|"openai", sessionId?: string, message: string }
 * Achtung: /api/chat ist im server.js bereits mit authMiddleware geschützt → req.user ist gesetzt.
 */
chatRouter.post("/", async (req, res) => {
  const { provider = "gemini", sessionId, message } = req.body;
  const userId = req.user?.id;

  if (!userId) return errorResponse(res, 401, "User not authenticated.");
  if (!message || typeof message !== "string") {
    return errorResponse(res, 400, "message required");
  }

  try {
    // Session holen oder anlegen
    let session;
    if (sessionId) {
      session = await prisma.chatSession.findFirst({
        where: { id: sessionId, userId },
      });
      if (!session) return errorResponse(res, 404, "Chat session not found.");
    } else {
      session = await prisma.chatSession.create({
        data: { userId, title: message.substring(0, 50) },
      });
    }

    // Verlauf laden
    const prior = await prisma.message.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: "asc" },
    });

    const history = [
      ...prior.map(m => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    // LLM call (non-streaming)
    const out = await llmReply({ provider, messages: history, stream: false });

    // Nachrichten speichern (ohne userId, das Feld existiert im Message-Modell nicht)
    await prisma.$transaction(async (tx) => {
      await tx.message.create({
        data: { sessionId: session.id, role: "user", content: message },
      });
      await tx.message.create({
        data: {
          sessionId: session.id,
          role: "assistant",
          content: out.text || "",
          provider: out.provider,
          tokensIn: out.tokensIn ?? null,
          tokensOut: out.tokensOut ?? null,
          latencyMs: out.latencyMs ?? null,
        },
      });
    });

    return successResponse(res, {
      sessionId: session.id,
      reply: out.text || "",
      metrics: {
        provider: out.provider,
        tokensIn: out.tokensIn ?? undefined,
        tokensOut: out.tokensOut ?? undefined,
        latencyMs: out.latencyMs ?? undefined,
      },
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return errorResponse(res, 500, "Internal server error");
  }
});

/**
 * GET /api/chat/stream/:sessionId
 * Einfache SSE-Ausgabe: streamt die Antwort als Event-Stream (ein Chunk oder mehrere).
 * Im jetzigen Stand holen wir eine *finale* Antwort vom LLM und streamen sie.
 * Später kannst du echtes Token-Streaming implementieren (providerabhängig).
 */
chatRouter.get("/stream/:sessionId", async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return errorResponse(res, 401, "User not authenticated.");

  const { sessionId } = req.params;
  const provider = (req.query.provider || "gemini").toString();

  // SSE-Header
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  // Helper zum Senden
  const send = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });
    if (!session) {
      send("error", { message: "Chat session not found" });
      return res.end();
    }

    // “Letzte Nutzerfrage” bestimmen (oder eine leere Frage streamen)
    const lastUser = [...session.messages].reverse().find(m => m.role === "user");
    const userMessage = lastUser?.content || "";

    const history = session.messages.map(m => ({ role: m.role, content: m.content }));
    if (!lastUser) {
      // zur Not: ein Ping
      history.push({ role: "user", content: "Hello" });
    }

    const out = await llmReply({ provider, messages: history, stream: false });
    const text = out.text || "";

    // (Optional) in Chunks streamen – hier einfach grob 300-Zeichen-Chunks
    const chunkSize = 300;
    for (let i = 0; i < text.length; i += chunkSize) {
      send("message", { chunk: text.slice(i, i + chunkSize) });
    }

    // Done event + Metriken
    send("done", {
      sessionId,
      provider: out.provider,
      tokensIn: out.tokensIn ?? undefined,
      tokensOut: out.tokensOut ?? undefined,
      latencyMs: out.latencyMs ?? undefined,
    });
  } catch (err) {
    console.error("SSE stream error:", err);
    send("error", { message: "Internal server error" });
  } finally {
    res.end();
  }
});
