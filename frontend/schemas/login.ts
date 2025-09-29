import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
