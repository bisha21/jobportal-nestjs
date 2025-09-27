"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
const generateAuthToken = (jwtService, payload) => {
    return jwtService.sign(payload, {
        secret: jwt_config_1.default.secret,
        expiresIn: jwt_config_1.default.expiresIn,
    });
};
exports.generateAuthToken = generateAuthToken;
//# sourceMappingURL=generateAuthToken.js.map