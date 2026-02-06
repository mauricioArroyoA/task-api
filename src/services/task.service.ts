import { PrismaClient } from "@prisma/client";
import {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskFilterOptions,
} from "../types/task.types";
import { ApiError } from "../middleware/errorHandler";

export class TaskService {
  constructor(private prisma: PrismaClient) {}

  async createTask(input: CreateTaskInput): Promise<Task> {
    return await this.prisma.task.create({
      data: {
        title: input.title,
        description: input.description || null,
      },
    });
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new ApiError(404, `Task with ID ${id} not found`);
    }

    return task;
  }

  async listTasks(options: TaskFilterOptions): Promise<Task[]> {
    const { status, limit = 10, offset = 0 } = options;

    return await this.prisma.task.findMany({
      where: status ? { status } : {},
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getTaskCount(options: TaskFilterOptions): Promise<number> {
    const { status } = options;

    return await this.prisma.task.count({
      where: status ? { status } : {},
    });
  }

  async updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
    await this.getTaskById(id);

    return await this.prisma.task.update({
      where: { id },
      data: {
        ...(input.title && { title: input.title }),
        ...(input.description !== undefined && {
          description: input.description,
        }),
        ...(input.status && { status: input.status }),
      },
    });
  }

  async deleteTask(id: string): Promise<Task> {
    await this.getTaskById(id);

    return await this.prisma.task.delete({
      where: { id },
    });
  }

  async getTasksByStatus(status: "PENDING" | "COMPLETED"): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: { status },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
