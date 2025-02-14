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
exports.GetListingSubscription = exports.DeleteListingSubscriptions = exports.DeleteSubscriptions = exports.CreateSubscriptionLisiting = exports.CreateSubscriptions = void 0;
const subscription_1 = require("../repositories/subscription");
const CreateSubscriptions = ({ userId, location }) => __awaiter(void 0, void 0, void 0, function* () {
    const suscribed = yield (0, subscription_1.findUnique)({ userId, location });
    if (suscribed) {
        return {
            message: "You have already subscribed to this listing",
            status: 409,
        };
    }
    const subscription = yield (0, subscription_1.Create)({ userId, location });
    return {
        message: "Subscribed successfully",
        status: 200,
        data: subscription
    };
});
exports.CreateSubscriptions = CreateSubscriptions;
const CreateSubscriptionLisiting = (userId, listingId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield (0, subscription_1.CreateListingSubsripton)({ userId, listingId });
    return {
        message: "Subscribed successfully",
        status: 200,
        data: subscription
    };
});
exports.CreateSubscriptionLisiting = CreateSubscriptionLisiting;
const DeleteSubscriptions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield (0, subscription_1.SubscriptionCount)(userId);
    if (count == 0) {
        return {
            message: "You are not subscribed to any listing",
            status: 404
        };
    }
    const subscription = yield (0, subscription_1.DeleteSubscription)(userId);
    return {
        message: "Subscription deleted successfully",
        status: 200,
        data: subscription
    };
});
exports.DeleteSubscriptions = DeleteSubscriptions;
const DeleteListingSubscriptions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield (0, subscription_1.ListingSubscriptionCount)(userId);
    if (count == 0) {
        return {
            message: "You are not subscribed to any listing",
            status: 404
        };
    }
    const subscription = yield (0, subscription_1.DeleteListingSubscription)(userId);
    return {
        message: "Subscription deleted successfully",
        status: 200,
        data: subscription
    };
});
exports.DeleteListingSubscriptions = DeleteListingSubscriptions;
const GetListingSubscription = (listingId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield (0, subscription_1.GetListingSuscribers)(listingId);
    console.log(subscribers);
    if (subscribers.length == 0) {
        return {
            message: "No subscribers found",
            status: 404
        };
    }
    return {
        message: "Listing subscribers",
        status: 200,
        data: subscribers
    };
});
exports.GetListingSubscription = GetListingSubscription;
