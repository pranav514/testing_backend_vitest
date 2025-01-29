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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/createlisting", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, images, address, location_city } = req.body;
        const userId = req.userId;
        if (!title || !description || !address || !location_city) {
            return res.status(411).json({
                message: "some fields are missing",
            });
        }
        console.log(title);
        const lisiting = yield db_1.prisma.listing.create({
            data: {
                title: title,
                description: description,
                images: images,
                address: address,
                location_city: location_city,
                userId: userId,
            },
        });
        return res.status(200).json({
            message: "listing added succesfully",
            lisiting,
        });
    }
    catch (error) {
        return res.status(411).json({
            message: "error occured while creating the listing",
        });
    }
}));
router.put("/update/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, images, address, location_city } = req.body;
        const listingId = req.params.id;
        const userId = req.userId;
        console.log(listingId);
        console.log(userId);
        const user = yield db_1.prisma.listing.update({
            where: {
                id: listingId,
                userId: userId,
            },
            data: {
                title,
                description,
                images,
                address,
                location_city,
            },
        });
        return res.status(200).json({
            message: "listing updated succesfully",
        });
    }
    catch (error) {
        res.status(411).json({
            message: "error occured while updating the listings",
        });
    }
}));
router.delete("/delete/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listingId = req.params.id;
        const userId = req.userId;
        const listing = yield db_1.prisma.listing.delete({
            where: {
                id: listingId,
                userId: userId,
            },
        });
        return res.status(200).json({
            message: "listing deleted succesfully",
        });
    }
    catch (error) {
        return res.status(411).json({
            message: "cannot delete the listing",
        });
    }
}));
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield db_1.prisma.listing.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone_number: true,
                    },
                },
            },
        });
        return res.status(200).json({
            message: "all listings fetched successfully",
            listing,
        });
    }
    catch (error) {
        return res.status(411).json({
            message: "cannot fetched all the blogs",
        });
    }
}));
router.get("/getlisting/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listingId = req.params.id;
        //   console.log(listingId);
        const listing = yield db_1.prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone_number: true,
                    },
                },
            },
        });
        console.log(listing);
        return res.status(200).json({
            message: "fetched the specific listing",
            listing,
        });
    }
    catch (error) {
        return res.status(411).json({
            message: "cannot fetched the listing",
        });
    }
}));
router.get('/userlisting', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const listing = yield db_1.prisma.listing.findMany({
            where: {
                userId: userId
            }
        });
        return res.status(200).json({
            message: `fetched the blog of the user ${userId}`,
            listing
        });
    }
    catch (error) {
        res.status(411).json({
            message: "cannot fetched the blog"
        });
    }
}));
exports.default = router;
