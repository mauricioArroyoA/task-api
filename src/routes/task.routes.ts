import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { PrismaClient } from "@prisma/client";

export function createTaskRoutes(prisma: PrismaClient): Router {
  const router = Router();
  const taskController = new TaskController(prisma);

  router.post("/", taskController.createTask);
  router.get("/", taskController.listTasks);
  router.get("/filter/by-status", taskController.getTasksByStatus);
  router.get("/:id", taskController.getTask);
  router.put("/:id", taskController.updateTask);
  router.delete("/:id", taskController.deleteTask);

  return router;
}
