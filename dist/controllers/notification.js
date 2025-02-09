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
exports.GetNotifications = void 0;
const notification_1 = require("../services/notification");
const GetNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield (0, notification_1.GetNotification)(req.userId);
    if (notification.status == 404) {
        return res.status(notification.status).json({
            message: notification.message
        });
    }
    return res.status(notification.status).json({
        message: notification.message,
        data: notification.data
    });
});
exports.GetNotifications = GetNotifications;
