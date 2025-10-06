"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JwtConstants = {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    expiresIn: process.env.JWT_EXPIRES_IN || '5d',
};
exports.default = JwtConstants;
//# sourceMappingURL=jwt.config.js.map