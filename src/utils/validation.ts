import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  description: z.string().max(5000, "Description must be 5000 characters or less").optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title must not be empty")
    .max(200, "Title must be 200 characters or less")
    .optional(),
  description: z.string().max(5000, "Description must be 5000 characters or less").optional(),
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
});

export const taskFilterSchema = z.object({
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  offset: z.coerce.number().min(0).optional().default(0),
});
