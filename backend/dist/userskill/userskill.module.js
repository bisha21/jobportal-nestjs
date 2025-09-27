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
exports.UserskillModule = void 0;
const common_1 = require("@nestjs/common");
const userskill_service_1 = require("./userskill.service");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
const userskill_controller_1 = require("./userskill.controller");
let UserskillModule = class UserskillModule {
};
exports.UserskillModule = UserskillModule;
exports.UserskillModule = UserskillModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                secret: jwt_config_1.default.secret,
                signOptions: { expiresIn: jwt_config_1.default.expiresIn },
            }),
        ],
        providers: [userskill_service_1.UserSkillService],
        controllers: [userskill_controller_1.UserSkillController],
    })
], UserskillModule);
//# sourceMappingURL=userskill.module.js.map