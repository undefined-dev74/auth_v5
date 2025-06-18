import { db } from "@app/db";
import Logger from "@app/logger";

import { createServer } from "node:http";

const port = process.env.PORT || 5001;
const server = createServer();

const logger = Logger.createLogger({ prefix: "server" });

server.listen(port, async () => {
  logger.success(`API server running on port ${port}`);

  try {
    const userCount = await db.query.users.findMany();
    logger.info(`Database connected. Current users: ${userCount.length}`);
  } catch (error) {
    logger.error("Database connection failed:", error);
  }
});
