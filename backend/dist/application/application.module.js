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
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const application_service_1 = require("./application.service");
const application_controller_1 = require("./application.controller");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
const job_module_1 = require("../job/job.module");
const company_module_1 = require("../company/company.module");
const notification_module_1 = require("../notification/notification.module");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => job_module_1.JobModule),
            database_module_1.DatabaseModule,
            company_module_1.CompanyModule,
            notification_module_1.NotificationModule,
            jwt_1.JwtModule.register({
                secret: jwt_config_1.default.secret,
                signOptions: { expiresIn: jwt_config_1.default.expiresIn },
            }),
        ],
        providers: [application_service_1.ApplicationService],
        controllers: [application_controller_1.ApplicationController],
        exports: [application_service_1.ApplicationService],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map