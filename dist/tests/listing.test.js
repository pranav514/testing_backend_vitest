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
            create: vitest_1.vi.fn(() => Promise.resolve({
                id: "listing_123",
                title: "xyz",
                description: "3bhk flat, 2 room vacancies, 5000 rent",
                images: "image.png",
                rent: 5000,
                prefered_gender: "male",
                address: "xyz street, Navi Mumbai",
                location_city: "xyz",
                userId: "userId_123",
            })),
            update: vitest_1.vi.fn(),
            delete: vitest_1.vi.fn(),
        },
    },
}));
vitest_1.vi.mock("jsonwebtoken", () => ({
    sign: vitest_1.vi.fn(() => "mocked-jwt-token"),
}));
(0, vitest_1.describe)("POST /createlisting", () => {
    (0, vitest_1.it)("should create the listing with valid data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .post("/api/v1/listing/createlisting")
            .set("Authorization", "Bearer mocked-jwt-token")
            .send({
            title: "xyz",
            description: "3bhk flat, 2 room vacancies, 5000 rent",
            images: "image.png",
            rent: 5000,
            prefered_gender: "male",
            address: "xyz street, Navi Mumbai",
            location_city: "xyz",
            userId: "userId_123",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body).toHaveProperty("message", "listing added succesfully");
    }));
    (0, vitest_1.it)("should return 411 for missing required fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .post("/api/v1/listing/createlisting")
            .set("Authorization", "Bearer mocked-jwt-token")
            .send({
            title: "xyz",
            description: "3bhk flat, 2 room vacancies, 5000 rent",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(411);
        (0, vitest_1.expect)(res.body).toHaveProperty("message", "some fields are missing");
    }));
});
(0, vitest_1.describe)("PUT /update/:id", () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)("should the listing when the valid data is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.prisma.listing.update.mockResolvedValue({
            id: "listing_456",
            userId: "userId_123",
            title: "Updated Title",
            description: "Updated description",
            images: "image.png",
            rent: 10000,
            address: "Updated Address",
            location_city: "Updated City",
        });
        const res = yield (0, supertest_1.default)(index_1.app)
            .put("/api/v1/listing/update/listing_456")
            .set("Authorization", "Bearer mock-token")
            .send({
            title: "Updated Title",
            description: "Updated description",
            images: "image.png",
            address: "Updated Address",
            location_city: "Updated City",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
    }));
});
(0, vitest_1.describe)("DELETE /delete/:id", () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)("listing must be deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.prisma.listing.delete.mockResolvedValue({
            id: "listing_456",
            userId: "userId_123",
        });
        const res = yield (0, supertest_1.default)(index_1.app)
            .delete("/api/v1/listing/delete/listing_456")
            .set("Authorization", "Bearer mock-token");
        (0, vitest_1.expect)(res.statusCode).toBe(200);
    }));
});
