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
exports.GetListingSuscribers = exports.ListingSubscriptionCount = exports.SubscriptionCount = exports.DeleteListingSubscription = exports.DeleteSubscription = exports.CreateListingSubsripton = exports.FindListingSuscribers = exports.FindMany = exports.Create = exports.findUnique = void 0;
const db_1 = require("../db");
const findUnique = ({ userId, location }) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield db_1.prisma.subscription.findFirst({
        where: {
            userId,
            location: {
                hasEvery: location
            }
        }
    });
    return notification;
});
exports.findUnique = findUnique;
const Create = ({ userId, location }) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield db_1.prisma.subscription.create({
        data: {
            userId,
            location
        }
    });
    return subscription;
});
exports.Create = Create;
const FindMany = () => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield db_1.prisma.subscription.findMany({});
    return subscribers;
});
exports.FindMany = FindMany;
const FindListingSuscribers = (listingId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield db_1.prisma.listingNotifySubscription.findMany({
        where: {
            listingId
        }
    });
    return subscribers;
});
exports.FindListingSuscribers = FindListingSuscribers;
const CreateListingSubsripton = ({ userId, listingId }) => __awaiter(void 0, void 0, void 0, function* () {
    const listing_suscription = yield db_1.prisma.listingNotifySubscription.create({
        data: {
            userId,
            listingId
        }
    });
    return listing_suscription;
});
exports.CreateListingSubsripton = CreateListingSubsripton;
const DeleteSubscription = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield db_1.prisma.subscription.deleteMany({
        where: {
            userId
        }
    });
    return subscription;
});
exports.DeleteSubscription = DeleteSubscription;
const DeleteListingSubscription = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield db_1.prisma.listingNotifySubscription.deleteMany({
        where: {
            userId
        }
    });
    return subscription;
});
exports.DeleteListingSubscription = DeleteListingSubscription;
const SubscriptionCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.prisma.subscription.count({
        where: {
            userId
        }
    });
    return count;
});
exports.SubscriptionCount = SubscriptionCount;
const ListingSubscriptionCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.prisma.listingNotifySubscription.count({
        where: {
            userId
        }
    });
    return count;
});
exports.ListingSubscriptionCount = ListingSubscriptionCount;
const GetListingSuscribers = (listingId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield db_1.prisma.listingNotifySubscription.findMany({
        where: {
            listingId
        }
    });
    return subscribers;
});
exports.GetListingSuscribers = GetListingSuscribers;
