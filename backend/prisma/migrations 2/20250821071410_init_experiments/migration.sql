/*
  Warnings:

  - You are about to drop the `ExperimentAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExperimentObservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExperimentResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `higherIsBetter` on the `ExperimentMetricDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `pThreshold` on the `ExperimentMetricDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `targetValue` on the `ExperimentMetricDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ExperimentMetricDefinition` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ExperimentMetricDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ExperimentAssignment_correlationId_idx";

-- DropIndex
DROP INDEX "ExperimentAssignment_experimentId_armId_idx";

-- DropIndex
DROP INDEX "ExperimentObservation_timestamp_idx";

-- DropIndex
DROP INDEX "ExperimentObservation_experimentId_armId_metricKey_idx";

-- DropIndex
DROP INDEX "ExperimentResult_experimentId_armId_metricKey_key";

-- DropIndex
DROP INDEX "ExperimentResult_experimentId_metricKey_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExperimentAssignment";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExperimentObservation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExperimentResult";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experiment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organizationId" TEXT,
    "createdById" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "strategy" TEXT NOT NULL DEFAULT 'FIXED',
    "aiModelId" TEXT,
    "routeId" TEXT,
    "pricingModelId" TEXT,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "notes" TEXT,
    "decision" TEXT NOT NULL DEFAULT 'UNDECIDED',
    "decisionReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Experiment" ("aiModelId", "createdAt", "createdById", "decision", "decisionReason", "description", "endTime", "id", "name", "notes", "organizationId", "pricingModelId", "routeId", "startTime", "status", "strategy", "type", "updatedAt") SELECT "aiModelId", "createdAt", "createdById", "decision", "decisionReason", "description", "endTime", "id", "name", "notes", "organizationId", "pricingModelId", "routeId", "startTime", "status", "strategy", "type", "updatedAt" FROM "Experiment";
DROP TABLE "Experiment";
ALTER TABLE "new_Experiment" RENAME TO "Experiment";
CREATE INDEX "Experiment_type_idx" ON "Experiment"("type");
CREATE INDEX "Experiment_status_idx" ON "Experiment"("status");
CREATE INDEX "Experiment_strategy_idx" ON "Experiment"("strategy");
CREATE TABLE "new_ExperimentArm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experimentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aiModelId" TEXT,
    "initialSplit" INTEGER NOT NULL DEFAULT 50,
    "minSplit" INTEGER,
    "maxSplit" INTEGER,
    "isChampion" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExperimentArm_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExperimentArm" ("aiModelId", "createdAt", "experimentId", "id", "initialSplit", "isChampion", "maxSplit", "minSplit", "name", "updatedAt") SELECT "aiModelId", "createdAt", "experimentId", "id", "initialSplit", "isChampion", "maxSplit", "minSplit", "name", "updatedAt" FROM "ExperimentArm";
DROP TABLE "ExperimentArm";
ALTER TABLE "new_ExperimentArm" RENAME TO "ExperimentArm";
CREATE INDEX "ExperimentArm_experimentId_idx" ON "ExperimentArm"("experimentId");
CREATE INDEX "ExperimentArm_aiModelId_idx" ON "ExperimentArm"("aiModelId");
CREATE TABLE "new_ExperimentMetricDefinition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experimentId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExperimentMetricDefinition_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExperimentMetricDefinition" ("createdAt", "experimentId", "id", "key") SELECT "createdAt", "experimentId", "id", "key" FROM "ExperimentMetricDefinition";
DROP TABLE "ExperimentMetricDefinition";
ALTER TABLE "new_ExperimentMetricDefinition" RENAME TO "ExperimentMetricDefinition";
CREATE INDEX "ExperimentMetricDefinition_experimentId_idx" ON "ExperimentMetricDefinition"("experimentId");
CREATE UNIQUE INDEX "ExperimentMetricDefinition_experimentId_key_key" ON "ExperimentMetricDefinition"("experimentId", "key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
