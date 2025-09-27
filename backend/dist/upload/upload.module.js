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
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const upload_controller_1 = require("./upload.controller");
const cloudinary_service_1 = require("../cloudinary/cloudinary/cloudinary.service");
const auth_service_1 = require("../auth/auth.service");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const mail_module_1 = require("../mail/mail.module");
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
const company_module_1 = require("../company/company.module");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mail_module_1.MailModule,
            company_module_1.CompanyModule,
            jwt_1.JwtModule.register({
                secret: jwt_config_1.default.secret,
                signOptions: { expiresIn: jwt_config_1.default.expiresIn },
            }),
        ],
        controllers: [upload_controller_1.UploadController],
        providers: [cloudinary_service_1.CloudinaryService, auth_service_1.AuthService],
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map