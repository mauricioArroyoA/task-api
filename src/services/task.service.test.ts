import { TaskService } from "../services/task.service";
import { PrismaClient } from "@prisma/client";
import { CreateTaskInput, Task } from "../types/task.types";

describe("TaskService", () => {
  let taskService: TaskService;
  let mockPrisma: Partial<PrismaClient>;

  beforeEach(() => {
    // Mock Prisma client
    mockPrisma = {
      task: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
    };

    taskService = new TaskService(mockPrisma as PrismaClient);
  });

  describe("createTask", () => {
    it("should create a task with valid input", async () => {
      const input: CreateTaskInput = {
        title: "Test Task",
        description: "Test Description",
      };

      const mockTask: Task = {
        id: "1",
        ...input,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrisma.task!.create as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskService.createTask(input);

      expect(result).toEqual(mockTask);
      expect(mockPrisma.task!.create).toHaveBeenCalledWith({
        data: {
          title: input.title,
          description: input.description,
        },
      });
    });

    it("should create a task without description", async () => {
      const input: CreateTaskInput = {
        title: "Test Task",
      };

      const mockTask: Task = {
        id: "1",
        title: input.title,
        description: null,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrisma.task!.create as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskService.createTask(input);

      expect(result.title).toBe(input.title);
      expect(result.description).toBeNull();
    });
  });

  describe("getTaskById", () => {
    it("should return a task if it exists", async () => {
      const mockTask: Task = {
        id: "1",
        title: "Test Task",
        description: "Test Description",
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrisma.task!.findUnique as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskService.getTaskById("1");

      expect(result).toEqual(mockTask);
    });

    it("should throw error if task not found", async () => {
      (mockPrisma.task!.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(taskService.getTaskById("invalid")).rejects.toThrow(
        "Task with ID invalid not found"
      );
    });
  });

  describe("listTasks", () => {
    it("should return all tasks with default pagination", async () => {
      const mockTasks: Task[] = [
        {
          id: "1",
          title: "Task 1",
          description: null,
          status: "PENDING",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (mockPrisma.task!.findMany as jest.Mock).mockResolvedValue(mockTasks);

      const result = await taskService.listTasks({});

      expect(result).toEqual(mockTasks);
      expect(mockPrisma.task!.findMany).toHaveBeenCalledWith({
        where: {},
        take: 10,
        skip: 0,
        orderBy: { createdAt: "desc" },
      });
    });

    it("should filter tasks by status", async () => {
      const mockTasks: Task[] = [];

      (mockPrisma.task!.findMany as jest.Mock).mockResolvedValue(mockTasks);

      await taskService.listTasks({ status: "COMPLETED" });

      expect(mockPrisma.task!.findMany).toHaveBeenCalledWith({
        where: { status: "COMPLETED" },
        take: 10,
        skip: 0,
        orderBy: { createdAt: "desc" },
      });
    });
  });

  describe("deleteTask", () => {
    it("should delete a task", async () => {
      const mockTask: Task = {
        id: "1",
        title: "Task to delete",
        description: null,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrisma.task!.findUnique as jest.Mock).mockResolvedValue(mockTask);
      (mockPrisma.task!.delete as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskService.deleteTask("1");

      expect(result).toEqual(mockTask);
      expect(mockPrisma.task!.delete).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });
  });
});
