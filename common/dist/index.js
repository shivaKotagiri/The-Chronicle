"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTotalValidation = exports.BlogUpdateValidation = exports.BlogValidation = exports.InputUpdateValidation = exports.SigninValidation = exports.SignupValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignupValidation = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    firstName: zod_1.default.string().max(25).optional(),
    lastName: zod_1.default.string().max(25).optional(),
});
exports.SigninValidation = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.InputUpdateValidation = zod_1.default.object({
    password: zod_1.default.string().min(6).optional(),
    firstName: zod_1.default.string().max(25).optional(),
    lastName: zod_1.default.string().max(25).optional(),
});
exports.BlogValidation = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
});
exports.BlogUpdateValidation = zod_1.default.object({
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
});
exports.BlogTotalValidation = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    publishedAt: zod_1.default.string().transform((str) => new Date(str)),
    author: zod_1.default.object({
        firstName: zod_1.default.string(),
        lastName: zod_1.default.string(),
    })
});
