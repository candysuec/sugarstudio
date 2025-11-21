// src/tasks/workers/demoWorker.ts
import { logger } from "../../core/logger";
import { prisma } from "../../core/prisma";

export async function runDemoWorker() {
  logger.info("Running demo worker…");
  // Example query just to ensure Prisma + DB is wired
  const now = await prisma.$queryRaw`SELECT NOW()`;
  logger.info("DB responded with:", now);
  return { timestamp: now };
}
