// Beispiel in src/index.js (Express)
app.get("/api/dashboard", async (req, res) => {
  const experiments = await prisma.experiment.findMany({
    include: { arms: true },
    orderBy: { createdAt: "desc" },
  });
  const running = experiments.filter(e => e.status === "RUNNING").length;
  const lastExperiments = experiments.slice(0, 6).map(e => ({
    id: e.id,
    name: e.name,
    status: e.status,
    arms: (e.arms || []).map(a => a.name).join(", "),
    createdAt: e.createdAt,
  }));
  res.json({
    backend: "OK",
    env: process.env.NODE_ENV || "development",
    base: "/api",
    counts: { experiments: experiments.length, running },
    lastExperiments,
  });
});
