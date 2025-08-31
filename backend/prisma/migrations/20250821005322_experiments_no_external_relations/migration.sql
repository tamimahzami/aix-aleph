-- CreateTable
CREATE TABLE "Experiment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organizationId" TEXT,
    "createdById" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'AB',
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

-- CreateTable
CREATE TABLE "ExperimentArm" (
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
    CONSTRAINT "ExperimentArm_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExperimentMetricDefinition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experimentId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'CUSTOM',
    "higherIsBetter" BOOLEAN NOT NULL DEFAULT true,
    "targetValue" REAL,
    "pThreshold" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExperimentMetricDefinition_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExperimentAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experimentId" TEXT NOT NULL,
    "armId" TEXT NOT NULL,
    "correlationId" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExperimentAssignment_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExperimentAssignment_armId_fkey" FOREIGN KEY ("armId") REFERENCES "ExperimentArm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExperimentObservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experimentId" TEXT NOT NULL,
    "armId" TEXT NOT NULL,
    "metricKey" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "dimension" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExperimentObservation_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExperimentObservation_armId_fkey" FOREIGN KEY ("armId") REFERENCES "ExperimentArm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExperimentResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experimentId" TEXT NOT NULL,
    "armId" TEXT NOT NULL,
    "metricKey" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "mean" REAL,
    "p95" REAL,
    "stddev" REAL,
    "pValue" REAL,
    "winner" BOOLEAN NOT NULL DEFAULT false,
    "computedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExperimentResult_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExperimentResult_armId_fkey" FOREIGN KEY ("armId") REFERENCES "ExperimentArm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Experiment_organizationId_status_idx" ON "Experiment"("organizationId", "status");

-- CreateIndex
CREATE INDEX "Experiment_aiModelId_idx" ON "Experiment"("aiModelId");

-- CreateIndex
CREATE INDEX "Experiment_routeId_idx" ON "Experiment"("routeId");

-- CreateIndex
CREATE INDEX "Experiment_pricingModelId_idx" ON "Experiment"("pricingModelId");

-- CreateIndex
CREATE INDEX "ExperimentArm_experimentId_idx" ON "ExperimentArm"("experimentId");

-- CreateIndex
CREATE INDEX "ExperimentArm_aiModelId_idx" ON "ExperimentArm"("aiModelId");

-- CreateIndex
CREATE INDEX "ExperimentMetricDefinition_experimentId_idx" ON "ExperimentMetricDefinition"("experimentId");

-- CreateIndex
CREATE UNIQUE INDEX "ExperimentMetricDefinition_experimentId_key_key" ON "ExperimentMetricDefinition"("experimentId", "key");

-- CreateIndex
CREATE INDEX "ExperimentAssignment_experimentId_armId_idx" ON "ExperimentAssignment"("experimentId", "armId");

-- CreateIndex
CREATE INDEX "ExperimentAssignment_correlationId_idx" ON "ExperimentAssignment"("correlationId");

-- CreateIndex
CREATE INDEX "ExperimentObservation_experimentId_armId_metricKey_idx" ON "ExperimentObservation"("experimentId", "armId", "metricKey");

-- CreateIndex
CREATE INDEX "ExperimentObservation_timestamp_idx" ON "ExperimentObservation"("timestamp");

-- CreateIndex
CREATE INDEX "ExperimentResult_experimentId_metricKey_idx" ON "ExperimentResult"("experimentId", "metricKey");

-- CreateIndex
CREATE UNIQUE INDEX "ExperimentResult_experimentId_armId_metricKey_key" ON "ExperimentResult"("experimentId", "armId", "metricKey");
