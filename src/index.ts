import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { config } from "./config/config";
import { createTaskRoutes } from "./routes/task.routes";
import { errorHandler } from "./middleware/errorHandler";
import { ApiResponse } from "./types/api.types";

const app: Express = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req: Request, res: Response) => {
  const response: ApiResponse<{ status: string }> = {
    success: true,
    data: { status: "OK" },
  };
  res.json(response);
});

app.use("/api/tasks", createTaskRoutes(prisma));
app.use((_req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: false,
    error: "Endpoint not found",
  };
  res.status(404).json(response);
});
app.use(errorHandler);

process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 TaskMaster Pro API running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
});

export default app;
