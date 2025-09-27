"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const database_module_1 = require("./database/database.module");
const mail_module_1 = require("./mail/mail.module");
const company_module_1 = require("./company/company.module");
const cloudinary_service_1 = require("./cloudinary/cloudinary/cloudinary.service");
const upload_module_1 = require("./upload/upload.module");
const job_module_1 = require("./job/job.module");
const application_module_1 = require("./application/application.module");
const jobskill_module_1 = require("./jobskill/jobskill.module");
const userskill_module_1 = require("./userskill/userskill.module");
const notification_module_1 = require("./notification/notification.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            database_module_1.DatabaseModule,
            mail_module_1.MailModule,
            upload_module_1.UploadModule,
            company_module_1.CompanyModule,
            job_module_1.JobModule,
            application_module_1.ApplicationModule,
            jobskill_module_1.JobskillModule,
            userskill_module_1.UserskillModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, cloudinary_service_1.CloudinaryService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map