"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    const hashed = await bcrypt_1.default.hash(password, 10);
    return hashed;
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    const isMatch = await bcrypt_1.default.compare(password, hash);
    return isMatch;
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=hashpassword.js.map