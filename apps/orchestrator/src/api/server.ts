// src/api/server.ts
import express from "express";
import { env } from "../core/env";
import { logger } from "../core/logger";
import { router } from "./routes";

export function createServer() {
  const app = express();

  app.use(express.json());
  app.use("/v1", router);

  app.use(
    (
      err: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      logger.error("Unhandled error:", err);
      const status = err.status || 500;
      res.status(status).json({
        error: err.message ?? "Internal server error",
      });
    }
  );

  app.listen(env.PORT, () => {
    logger.info(`Orchestrator listening on port ${env.PORT}`);
  });
}
