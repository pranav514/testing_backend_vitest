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
exports.GetNotification = void 0;
const notification_1 = require("../repositories/notification");
const GetNotification = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield (0, notification_1.Get)(userId);
    if (notification.length == 0) {
        return {
            message: "no notification yet",
            status: 404
        };
    }
    return {
        message: "Notification fetched successfully",
        status: 200,
        data: notification
    };
});
exports.GetNotification = GetNotification;
