"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const subscription_1 = require("../controllers/subscription");
const router = express_1.default.Router();
router.post('/createsubscription', authMiddleware_1.authMiddleware, subscription_1.CreateSubscription);
router.post('/createlistingsubscription/:id', authMiddleware_1.authMiddleware, subscription_1.CreateListingSubscription);
router.delete('/unsuscribe', authMiddleware_1.authMiddleware, subscription_1.DeleteSubscription);
router.delete('/listingunsuscribe', authMiddleware_1.authMiddleware, subscription_1.DeleteListingSubscription);
router.get('/listingsuscribers/:id', authMiddleware_1.authMiddleware, subscription_1.GetListingSuscribers);
exports.default = router;
