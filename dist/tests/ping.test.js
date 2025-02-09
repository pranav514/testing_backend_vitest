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
vitest_1.vi.mock("../middleware/authMiddleware", () => ({
    authMiddleware: vitest_1.vi.fn((req, res, next) => {
        req.userId = "userId_123";
        next();
    }),
}));
vitest_1.vi.mock("../db", () => ({
    prisma: {
        listing: {
            findUnique: vitest_1.vi.fn(() => Promise.resolve({
                prefered_gender: "female",
            })),
        },
        user: {
            findUnique: vitest_1.vi.fn(() => Promise.resolve({
                gender: "female",
            })),
        },
        ping: {
            create: vitest_1.vi.fn(() => Promise.resolve({
                id: "ping_123",
                message: "test for the ping",
                postId: "postId_123",
                userId: "userId_123",
            })),
            update: vitest_1.vi.fn(),
            delete: vitest_1.vi.fn(),
        },
        notification: {
            create: vitest_1.vi.fn(() => Promise.resolve({
                id: "notification_123",
                userId: "userId_123",
                message: "New ping created",
                createdAt: new Date(),
            }))
        }
    },
}));
vitest_1.vi.mock("../events/notificationEmitter", () => ({
    notificationEmitter: {
        emit: vitest_1.vi.fn(),
        on: vitest_1.vi.fn()
    }
}));
vitest_1.vi.mock("jsonwebtoken", () => ({
    sign: vitest_1.vi.fn(() => "mocked-jwt-token"),
}));
(0, vitest_1.describe)("POST /createping", () => {
    (0, vitest_1.it)("should create the ping with the valid data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .post("/api/v1/ping/createping/postId_123")
            .set("Authorization", "Bearer mock-token")
            .send({
            message: "test for the ping",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
    }));
});
(0, vitest_1.describe)("PUT /update/:id", () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)("should the listing when the valid data is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.prisma.ping.update.mockResolvedValue({
            id: "ping_456",
            message: "ping updated",
        });
        const res = yield (0, supertest_1.default)(index_1.app)
            .put("/api/v1/ping/update/ping_456")
            .set("Authorization", "Bearer mock-token")
            .send({
            message: "ping updated",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
    }));
});
