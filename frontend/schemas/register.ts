// src/schema/user.schema.ts
import { z } from 'zod';

export const createUserSchema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    // confirmPassword: z.string().min(6, 'Confirm your password'),
    resume: z.string().optional(),
    profile: z.string().optional(),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    bio: z.string().optional(),
  })
  // .refine((data) => data.password === data.confirmPassword, {
  //   path: ['confirmPassword'],
  //   message: 'Passwords do not match',
  // });

export type CreateUserInput = z.infer<typeof createUserSchema>;
