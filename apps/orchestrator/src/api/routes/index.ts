// src/api/routes/index.ts
import { Router } from "express";
import { healthRouter } from "./health";
import { tasksRouter } from "./tasks";

export const router = Router();

router.use("/health", healthRouter);
router.use("/tasks", tasksRouter);
