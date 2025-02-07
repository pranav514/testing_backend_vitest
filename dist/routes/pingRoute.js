"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const ping_1 = require("../controllers/ping");
const router = express_1.default.Router();
router.post('/createping/:id', authMiddleware_1.authMiddleware, ping_1.createping);
router.put('/update/:id', authMiddleware_1.authMiddleware, ping_1.updateping);
router.get('/userpings', authMiddleware_1.authMiddleware, ping_1.userping);
exports.default = router;
