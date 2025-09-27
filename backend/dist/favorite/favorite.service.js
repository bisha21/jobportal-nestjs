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
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let FavoriteService = class FavoriteService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addFavorite(dto, userId) {
        const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        return this.prisma.favorite.create({ data: { userId, jobId: dto.jobId } });
    }
    async getFavorites(userId) {
        return this.prisma.favorite.findMany({ where: { userId } });
    }
    async deleteFavorite(favoriteId) {
        const favorite = await this.prisma.favorite.findUnique({
            where: { id: favoriteId },
        });
        if (!favorite)
            throw new common_1.NotFoundException('Favorite not found');
        return this.prisma.favorite.delete({ where: { id: favoriteId } });
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map