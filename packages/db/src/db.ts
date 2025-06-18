import Logger from "@app/logger";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { z } from "zod";
import * as schema from "./schema";

const logger = Logger.createLogger({ prefix: "database" });
console.log("process env database url", process.env.DATABASE_URL);
// Environment validation
const envSchema = z.object({
  DATABASE_URL: z.string({
    required_error: "DATABASE_URL is required in environment variables",
  }),
  SSL_CA_PATH: z.string().optional(),
  SSL_CERT_PATH: z.string().optional(),
  SSL_KEY_PATH: z.string().optional(),
  PGSSLMODE: z.string().optional(),
});

const env = envSchema.parse(process.env);

// Create database connection pool
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  // ssl: createSSLConfig(env),
});

// Connection event handlers
pool.on("connect", (client) => {
  logger.success("✅ Connected to PostgreSQL with SSL");
  logger.info("🔐 SSL State:", client.ssl ? "Enabled" : "Disabled");
});

pool.on("error", (err) => {
  logger.error("❌ Database connection error:", err);
});

export const db = drizzle(pool, { schema });
export { pool };
