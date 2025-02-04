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
const authMiddleware_1 = require("../middleware/authMiddleware");
const ping_1 = require("../repositories/ping");
const ping_2 = require("../services/ping");
const router = express_1.default.Router();
router.post('/createping/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    const postId = req.params.id;
    const userId = req.userId;
    const ping = yield (0, ping_2.CreatePing)({ message, postId, userId });
    if (ping.status == 422) {
        return res.status(ping.status).json({
            message: ping.message
        });
    }
    if (ping.status == 411) {
        return res.status(ping.status).json({
            message: ping.message
        });
    }
    return res.status(200).json({
        message: ping.message,
        ping: ping.ping
    });
}));
router.put('/update/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    const postId = req.params.id;
    const userId = req.userId;
    console.log(postId);
    console.log(userId);
    const updatePing = yield (0, ping_2.UpdatePing)({ message, postId, userId });
    if (updatePing.status === 411) {
        return res.status(updatePing.status).json({
            message: updatePing.message
        });
    }
    return res.status(updatePing.status).json({
        message: updatePing.message
    });
}));
router.get('/userpings', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const pings = yield (0, ping_1.findMany)(userId);
    const userPing = yield (0, ping_2.UserPing)(userId);
    if (userPing.status === 411) {
        return res.status(userPing.status).json({
            message: userPing.message,
        });
    }
    return res.status(userPing.status).json({
        message: userPing.message,
        pings: userPing.pings
    });
}));
exports.default = router;
