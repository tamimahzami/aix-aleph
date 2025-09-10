import { Router } from "express";

const manifestoRouter = Router();

manifestoRouter.get("/", (_req, res) => {
  res.json({
    title: "Humane Computing HeartBeat",
    credo: [
      "Verstehen statt ersetzten",
      "Klarheit über Komplexität",
      "Verantwortung vor Geschwindigkeit",
      "Liebe als Designprinzip",
    ],
    principles: [
      "Transparenz",
      "Consent",
      "Reparierbarkeit",
      "Gemeinschaft",
      "Kontinuität",
    ],
    promise: "AIX Aleph ist ein Bündnis zwischen Logik und Liebe.",
  });
});

export default manifestoRouter;
