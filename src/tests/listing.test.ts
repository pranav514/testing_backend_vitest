import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../index";
import { prisma } from "../db";
import { authMiddleware } from "../middleware/authMiddleware";

vi.mock("../middleware/authMiddleware", () => ({
  authMiddleware: vi.fn((req, res, next) => {
    req.userId = "userId_123";
    next();
  }),
}));

vi.mock("../db", () => ({
  prisma: {
    listing: {
      create: vi.fn(() =>
        Promise.resolve({
          id: "listing_123",
          title: "xyz",
          description: "3bhk flat, 2 room vacancies, 5000 rent",
          images: "image.png",
          address: "xyz street, Navi Mumbai",
          location_city: "xyz",
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

describe("POST /createlisting", () => {
  it("should create the listing with valid data", async () => {
    const res = await request(app)
      .post("/api/v1/listing/createlisting")
      .set("Authorization", "Bearer mocked-jwt-token")
      .send({
        title: "xyz",
        description: "3bhk flat, 2 room vacancies, 5000 rent",
        images: "image.png",
        address: "xyz street, Navi Mumbai",
        location_city: "xyz",
        userId: "userId_123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "listing added succesfully");
  });

  it("should return 411 for missing required fields", async () => {
    const res = await request(app)
      .post("/api/v1/listing/createlisting")
      .set("Authorization", "Bearer mocked-jwt-token")
      .send({
        title: "xyz",
        description: "3bhk flat, 2 room vacancies, 5000 rent",
      });

    expect(res.statusCode).toBe(411);
    expect(res.body).toHaveProperty("message", "some fields are missing");
  });
});

describe("PUT /update/:id", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should the listing when the valid data is provided", async () => {
    (prisma.listing.update as any).mockResolvedValue({
      id: "listing_456",
      userId: "userId_123",
      title: "Updated Title",
      description: "Updated description",
      images: "image.png",
      address: "Updated Address",
      location_city: "Updated City",
    });
    const res = await request(app)
      .put("/api/v1/listing/update/listing_456")
      .set("Authorization", "Bearer mock-token")
      .send({
        title: "Updated Title",
        description: "Updated description",
        images: "image.png",
        address: "Updated Address",
        location_city: "Updated City",
      });
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /delete/:id", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("listing must be deleted", async () => {
    (prisma.listing.delete as any).mockResolvedValue({
      id: "listing_456",
      userId: "userId_123",
    });
    const res = await request(app)
      .delete("/api/v1/listing/delete/listing_456")
      .set("Authorization", "Bearer mock-token");
    expect(res.statusCode).toBe(200);
  });
});
