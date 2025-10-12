/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: DatabaseService) {}

  async getDashboardData(employeeId?: number) {
    const [
      totals,
      growth,
      topJobs,
      topCompanies,
      applications,
      recentApplications,
    ] = await Promise.all([
      this.getTotals(employeeId),
      this.getGrowthTrends(employeeId),
      this.getTopJobs(employeeId),
      this.getTopCompanies(employeeId),
      this.getApplicationInsights(employeeId),
      this.getRecentApplications(employeeId),
    ]);

    return {
      totals,
      growth,
      topJobs,
      topCompanies,
      applications,
      recentApplications,
    };
  }

  private async getTotals(employeeId?: number) {
    if (employeeId) {
      const [totalCompanies, totalJobs, totalApplications] = await Promise.all([
        this.prisma.company.count({ where: { ownerId: employeeId } }),
        this.prisma.job.count({
          where: { company: { ownerId: employeeId } },
        }),
        this.prisma.application.count({
          where: { job: { company: { ownerId: employeeId } } },
        }),
      ]);

      return { totalCompanies, totalJobs, totalApplications };
    } else {
      const [totalUsers, totalCompanies, totalJobs, totalApplications] =
        await Promise.all([
          this.prisma.user.count(),
          this.prisma.company.count(),
          this.prisma.job.count(),
          this.prisma.application.count(),
        ]);

      return { totalUsers, totalCompanies, totalJobs, totalApplications };
    }
  }

  private async getGrowthTrends(employeeId?: number) {
    const userGrowth: { month: string; count: number }[] = [];
    let jobGrowth: { month: string; count: number }[] = [];

    if (employeeId) {
      const raw: { month: Date; count: bigint }[] = await this.prisma.$queryRaw`
          SELECT DATE_TRUNC('month', "createdAt") AS month, COUNT(*) AS count
          FROM "Job"
          WHERE "companyId" IN (
            SELECT id FROM "Company" WHERE "ownerId" = ${employeeId}
          )
          GROUP BY month
          ORDER BY month ASC;
        `;
      jobGrowth = raw.map((r) => ({
        month: r.month.toISOString(),
        count: Number(r.count),
      }));
    } else {
      const rawUsers: { month: Date; count: bigint }[] = await this.prisma
        .$queryRaw`
          SELECT DATE_TRUNC('month', "createdAt") AS month, COUNT(*) AS count
          FROM "User"
          GROUP BY month
          ORDER BY month ASC;
        `;

      const rawJobs: { month: Date; count: bigint }[] = await this.prisma
        .$queryRaw`
          SELECT DATE_TRUNC('month', "createdAt") AS month, COUNT(*) AS count
          FROM "Job"
          GROUP BY month
          ORDER BY month ASC;
        `;

      userGrowth.push(
        ...rawUsers.map((r) => ({
          month: r.month.toISOString(),
          count: Number(r.count),
        })),
      );
      jobGrowth.push(
        ...rawJobs.map((r) => ({
          month: r.month.toISOString(),
          count: Number(r.count),
        })),
      );
    }

    return { userGrowth, jobGrowth };
  }

  private async getTopJobs(employeeId?: number) {
    const whereFilter = employeeId
      ? { job: { company: { ownerId: employeeId } } }
      : {};

    const topJobs = await this.prisma.application.groupBy({
      by: ['jobId'],
      _count: { jobId: true },
      orderBy: { _count: { jobId: 'desc' } },
      take: 5,
      where: whereFilter,
    });

    if (topJobs.length === 0) return [];

    const jobIds = topJobs.map((j) => j.jobId);
    const jobs = await this.prisma.job.findMany({
      where: { id: { in: jobIds } },
      include: { company: true },
    });

    return topJobs.map((j) => {
      const job = jobs.find((d) => d.id === j.jobId);
      return {
        title: job?.title || 'Unknown',
        company: job?.company?.name || 'Unknown',
        applications: Number(j._count.jobId),
      };
    });
  }

  private async getTopCompanies(employeeId?: number) {
    const whereFilter = employeeId ? { ownerId: employeeId } : undefined;

    const companies = await this.prisma.company.findMany({
      where: whereFilter,
      select: { name: true, logoUrl: true, _count: { select: { jobs: true } } },
      orderBy: { jobs: { _count: 'desc' } },
      take: 5,
    });

    return companies.map((c) => ({
      name: c.name,
      logoUrl: c.logoUrl,
      jobCount: Number(c._count.jobs),
    }));
  }

  private async getApplicationInsights(employeeId?: number) {
    const whereFilter = employeeId
      ? { job: { company: { ownerId: employeeId } } }
      : undefined;

    const total = await this.prisma.application.count({ where: whereFilter });

    const grouped = await this.prisma.application.groupBy({
      by: ['status'],
      _count: { id: true },
      where: whereFilter,
    });

    const formatted = grouped.reduce(
      (acc, cur) => {
        acc[cur.status] = Number(cur._count.id);
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total,
      PENDING: formatted.PENDING || 0,
      REJECTED: formatted.REJECTED || 0,
      APPROVED: formatted.APPROVED || 0,
    };
  }

  private async getRecentApplications(employeeId?: number) {
    const whereFilter = employeeId
      ? { job: { company: { ownerId: employeeId } } }
      : undefined;

    const recent = await this.prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      where: whereFilter,
      include: { user: true, job: true },
    });

    return recent.map((app) => ({
      applicant: app.user.fullName,
      email: app.user.email,
      jobTitle: app.job.title,
      status: app.status,
      appliedAt: app.createdAt.toISOString(),
    }));
  }
}
