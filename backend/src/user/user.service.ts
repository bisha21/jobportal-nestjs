/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}
  async findAllUsers() {
    return await this.prisma.user.findMany({
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
  }

  async findUserById(id: number) {
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

    return user;
  }
}
