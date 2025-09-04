// src/db/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
    },
  });

  await prisma.experiment.deleteMany();
  await prisma.experiment.createMany({
    data: [
      { name: "Website A/B Test", status: "Active", arms: 2 },
      { name: "New Feature Rollout", status: "Draft", arms: 3 },
    ],
  });

  await prisma.lead.deleteMany();
  await prisma.lead.createMany({
    data: [
      { email: "john.doe@example.com", name: "John Doe" },
      { email: "jane.smith@example.com", name: "Jane Smith" },
    ],
  });
  
  // Füge diesen Code hier ein:
  // Professoren (mit ❤️)
  await prisma.professor.deleteMany();
  await prisma.professor.createMany({
    data: [
      {
        name: "Prof. Dr. Ada Lovelace",
        title: "Lehrstuhl für KI",
        university: "TU AIX",
        department: "Informatik",
        bio: "Forschung zu E-Mobility, Routenplanung, Smart Charging und fairen Modellen.",
        avatarUrl: "https://i.pravatar.cc/256?img=65",
        tagsCsv: "AI,Routing,Charging,Optimization,Explainability",
      },
      {
        name: "Prof. Dr. Alan Turing",
        title: "Cognitive Systems",
        university: "Uni Aleph",
        department: "Data Science",
        bio: "Zeitreihen, Prognosen, robuste ML-Pipelines. Mag schöne Loss-Kurven und saubere Daten 😄",
        avatarUrl: "https://i.pravatar.cc/256?img=15",
        tagsCsv: "Forecasting,TimeSeries,MLPipelines,Robustness",
      },
      {
        name: "Prof. Dr. Grace Hopper",
        title: "Systems Engineering",
        university: "AIX Institute of Technology",
        department: "Software Systems",
        bio: "Skalierbare Plattformen, Observability und Developer Experience mit Herz.",
        avatarUrl: "https://i.pravatar.cc/256?img=68",
        tagsCsv: "Platforms,DX,Observability,APIs",
      },
      {
        name: "Prof. Dr. Katherine Johnson",
        title: "Applied Mathematics",
        university: "Aleph University",
        department: "Mathematics",
        bio: "Numerik, Optimierung und Validierung – damit Modelle verlässlich landen ✈️",
        avatarUrl: "https://i.pravatar.cc/256?img=47",
        tagsCsv: "Numerics,Optimization,Validation",
      },
      {
        name: "Prof. Dr. Barbara Liskov",
        title: "Software Architecture",
        university: "TU AIX",
        department: "Informatik",
        bio: "Modulare Systeme, saubere Schnittstellen und wartbare Code-Basen.",
        avatarUrl: "https://i.pravatar.cc/256?img=32",
        tagsCsv: "Architecture,Modularity,APIDesign",
      },
      {
        name: "Prof. Dr. Donald Knuth",
        title: "Algorithms & Text",
        university: "Uni Aleph",
        department: "Computer Science",
        bio: "Algorithmen, Schönheit im Code und ❤️ für Typografie.",
        avatarUrl: "https://i.pravatar.cc/256?img=13",
        tagsCsv: "Algorithms,Complexity,Typography",
      },
    ],
  });

  console.log("✅ Seed done.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
