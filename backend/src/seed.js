import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.experiment.count();
  if (existing > 0) {
    console.log(`Seed skipped (already ${existing} experiments).`);
    return;
  }

  await prisma.experiment.createMany({
    data: [
      { name: 'E-Mobility Pilot – Aachen', status: 'RUNNING',   arms: 3 },
      { name: 'Smart Charging Alpha',      status: 'COMPLETED', arms: 2 },
      { name: 'Fleet Routing – Beta',      status: 'DRAFT',     arms: 4 },
      { name: 'Energy Forecast v0.2',      status: 'CANCELLED', arms: 1 },
      { name: 'Investor Demo',             status: 'RUNNING',   arms: 2 }
    ]
  });

  console.log('Seed done.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
