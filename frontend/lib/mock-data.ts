// Mock data for the dashboard
export type UserRole = 'JOBSEEKER' | 'EMPLOYEE' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  profilePicture?: string;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  website?: string;
  industry?: string;
  size?: string;
  logo?: string;
  ownerId: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  position: string;
  location: string;
  experience: string;
  salary?: string;
  jobType: string;
  deadline?: Date;
  companyId: string;
  categoryId?: string;
  userId: string;
  createdAt: Date;
  company?: Company;
  category?: Category;
  _count?: {
    applications: number;
  };
}

export interface Application {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  resume?: string;
  jobId: string;
  userId: string;
  createdAt: Date;
  job?: Job;
  user?: User;
}

export interface Conversation {
  id: string;
  jobSeekerId: string;
  employeeId: string;
  createdAt: Date;
  jobSeeker?: User;
  employee?: User;
  messages?: Message[];
  _count?: {
    messages: number;
  };
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  createdAt: Date;
  sender?: User;
}

// Mock current user - change role to test different dashboards
export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'EMPLOYEE', // Change to 'ADMIN' to test admin dashboard
  phone: '+1234567890',
  bio: 'Experienced HR professional',
  createdAt: new Date('2024-01-01'),
};

// Mock users
export const mockUsers: User[] = [
  mockCurrentUser,
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'JOBSEEKER',
    phone: '+1234567891',
    bio: 'Software engineer with 5 years experience',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'ADMIN',
    phone: '+1234567892',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'user-4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'EMPLOYEE',
    phone: '+1234567893',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'user-5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'JOBSEEKER',
    phone: '+1234567894',
    bio: 'Marketing specialist looking for new opportunities',
    createdAt: new Date('2024-02-15'),
  },
];

// Mock companies
export const mockCompanies: Company[] = [
  {
    id: 'company-1',
    name: 'Tech Corp',
    description: 'Leading technology company',
    location: 'San Francisco, CA',
    website: 'https://techcorp.com',
    industry: 'Technology',
    size: '1000-5000',
    logo: '/tech-company-logo.jpg',
    ownerId: 'user-1',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 'company-2',
    name: 'Design Studio',
    description: 'Creative design agency',
    location: 'New York, NY',
    website: 'https://designstudio.com',
    industry: 'Design',
    size: '50-200',
    logo: '/design-studio-logo.png',
    ownerId: 'user-1',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'company-3',
    name: 'Finance Solutions',
    description: 'Financial services provider',
    location: 'Chicago, IL',
    website: 'https://financesolutions.com',
    industry: 'Finance',
    size: '500-1000',
    logo: '/finance-company-logo.png',
    ownerId: 'user-4',
    createdAt: new Date('2024-02-05'),
  },
];

// Mock categories
export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Software Development',
    userId: 'user-1',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'cat-2',
    name: 'Design',
    userId: 'user-1',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: 'cat-3',
    name: 'Marketing',
    userId: 'user-1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'cat-4',
    name: 'Finance',
    userId: 'user-4',
    createdAt: new Date('2024-02-10'),
  },
];

// Mock jobs
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced frontend developer...',
    position: 'Senior Developer',
    location: 'San Francisco, CA',
    experience: '5+ years',
    salary: '$120,000 - $150,000',
    jobType: 'FULL_TIME',
    deadline: new Date('2024-12-31'),
    companyId: 'company-1',
    categoryId: 'cat-1',
    userId: 'user-1',
    createdAt: new Date('2024-03-01'),
    _count: { applications: 15 },
  },
  {
    id: 'job-2',
    title: 'UX Designer',
    description: 'Join our creative team as a UX designer...',
    position: 'Mid-level Designer',
    location: 'New York, NY',
    experience: '3+ years',
    salary: '$90,000 - $110,000',
    jobType: 'FULL_TIME',
    deadline: new Date('2024-11-30'),
    companyId: 'company-2',
    categoryId: 'cat-2',
    userId: 'user-1',
    createdAt: new Date('2024-03-05'),
    _count: { applications: 8 },
  },
  {
    id: 'job-3',
    title: 'Marketing Manager',
    description: 'Lead our marketing initiatives...',
    position: 'Manager',
    location: 'Remote',
    experience: '4+ years',
    salary: '$100,000 - $130,000',
    jobType: 'REMOTE',
    deadline: new Date('2024-10-31'),
    companyId: 'company-1',
    categoryId: 'cat-3',
    userId: 'user-1',
    createdAt: new Date('2024-03-10'),
    _count: { applications: 12 },
  },
  {
    id: 'job-4',
    title: 'Financial Analyst',
    description: 'Analyze financial data and provide insights...',
    position: 'Analyst',
    location: 'Chicago, IL',
    experience: '2+ years',
    salary: '$70,000 - $90,000',
    jobType: 'FULL_TIME',
    deadline: new Date('2024-09-30'),
    companyId: 'company-3',
    categoryId: 'cat-4',
    userId: 'user-4',
    createdAt: new Date('2024-03-15'),
    _count: { applications: 6 },
  },
];

