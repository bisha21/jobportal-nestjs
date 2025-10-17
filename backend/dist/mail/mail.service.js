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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
let MailService = class MailService {
    mailQueue;
    constructor(mailQueue) {
        this.mailQueue = mailQueue;
    }
    async sendMail(options) {
        if (!options.email ||
            (Array.isArray(options.email) && options.email.length === 0)) {
            console.error('Email is required');
            return;
        }
        await this.mailQueue.add('sendMail', options, {
            attempts: 3,
            removeOnComplete: true,
        });
        console.log(' Mail job added to the queue');
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('mail-queue')),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], MailService);
//# sourceMappingURL=mail.service.js.map