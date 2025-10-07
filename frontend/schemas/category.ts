import z from 'zod';

export const categorySchema = z.object({
  categoryName: z.string().nonempty('Name is required'),
});

export type createCategoryInput = z.infer<typeof categorySchema>;
