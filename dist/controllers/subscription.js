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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListingSuscribers = exports.DeleteListingSubscription = exports.DeleteSubscription = exports.CreateListingSubscription = exports.CreateSubscription = void 0;
const subscription_1 = require("../services/subscription");
const CreateSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const location = req.body.location;
    const subscription = yield (0, subscription_1.CreateSubscriptions)({ userId, location });
    if (subscription.status == 402) {
        return res.status(subscription.status).json({
            message: subscription.message
        });
    }
    return res.status(subscription.status).json({
        message: subscription.message,
        data: subscription.data
    });
});
exports.CreateSubscription = CreateSubscription;
const CreateListingSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listingId = req.params.id;
    const userId = req.userId;
    const subscription = yield (0, subscription_1.CreateSubscriptionLisiting)(userId, listingId);
    return res.status(subscription.status).json({
        message: subscription.message,
        data: subscription.data
    });
});
exports.CreateListingSubscription = CreateListingSubscription;
const DeleteSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const subscription = yield (0, subscription_1.DeleteSubscriptions)(userId);
    if (subscription.status == 404) {
        return res.status(subscription.status).json({
            message: subscription.message
        });
    }
    return res.status(subscription.status).json({
        message: subscription.message,
        data: subscription.data
    });
});
exports.DeleteSubscription = DeleteSubscription;
const DeleteListingSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const subscription = yield (0, subscription_1.DeleteListingSubscriptions)(userId);
    if (subscription.status == 404) {
        return res.status(subscription.status).json({
            message: subscription.message
        });
    }
    return res.status(subscription.status).json({
        message: subscription.message,
        data: subscription.data
    });
});
exports.DeleteListingSubscription = DeleteListingSubscription;
const GetListingSuscribers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listingId = req.params.id;
    const subscribers = yield (0, subscription_1.GetListingSubscription)(listingId);
    if (subscribers.status == 404) {
        return res.status(subscribers.status).json({
            message: subscribers.message
        });
    }
    return res.status(subscribers.status).json({
        message: subscribers.message,
        data: subscribers.data
    });
});
exports.GetListingSuscribers = GetListingSuscribers;
