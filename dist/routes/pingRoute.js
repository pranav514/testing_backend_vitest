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
router.post('/createping/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const postId = req.params.id;
        const userId = req.userId;
        const listing = yield db_1.prisma.listing.findUnique({
            where: {
                id: postId
            },
            select: {
                prefered_gender: true,
            }
        });
        if (listing === null || listing === void 0 ? void 0 : listing.prefered_gender) {
            const user = yield db_1.prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    gender: true,
                }
            });
            if ((user === null || user === void 0 ? void 0 : user.gender) == listing.prefered_gender) {
                const ping = yield db_1.prisma.ping.create({
                    data: {
                        message,
                        postId,
                        userId
                    }
                });
                return res.status(200).json({
                    message: "pinged sucessfully",
                    ping
                });
            }
            return res.status(422).json({
                message: `${user === null || user === void 0 ? void 0 : user.gender} is not prefered for the following room`
            });
        }
        else {
            const ping = yield db_1.prisma.ping.create({
                data: {
                    message,
                    postId,
                    userId
                }
            });
            return res.status(200).json({
                message: "pinged sucessfully",
                ping
            });
        }
    }
    catch (error) {
        res.status(411).json({
            message: "ping not succesfull"
        });
    }
}));
router.put('/update/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const pingId = req.params.id;
        const ping = yield db_1.prisma.ping.update({
            where: {
                id: pingId,
                userId: req.userId
            },
            data: {
                message: message
            }
        });
        return res.status(200).json({
            message: "ping updated"
        });
    }
    catch (error) {
        return res.status(411).json({
            message: "cannot update the ping"
        });
    }
}));
router.get('/userpings', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const pings = yield db_1.prisma.ping.findMany({
            where: {
                userId: userId
            }
        });
        return res.status(200).json({
            message: "fetched the pings succesfully of the user ",
            pings
        });
    }
    catch (error) {
        return res.status(411).json({
            message: "cannot fetched the ping of the user"
        });
    }
}));
exports.default = router;
