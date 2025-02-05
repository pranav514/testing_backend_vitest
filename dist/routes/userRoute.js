"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post("/auth/signup", auth_1.signup);
router.post("/auth/signin", auth_1.signin);
router.put("/update", authMiddleware_1.authMiddleware, auth_1.update);
exports.default = router;
