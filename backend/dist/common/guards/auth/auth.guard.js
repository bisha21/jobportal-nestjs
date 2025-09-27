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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const database_service_1 = require("../../../database/database.service");
let JwtAuthGuard = class JwtAuthGuard {
    jwtService;
    prisma;
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        const token = authHeader?.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Unauthorized: No token provided');
        }
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.prisma.user.findUnique({
                where: { id: decoded.userId },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Unauthorized: User not found');
            }
            console.log(user);
            request['user'] = user;
            return true;
        }
        catch (err) {
            console.error(err.message);
            throw new common_1.UnauthorizedException('Unauthorized: Invalid token');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        database_service_1.DatabaseService])
], JwtAuthGuard);
//# sourceMappingURL=auth.guard.js.map