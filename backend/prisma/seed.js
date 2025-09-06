// --- replace your seedExperimentIfPossible with this version ---
async function seedExperimentIfPossible() {
  const hasExperiment = hasModel("experiment");
  const hasArm        = hasModel("arm");      // ok if it exists; not required by Metric
  const hasMetric     = hasModel("metric");

  if (!hasExperiment || !hasMetric) {
    console.log("⏭️  Experiment/Metric Models fehlen – überspringe.");
    return;
  }

  // 1) Experiment sicherstellen
  let exp = await prisma.experiment.findFirst({ where: { name: "Demo Experiment" } });
  if (!exp) {
    exp = await prisma.experiment.create({
      data: {
        name: "Demo Experiment",
        // falls du Enums hast, hier ergänzen:
        // status: "RUNNING",
        // type: "AB",
        // strategy: "FIXED",
      },
    });
  }

  // 2) (Optional) Arme anlegen – NICHT für Metric nötig, nur Demo-Daten
  if (hasArm) {
    const upsertArm = async (name, initialSplit) => {
      let arm = await prisma.arm.findFirst({ where: { experimentId: exp.id, name } });
      if (!arm) {
        arm = await prisma.arm.create({ data: { experimentId: exp.id, name, initialSplit } });
      }
      return arm;
    };
    await upsertArm("A", 60);
    await upsertArm("B", 40);
  }

  // 3) Metrics pro Experiment (ohne armId) – unterschiedliche Keys für A/B
  const ensureMetric = async (key, value) => {
    let metric = await prisma.metric.findFirst({
      where: { experimentId: exp.id, key },
    });
    if (metric) {
      await prisma.metric.update({
        where: { id: metric.id },
        data: { value },
      });
    } else {
      await prisma.metric.create({
        data: { experimentId: exp.id, key, value },
      });
    }
  };

  await ensureMetric("ctr_A", 0.12);
  await ensureMetric("ctr_B", 0.10);

  console.log("✅ Experiment + Metrics (ctr_A / ctr_B) seeded.");
}
