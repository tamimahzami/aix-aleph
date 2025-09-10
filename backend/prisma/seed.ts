// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ---- Mandanten-Kontext setzen (RLS)
  const companyId = 'demo-company';
  await prisma.$executeRawUnsafe(
    `SELECT set_config('app.current_company_id', $1, true)`,
    companyId
  );

  // ---- Company anlegen/aktualisieren
  const company = await prisma.company.upsert({
    where: { id: companyId },
    update: { name: 'Demo Company' },
    create: {
      id: companyId,
      name: 'Demo Company',
      type: 'FLEET_OPERATOR',
      status: 'ACTIVE',
      timezone: 'Europe/Berlin',
      locale: 'de-DE',
    },
  });

  // ---- Fleet
  const fleet = await prisma.fleet.upsert({
    where: { id: 'fleet-demo-1' },
    update: { name: 'Demo Fleet' },
    create: {
      id: 'fleet-demo-1',
      name: 'Demo Fleet',
      type: 'DELIVERY',
      status: 'ACTIVE',
      companyId: company.id,
    },
  });

  // ---- User (wird Owner der Experiments)
  const email = 'demo@example.com';
  const passwordHash = await bcrypt.hash('secret', 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: { name: 'Demo', isActive: true, companyId: company.id },
    create: {
      email,
      name: 'Demo',
      password: passwordHash,
      role: 'VIEWER',
      isActive: true,
      companyId: company.id,
    },
  });

  // ---- Vehicle (optional)
  const vehicle = await prisma.vehicle.upsert({
    where: { id: 'veh-demo-1' },
    update: { name: 'Sprinter 1' },
    create: {
      id: 'veh-demo-1',
      name: 'Sprinter 1',
      type: 'VAN',
      model: 'MB Sprinter',
      status: 'AVAILABLE',
      ownerId: user.id,
      fleetId: fleet.id,
      capacity: 12,
    },
  });

  // ---- Experiment + Arms
  const experiment = await prisma.experiment.create({
    data: {
      name: 'Investor Demo LIVE',
      description: 'Initial A/B mit 50/50 Split.',
      type: 'A_B_TESTING',      // normalisiert
      status: 'RUNNING',
      strategy: 'STATIC',
      notes: 'Seeded via prisma/seed.ts',
      ownerId: user.id,
      companyId: company.id,
      vehicleId: vehicle.id,
      // mobilitätsbezogene optionale Felder
      vehicleType: 'VAN',
      environment: 'URBAN',
      weatherConditions: 'clear',
      trafficConditions: 'moderate',
      arms: {
        create: [
          {
            name: 'A',
            aiModelId: null,
            modelVersion: 'v1',
            initialSplit: 50,
            minSplit: null,
            maxSplit: null,
            isChampion: true,
            maxSpeed: 80,
            accelerationRate: 2.5,
            brakingBehavior: 'normal',
            routingStrategy: 'shortest',
            energyOptimization: true,
          },
          {
            name: 'B',
            aiModelId: null,
            modelVersion: 'v1',
            initialSplit: 50,
            minSplit: null,
            maxSplit: null,
            isChampion: false,
            maxSpeed: 80,
            accelerationRate: 2.5,
            brakingBehavior: 'normal',
            routingStrategy: 'eco',
            energyOptimization: true,
          },
        ],
      },
    },
    include: { arms: true },
  });

  // ---- Metrics
  await prisma.metric.createMany({
    data: [
      { experimentId: experiment.id, key: 'csat', value: 0.87, unit: null },
      { experimentId: experiment.id, key: 'latency_p95_ms', value: 120, unit: 'ms' },
      { experimentId: experiment.id, key: 'cost_per_req_eur', value: 0.0019, unit: 'EUR' },
    ],
  });

  console.log('✅ Seed done:', {
    company: company.id,
    fleet: fleet.id,
    user: user.email,
    experiment: experiment.id,
    arms: experiment.arms.map(a => a.name),
  });
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
