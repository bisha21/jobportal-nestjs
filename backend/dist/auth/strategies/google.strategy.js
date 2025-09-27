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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("../auth.service");
const google_auth_config_1 = __importDefault(require("../../config/google-auth.config"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const generateAuthToken_1 = require("../../utils/generateAuthToken");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    googleConfiguration;
    authService;
    jwtService;
    constructor(googleConfiguration, authService, jwtService) {
        super({
            clientID: googleConfiguration.clientId,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackUrl,
            scope: ['email', 'profile'],
        });
        this.googleConfiguration = googleConfiguration;
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async validate(accessToken, refreshToken, profile) {
        const { emails, name, photos } = profile;
        const email = emails?.[0]?.value;
        if (!email) {
            throw new common_1.UnauthorizedException('No email found in Google profile');
        }
        let user = await this.authService.findUserByEmail(email);
        if (!user) {
            user = await this.authService.registerOAuthUser({
                email,
                fullName: `${name?.givenName} ${name?.familyName}`,
                profile: photos?.[0]?.value,
            });
        }
        const token = (0, generateAuthToken_1.generateAuthToken)(this.jwtService, {
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            ...user,
            token,
        };
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(google_auth_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0, auth_service_1.AuthService,
        jwt_1.JwtService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map