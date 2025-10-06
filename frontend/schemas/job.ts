import { z } from 'zod';

export enum JobType {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  INTERN = 'INTERN',
  REMOTE = 'REMOTE',
}

export const createJobSchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
  position: z.string().nonempty('Position is required'),
  location: z.string().optional(),
  experience: z.string().nonempty('Experience is required'),

  // ✅ Automatically converts string to number
  salaryMin: z.coerce
    .number()
    .int()
    .min(0, 'Minimum salary must be at least 0'),
  salaryMax: z.coerce
    .number()
    .int()
    .min(0, 'Maximum salary must be at least 0'),

  type: z.nativeEnum(JobType).optional(),

  // ✅ Use string for date inputs, not datetime (HTML <input type="date" /> gives string)
  deadline: z.coerce.date().optional(),

  // ✅ Coerce string to number for numeric fields
  companyId: z.coerce.number().int().nonnegative('Company ID is required'),
  categoryId: z.coerce.number().int().nonnegative('Category ID is required'),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
