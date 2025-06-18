import "dotenv/config";

// Export database connection
export { db, pool } from "./db";

// Export schema
export * from "./schema";

// Export commonly used Drizzle ORM functions
export * from "drizzle-orm";

// Export types
export type { AnyPgTable, PgTableWithColumns } from "drizzle-orm/pg-core";

// Export SSL config if needed
export { createSSLConfig } from "./ssl-config";
