import { z } from 'zod';

export const createCompanySchema = z
  .object({
    name: z.string().nonempty({ message: 'name is required' }),
    description: z.string().nonempty({ message: 'description is required' }),
    location: z.string().nonempty({ message: 'location is required' }),
    website: z
      .string()
      .url({ message: 'website must be a valid URL' })
      .optional(),
    industry: z.string().nonempty({ message: 'industry is required' }),
    companySize: z.string().nonempty({ message: 'companySize is required' }),
  })
  .strict();

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
