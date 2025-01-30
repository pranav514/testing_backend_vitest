import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../index";
import { prisma } from "../db";
import { authMiddleware } from "../middleware/authMiddleware";

vi.mock("../db", () => ({
  prisma: { user: { create: vi.fn(), findUnique: vi.fn(), update: vi.fn() } },
}));

vi.mock("jsonwebtoken", () => ({
  sign: vi.fn(() => "mocked-jwt-token"),
}));

vi.mock("../middleware/authMiddleware", () => ({
  authMiddleware: vi.fn((req,res,next) => {
    req.userId = "userId_123";
    next();
  }),
}));


describe("POST /signup", () => {
  it("should create a user with valid data", async () => {
    const res = await request(app).post("/api/v1/user/auth/signup").send({
      name: "xyz",
      gender : "male",
      email: "xyz@gmail.com",
      password: "123456",
      phone_number: "789456123",
    });
    expect(res.statusCode).toBe(200);
  });

  it("should return 400 for missing required fields", async () => {
    const res = await request(app).post("/api/v1/user/auth/signup").send({
      email: "xyz@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(411);
  });
});

describe("POST /signin", () => {
  it("should allow the user to login with valid credentials", async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      id: "user-id-123",
      email: "xyz@gmail.com",
      password: "123456",
    });

    const res = await request(app).post("/api/v1/user/auth/signin").send({
      email: "xyz@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "user logged in sucessfully");
    expect(res.body).toHaveProperty("token", "mocked-jwt-token");
  });

  it("should return 411 if user does not exist", async () => {
    (prisma.user.findUnique as any).mockResolvedValue(null);

    const res = await request(app).post("/api/v1/user/auth/signin").send({
      email: "notfound@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(411);
    expect(res.body).toHaveProperty("message", "no user exist cannot login");
  });

  it("should return 411 for incorrect password", async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      id: "user-id-123",
      email: "xyz@gmail.com",
      password: "correct-password",
    });

    const res = await request(app).post("/api/v1/user/auth/signin").send({
      email: "xyz@gmail.com",
      password: "wrong-password",
    });

    expect(res.statusCode).toBe(411);
    expect(res.body).toHaveProperty("message", "incorrect password");
  });
});

describe("PUT /update", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update user details when valid data is provided", async () => {
    (prisma.user.update as any).mockResolvedValue({
      id: "userId_123",
      name: "Updated Name",
      password: "newpassword",
      phone_number: "9876543210",
    });

    const res = await request(app)
      .put("/api/v1/user/update")
      .set("Authorization", "Bearer mock-token") // Simulate auth header
      .send({
        name: "Updated Name",
        password: "newpassword",
        phone_number: "9876543210",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("user updated Sucessfully");
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
  });



 
});


