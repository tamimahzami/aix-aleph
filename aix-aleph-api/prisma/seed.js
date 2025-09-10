// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  // Clean
  await prisma.metric.deleteMany().catch(() => {});
  await prisma.arm.deleteMany().catch(() => {});
  await prisma.experiment.deleteMany().catch(() => {});
  // Optional: Users nur seeden, wenn du möchtest:
  // await prisma.user.deleteMany().catch(() => {});

  const rows = [
    { name: "Investor Demo 1", status: "DRAFT" },
    { name: "Investor Demo 2", status: "RUNNING" },
    { name: "Test 1",          status: "DRAFT" },
    { name: "Cohort Lift",     status: "RUNNING" },
  ];

  for (const r of rows) {
    await prisma.experiment.create({
      data: {
        name: r.name,
        status: r.status,     // String-Status (kein Enum)
        type: "AB",
        strategy: "FIXED",
        arms: {
          create: [
            { name: "A", weight: 0.5 },
            { name: "B", weight: 0.5 },
          ],
        },
      },
    });
  }

  console.log("✅ Seed done.");
}

run()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
