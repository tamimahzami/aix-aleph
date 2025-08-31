// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1) Experiment
  const exp = await prisma.experiment.create({
    data: {
      name: 'Router A/B – NLP',
      type: 'AB',
      status: 'RUNNING',
      targetRoute: 'customer_support',
      notes: 'Initial A/B mit 50/50 Split.',
      variants: {
        create: [
          { name: 'Champion', weight: 50, metadata: { model: 'Gemini-Pro v1.2' } },
          { name: 'Challenger', weight: 50, metadata: { model: 'GPT-4 v4.0' } },
        ],
      },
    },
    include: { variants: true },
  });

  // 2) Metriken
  await prisma.experimentMetric.createMany({
    data: [
      { experimentId: exp.id, metricName: 'csat', value: 0.87 },
      { experimentId: exp.id, metricName: 'latency_p95_ms', value: 120 },
      { experimentId: exp.id, metricName: 'cost_per_req_eur', value: 0.0019 },
    ],
  });

  // 3) Traffic-Events (optional)
  await prisma.trafficEvent.createMany({
    data: [
      { experimentId: exp.id, variantId: exp.variants[0].id, count: 520 },
      { experimentId: exp.id, variantId: exp.variants[1].id, count: 505 },
    ],
  });

  console.log('Seeded experiment:', exp.id);
}

main().finally(() => prisma.$disconnect());
