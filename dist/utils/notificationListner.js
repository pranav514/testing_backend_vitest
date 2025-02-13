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
exports.pingNotification = exports.specificlistingNotification = exports.notificationGenerator = void 0;
const db_1 = require("../db");
const notification_1 = require("../eventemitter/notification");
const listing_1 = require("../repositories/listing");
const subscription_1 = require("../repositories/subscription");
exports.notificationGenerator = notification_1.notificationEmitter.on("ListingCreated", (listing) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("here");
    const subscribers = yield (0, subscription_1.FindMany)();
    console.log(subscribers);
    for (const subscriber of subscribers) {
        console.log(subscriber);
        yield db_1.prisma.notification.create({
            data: {
                userId: subscriber.userId,
                message: `New listing created: ${listing.title}`,
            },
        });
    }
}));
exports.specificlistingNotification = notification_1.notificationEmitter.on("ListingUpdated", (listing) => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield (0, subscription_1.FindListingSuscribers)(listing.id);
    for (const subscriber of subscribers) {
        yield db_1.prisma.notification.create({
            data: {
                userId: subscriber.userId,
                message: `Listing updated : ${listing.title}`
            }
        });
    }
}));
exports.pingNotification = notification_1.notificationEmitter.on("PingCreated", (ping) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("reached here");
    const postId = yield ping.postId;
    const userId = yield ping.userId;
    const postTitle = yield (0, listing_1.GetTitle)(postId);
    yield db_1.prisma.notification.create({
        data: {
            userId,
            message: `user show interest on your post ${postTitle} listing you created `,
        },
    });
}));
