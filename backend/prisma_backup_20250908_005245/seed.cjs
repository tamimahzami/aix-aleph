// prisma/seed.cjs
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // 1) Company
  await prisma.company.upsert({
    where: { id: 'demo-company' },
    update: {},
    create: {
      id: 'demo-company',
      name: 'Demo Company',
      type: 'FLEET_OPERATOR',
      status: 'ACTIVE',
      // optional je nach Schema:
      // timezone: 'Europe/Berlin',
      // locale: 'de-DE',
    },
  });

  // 2) Demo-User (wichtig: passwordHash!)
  const hashedPassword = await bcrypt.hash('secret', 10);

  await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      passwordHash: hashedPassword,
      name: 'Demo User',
      role: 'VIEWER',
      companyId: 'demo-company',
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => { console.error('❌ Fehler beim Seeding:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
