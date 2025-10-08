/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: DatabaseService) {}

  async getDashboardData() {
    const [
      totals,
      growth,
      jobs,
      companies,
      applications,
      favorites,
      communication,
    ] = await Promise.all([
      this.getTotals(),
      this.getGrowthTrends(),
      this.getJobPerformance(),
      this.getTopCompanies(),
      this.getApplicationInsights(),
      this.getFavoriteStats(),
      this.getCommunicationStats(),
    ]);

    return {
      totals,
      growth,
      jobs,
      companies,
      applications,
      favorites,
      communication,
    };
  }

  private async getTotals() {
    const [
      totalUsers,
      totalCompanies,
      totalJobs,
      totalApplications,
      totalFavorites,
      totalMessages,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.company.count(),
      this.prisma.job.count(),
      this.prisma.application.count(),
      this.prisma.favorite.count(),
      this.prisma.message.count(),
    ]);

    return {
      totalUsers,
      totalCompanies,
      totalJobs,
      totalApplications,
      totalFavorites,
      totalMessages,
    };
  }

  private async getGrowthTrends() {
    const userGrowth = await this.prisma.$queryRaw`
      SELECT DATE_TRUNC('month', "createdAt") AS month, COUNT(*) AS count
      FROM "User"
      GROUP BY month
      ORDER BY month ASC;
    `;
    const jobGrowth = await this.prisma.$queryRaw`
      SELECT DATE_TRUNC('month', "createdAt") AS month, COUNT(*) AS count
      FROM "Job"
      GROUP BY month
      ORDER BY month ASC;
    `;
    return { userGrowth, jobGrowth };
  }

  private async getJobPerformance() {
    const topJobs = await this.prisma.application.groupBy({
      by: ['jobId'],
      _count: { jobId: true },
      orderBy: { _count: { jobId: 'desc' } },
      take: 5,
    });

    const jobDetails = await this.prisma.job.findMany({
      where: { id: { in: topJobs.map((j) => j.jobId) } },
      include: { company: true },
    });

    return topJobs.map((j) => ({
      job: jobDetails.find((d) => d.id === j.jobId),
      applications: j._count.jobId,
    }));
  }

  private async getTopCompanies() {
    return await this.prisma.company.findMany({
      select: { name: true, logoUrl: true, _count: { select: { jobs: true } } },
      orderBy: { jobs: { _count: 'desc' } },
      take: 5,
    });
  }

  private async getApplicationInsights() {
    const total = await this.prisma.application.count();
    const grouped = await this.prisma.application.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const formatted = grouped.reduce(
      (acc, cur) => {
        acc[cur.status] = Number(cur._count.id); // ensure number
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total,
      ...formatted,
      approvalRate: total ? ((formatted.APPROVED || 0) / total) * 100 : 0,
    };
  }

  private async getFavoriteStats() {
    return await this.prisma.favorite.groupBy({
      by: ['jobId'],
      _count: { jobId: true },
      orderBy: { _count: { jobId: 'desc' } },
      take: 5,
    });
  }

  private async getCommunicationStats() {
    const totalMessages = await this.prisma.message.count();
    const unread = await this.prisma.message.count({ where: { read: false } });

    return { totalMessages, unread };
  }
}
