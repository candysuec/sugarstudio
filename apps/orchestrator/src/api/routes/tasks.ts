// src/api/routes/tasks.ts
import { Router } from "express";
import { logger } from "../../core/logger";
import { runDemoTask } from "../../tasks";

export const tasksRouter = Router();

tasksRouter.post("/demo", async (_req, res, next) => {
  try {
    logger.info("Received demo task");
    const result = await runDemoTask();
    res.json({ ok: true, result });
  } catch (err) {
    next(err);
  }
});
