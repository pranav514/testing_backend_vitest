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
const db_1 = require("../db");
const notification_1 = require("../eventemitter/notification");
notification_1.notificationEmitter.on("ListingCreated", (listing) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("here");
    const subscribers = yield db_1.prisma.subscription.findMany({
        where: { listingId: listing.id },
        include: { user: true },
    });
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
