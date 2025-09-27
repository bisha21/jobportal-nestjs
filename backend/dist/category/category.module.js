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
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_controller_1 = require("./category.controller");
const database_module_1 = require("../database/database.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                secret: jwt_config_1.default.secret,
                signOptions: { expiresIn: jwt_config_1.default.expiresIn },
            }),
        ],
        providers: [category_service_1.CategoryService],
        controllers: [category_controller_1.CategoryController],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map