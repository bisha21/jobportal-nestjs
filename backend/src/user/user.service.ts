/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly redis: RedisService,
  ) {}
  async findAllUsers() {
    const cached = await this.redis.get('users:all');
    if (cached) {
      return JSON.parse(cached) as ReturnType<typeof this.prisma.user.findMany>;
    }
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        profile: true,
        role: true,
        resume: true,
        phoneNumber: true,
      },
    });
    await this.redis.set('users:all', JSON.stringify(users), 600);
    return users;
  }

  async findUserById(id: number) {
    const cache = await this.redis.get(`user:${id}`);
    if (cache) {
      return JSON.parse(cache) as ReturnType<
        typeof this.prisma.user.findUnique
      >;
    }
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        applications: {
          include: {
            job: {
              select: {
                title: true,
                company: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.redis.set(`user:${id}`, JSON.stringify(user), 600);

    return user;
  }
}
