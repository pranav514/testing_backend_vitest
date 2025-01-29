import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../index";
import { prisma } from "../db";

vi.mock("../middleware/authMiddleware", () => ({
  authMiddleware: vi.fn((req, res, next) => {
    req.userId = "userId_123";
    next();
  }),
}));

vi.mock("../db", () => ({
  prisma: {
    ping: {
      create: vi.fn(() =>
        Promise.resolve({
          id: "ping_123",
          message: "test for the ping",
          postId: "postId_123",
          userId: "userId_123",
        })
      ),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

vi.mock("jsonwebtoken", () => ({
  sign: vi.fn(() => "mocked-jwt-token"),
}));

describe("POST /createping", () => {
  it("should create the ping with the valid data", async () => {
    const res = await request(app)
      .post("/api/v1/ping/createping/postId_123")
      .set("Authorization", "Bearer mock-token")
      .send({
        message: "test for the ping",
        postId: "postId_123",
        userId: "userId_123",
      });
    expect(res.statusCode).toBe(200);
  });
});

describe("PUT /update/:id", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should the listing when the valid data is provided", async () => {
    (prisma.ping.update as any).mockResolvedValue({
      id: "ping_456",
        message : "ping updated",
        

    });
    const res = await request(app)
      .put("/api/v1/ping/update/ping_456")
      .set("Authorization", "Bearer mock-token")
      .send({
        message : "ping updated",
      });
    expect(res.statusCode).toBe(200);
  });
});
