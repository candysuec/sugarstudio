// src/tasks/index.ts
import { runDemoWorker } from "./workers/demoWorker";

export async function runDemoTask() {
  return runDemoWorker();
}
