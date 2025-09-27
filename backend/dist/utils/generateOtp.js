"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
exports.default = generateOtp;
//# sourceMappingURL=generateOtp.js.map