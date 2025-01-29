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
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("request recived");
    console.log("Received request at /api/v1/auth/signup");
    const { name, email, password, phone_number } = req.body;
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("phone_number", phone_number);
    if (!name || !email || !password) {
        return res.status(411).json({
            message: "enter the necessary fields which are name, email and password",
        });
    }
    try {
        const user = yield db_1.prisma.user.create({
            data: {
                name,
                email,
                password,
                phone_number,
            },
        });
        res.status(200).json({
            message: "user created successfully",
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "An error occurred while creating the user",
        });
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.prisma.user.findUnique({
        where: {
            email: email
        }
    });
    console.log(user);
    if (!user) {
        return res.status(411).json({
            message: "no user exist cannot login",
        });
    }
    if (user.password != password) {
        return res.status(411).json({
            message: "incorrect password"
        });
    }
    const token = (0, jsonwebtoken_1.sign)(user.id, "secret");
    return res.status(200).json({
        message: "user logged in sucessfully",
        token
    });
}));
router.put('/update', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, phone_number } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(411).json({
                message: "userId is not present"
            });
        }
        const user = yield db_1.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                password,
                phone_number
            }
        });
        return res.status(200).json({
            message: "user updated Sucessfully",
            user
        });
    }
    catch (error) {
        res.status(411).json({
            message: "error while updating the user"
        });
    }
}));
exports.default = router;
