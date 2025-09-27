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
exports.JobskillModule = void 0;
const common_1 = require("@nestjs/common");
const jobskill_service_1 = require("./jobskill.service");
const jobskill_controller_1 = require("./jobskill.controller");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
const database_module_1 = require("../database/database.module");
const job_module_1 = require("../job/job.module");
let JobskillModule = class JobskillModule {
};
exports.JobskillModule = JobskillModule;
exports.JobskillModule = JobskillModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            job_module_1.JobModule,
            jwt_1.JwtModule.register({
                secret: jwt_config_1.default.secret,
                signOptions: { expiresIn: jwt_config_1.default.expiresIn },
            }),
        ],
        providers: [jobskill_service_1.JobskillService],
        controllers: [jobskill_controller_1.JobskillController],
    })
], JobskillModule);
//# sourceMappingURL=jobskill.module.js.map