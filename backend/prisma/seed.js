const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // alles leeren
  await prisma.metric.deleteMany({});
  await prisma.arm.deleteMany({});
  await prisma.experiment.deleteMany({});

  // Experiment A
  const expA = await prisma.experiment.create({
    data: {
      name: "Experiment A",
      description: "Seeded from script",
      type: "AB",
      status: "DRAFT",
      strategy: "FIXED",
      arms: {
        create: [
          { name: "A", initialSplit: 50, isChampion: true },
          { name: "B", initialSplit: 50 }
        ]
      }
    },
    include: { arms: true }
  });

  await prisma.metric.createMany({
    data: [
      { experimentId: expA.id, armId: expA.arms[0].id, key: "ctr", value: 0.12 },
      { experimentId: expA.id, armId: expA.arms[1].id, key: "ctr", value: 0.10 }
    ]
  });

  // Experiment B
  const expB = await prisma.experiment.create({
    data: {
      name: "Experiment B",
      description: "Demo dataset",
      type: "AB",
      status: "RUNNING",
      strategy: "FIXED",
      arms: {
        create: [
          { name: "Control", initialSplit: 60, isChampion: true },
          { name: "Variant", initialSplit: 40 }
        ]
      }
    },
    include: { arms: true }
  });

  await prisma.metric.createMany({
    data: [
      { experimentId: expB.id, armId: expB.arms[0].id, key: "revenue", value: 123.45 },
      { experimentId: expB.id, armId: expB.arms[1].id, key: "revenue", value: 111.11 }
    ]
  });

  console.log("✅ Seed done");
}

main().finally(() => prisma.$disconnect());
