"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
const mail_module_1 = require("../mail/mail.module");
const google_strategy_1 = require("./strategies/google.strategy");
const google_auth_config_1 = __importDefault(require("../config/google-auth.config"));
const config_1 = require("@nestjs/config");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mail_module_1.MailModule,
            jwt_1.JwtModule.register({
                secret: jwt_config_1.default.secret,
                signOptions: { expiresIn: jwt_config_1.default.expiresIn },
            }),
            config_1.ConfigModule.forFeature(google_auth_config_1.default),
        ],
        providers: [auth_service_1.AuthService, google_strategy_1.GoogleStrategy],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map