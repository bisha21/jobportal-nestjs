/* eslint-disable prettier/prettier */
import { Prisma } from '../../../generated/prisma';

export const mockJobs: Prisma.JobCreateInput[] = [
  {
    title: 'Frontend Developer',
    description: 'Build responsive web apps',
    position: 'Frontend',
    location: 'San Francisco',
    experience: '2+ years',
    salaryMin: 50000,
    salaryMax: 70000,
    type: 'FULLTIME',
    createdAt: new Date(),
    updatedAt: new Date(),
    company: { connect: { id: 101 } },
    category: { connect: { id: 201 } },
    jobSkills: { create: [] },
    applications: { create: [] },
    favorites: { create: [] },
  },
  {
    title: 'Backend Developer',
    description: 'Build scalable APIs',
    position: 'Backend',
    location: 'New York',
    experience: '3+ years',
    salaryMin: 60000,
    salaryMax: 90000,
    type: 'FULLTIME',
    createdAt: new Date(),
    updatedAt: new Date(),
    company: { connect: { id: 102 } },
    category: { connect: { id: 202 } },
    jobSkills: { create: [] },
    applications: { create: [] },
    favorites: { create: [] },
  },
];
