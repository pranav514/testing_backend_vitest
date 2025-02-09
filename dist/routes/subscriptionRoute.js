"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const subscription_1 = require("../controllers/subscription");
const router = express_1.default.Router();
router.post('/createsubscription/:id', authMiddleware_1.authMiddleware, subscription_1.CreateSubscription);
exports.default = router;
