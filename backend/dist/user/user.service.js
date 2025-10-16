"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const redis_service_1 = require("../redis/redis.service");
let UserService = class UserService {
    prisma;
    redis;
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async findAllUsers() {
        const cached = await this.redis.get('users:all');
        if (cached) {
            return JSON.parse(cached);
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
    async findUserById(id) {
        const cache = await this.redis.get(`user:${id}`);
        if (cache) {
            return JSON.parse(cache);
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
            throw new common_1.NotFoundException('User not found');
        }
        await this.redis.set(`user:${id}`, JSON.stringify(user), 600);
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        redis_service_1.RedisService])
], UserService);
//# sourceMappingURL=user.service.js.map