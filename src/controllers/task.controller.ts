import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { PrismaClient } from "@prisma/client";
import { asyncHandler, ApiError } from "../middleware/errorHandler";
import {
  createTaskSchema,
  updateTaskSchema,
  taskFilterSchema,
} from "../utils/validation";
import { ApiResponse, PaginatedResponse } from "../types/api.types";
import { Task } from "../types/task.types";

/**
 * Controller for task endpoints, following RESTful conventions with precise HTTP status codes.
 */
export class TaskController {
  private taskService: TaskService;

  constructor(prisma: PrismaClient) {
    this.taskService = new TaskService(prisma);
  }

  /**
   * Create a new task.
   * Status: 201 Created
   */
  createTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validatedData = createTaskSchema.parse(req.body);
    const task = await this.taskService.createTask(validatedData);

    const response: ApiResponse<Task> = {
      success: true,
      data: task,
      message: "Task created successfully",
    };
    res.status(201).json(response);
  });

  /**
   * Get a task by ID.
   * Status: 200 OK, 404 Not Found if task doesn't exist
   */
  getTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Task ID is required");
    }

    const task = await this.taskService.getTaskById(id as string);

    if (!task) {
      // Explicitly returning 404 if the task is not found
      throw new ApiError(404, "Task not found");
    }

    const response: ApiResponse<Task> = {
      success: true,
      data: task,
    };
    res.status(200).json(response);
  });

  /**
   * List tasks with filters and pagination.
   * Status: 200 OK
   */
  listTasks = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validatedFilters = taskFilterSchema.parse(req.query);
    const tasks = await this.taskService.listTasks(validatedFilters);
    const total = await this.taskService.getTaskCount(validatedFilters);

    const response: PaginatedResponse<Task> = {
      success: true,
      data: tasks,
      total,
      limit: validatedFilters.limit ?? 10,
      offset: validatedFilters.offset ?? 0,
    };
    res.status(200).json(response);
  });

  /**
   * Update a task.
   * Status: 200 OK if updated, 404 Not Found if task doesn't exist
   */
  updateTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Task ID is required");
    }

    const validatedData = updateTaskSchema.parse(req.body);
    const task = await this.taskService.updateTask(id as string, validatedData);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    const response: ApiResponse<Task> = {
      success: true,
      data: task,
      message: "Task updated successfully",
    };
    res.status(200).json(response);
  });

  /**
   * Delete a task.
   * Status: 204 No Content if deleted, 404 Not Found if not found
   */
  deleteTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Task ID is required");
    }

    const task = await this.taskService.deleteTask(id as string);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    // 204 No Content with no body per RESTful convention
    res.status(204).send();
  });

  /**
   * Get tasks by status filter.
   * Status: 200 OK
   */
  getTasksByStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { status } = req.query;

    if (!status || (status !== "PENDING" && status !== "COMPLETED")) {
      throw new ApiError(400, 'Status must be either "PENDING" or "COMPLETED"');
    }

    const tasks = await this.taskService.getTasksByStatus(
      status as "PENDING" | "COMPLETED"
    );

    const response: ApiResponse<Task[]> = {
      success: true,
      data: tasks,
    };
    res.status(200).json(response);
  });
}
