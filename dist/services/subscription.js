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
exports.CreateSubscriptionLisiting = exports.CreateSubscriptions = void 0;
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
