import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env.local" });
// src/index.ts
import { createServer } from "./api/server";

createServer();