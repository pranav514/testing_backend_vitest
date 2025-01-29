"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const db_1 = require("../db");
vitest_1.vi.mock('../db', () => ({
    prisma: { user: { create: vitest_1.vi.fn(), findUnique: vitest_1.vi.fn() } }
}));
vitest_1.vi.mock("jsonwebtoken", () => ({
    sign: vitest_1.vi.fn(() => "mocked-jwt-token"),
}));
(0, vitest_1.describe)("POST /signup", () => {
    (0, vitest_1.it)("should create a user with valid data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/v1/auth/signup").send({
            name: "xyz",
            email: "xyz@gmail.com",
            password: "123456",
            phone_number: "789456123",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
    }));
    (0, vitest_1.it)("should return 400 for missing required fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/v1/auth/signup").send({
            email: "xyz@gmail.com",
            password: "123456",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(411);
    }));
});
(0, vitest_1.describe)("POST /signin", () => {
    // beforeEach(() => {
    //   vi.clearAllMocks();
    // });
    (0, vitest_1.it)("should allow the user to login with valid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.prisma.user.findUnique.mockResolvedValue({
            id: "user-id-123",
            email: "xyz@gmail.com",
            password: "123456",
        });
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/v1/auth/signin").send({
            email: "xyz@gmail.com",
            password: "123456",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body).toHaveProperty("message", "user logged in sucessfully");
        (0, vitest_1.expect)(res.body).toHaveProperty("token", "mocked-jwt-token");
    }));
    (0, vitest_1.it)("should return 411 if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.prisma.user.findUnique.mockResolvedValue(null);
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/v1/auth/signin").send({
            email: "notfound@gmail.com",
            password: "123456",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(411);
        (0, vitest_1.expect)(res.body).toHaveProperty("message", "no user exist cannot login");
    }));
    (0, vitest_1.it)("should return 411 for incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.prisma.user.findUnique.mockResolvedValue({
            id: "user-id-123",
            email: "xyz@gmail.com",
            password: "correct-password",
        });
        const res = yield (0, supertest_1.default)(index_1.app).post("/api/v1/auth/signin").send({
            email: "xyz@gmail.com",
            password: "wrong-password",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(411);
        (0, vitest_1.expect)(res.body).toHaveProperty("message", "incorrect password");
    }));
});
