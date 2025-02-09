"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const notification_1 = require("../controllers/notification");
const router = express_1.default.Router();
router.get('/getnotification', authMiddleware_1.authMiddleware, notification_1.GetNotifications);
exports.default = router;