// Mock applications
export const mockApplications: Application[] = [
  {
    id: 'app-1',
    status: 'PENDING',
    resume: '/resumes/jane-smith.pdf',
    jobId: 'job-1',
    userId: 'user-2',
    createdAt: new Date('2024-03-20'),
  },
  {
    id: 'app-2',
    status: 'APPROVED',
    resume: '/resumes/charlie-brown.pdf',
    jobId: 'job-1',
    userId: 'user-5',
    createdAt: new Date('2024-03-21'),
  },
  {
    id: 'app-3',
    status: 'PENDING',
    resume: '/resumes/jane-smith.pdf',
    jobId: 'job-2',
    userId: 'user-2',
    createdAt: new Date('2024-03-22'),
  },
  {
    id: 'app-4',
    status: 'REJECTED',
    resume: '/resumes/charlie-brown.pdf',
    jobId: 'job-3',
    userId: 'user-5',
    createdAt: new Date('2024-03-23'),
  },
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    jobSeekerId: 'user-2',
    employeeId: 'user-1',
    createdAt: new Date('2024-03-25'),
    _count: { messages: 5 },
  },
  {
    id: 'conv-2',
    jobSeekerId: 'user-5',
    employeeId: 'user-1',
    createdAt: new Date('2024-03-26'),
    _count: { messages: 3 },
  },
];

// Mock messages
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    content: 'Hi, I have a question about the Frontend Developer position.',
    senderId: 'user-2',
    conversationId: 'conv-1',
    createdAt: new Date('2024-03-25T10:00:00'),
  },
  {
    id: 'msg-2',
    content: 'Sure, I would be happy to help. What would you like to know?',
    senderId: 'user-1',
    conversationId: 'conv-1',
    createdAt: new Date('2024-03-25T10:15:00'),
  },
  {
    id: 'msg-3',
    content: 'What is the tech stack for this position?',
    senderId: 'user-2',
    conversationId: 'conv-1',
    createdAt: new Date('2024-03-25T10:20:00'),
  },
];

// Helper functions to get data with relationships
export function getJobsWithRelations(userId?: string): Job[] {
  const jobs = userId
    ? mockJobs.filter((job) => job.userId === userId)
    : mockJobs;

  return jobs.map((job) => ({
    ...job,
    company: mockCompanies.find((c) => c.id === job.companyId),
    category: mockCategories.find((c) => c.id === job.categoryId),
  }));
}

export function getApplicationsWithRelations(userId?: string): Application[] {
  const userJobs = userId
    ? mockJobs.filter((job) => job.userId === userId)
    : mockJobs;
  const userJobIds = userJobs.map((job) => job.id);

  const applications = userId
    ? mockApplications.filter((app) => userJobIds.includes(app.jobId))
    : mockApplications;

  return applications.map((app) => ({
    ...app,
    job: getJobsWithRelations().find((j) => j.id === app.jobId),
    user: mockUsers.find((u) => u.id === app.userId),
  }));
}

export function getConversationsWithRelations(userId?: string): Conversation[] {
  const conversations = userId
    ? mockConversations.filter((conv) => conv.employeeId === userId)
    : mockConversations;

  return conversations.map((conv) => ({
    ...conv,
    jobSeeker: mockUsers.find((u) => u.id === conv.jobSeekerId),
    employee: mockUsers.find((u) => u.id === conv.employeeId),
    messages: mockMessages.filter((m) => m.conversationId === conv.id),
  }));
}

export function getCompaniesForUser(userId: string): Company[] {
  return mockCompanies.filter((c) => c.ownerId === userId);
}

export function getCategoriesForUser(userId: string): Category[] {
  return mockCategories.filter((c) => c.userId === userId);
}
