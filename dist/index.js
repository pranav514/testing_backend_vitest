"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const listingRoute_1 = __importDefault(require("./routes/listingRoute"));
const pingRoute_1 = __importDefault(require("./routes/pingRoute"));
const subscriptionRoute_1 = __importDefault(require("./routes/subscriptionRoute"));
const notificationRoute_1 = __importDefault(require("./routes/notificationRoute"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/api/v1/user', userRoute_1.default);
exports.app.use('/api/v1/listing', listingRoute_1.default);
exports.app.use('/api/v1/ping', pingRoute_1.default);
exports.app.use('/api/v1/notification_service', subscriptionRoute_1.default);
exports.app.use('/api/v1/notification', notificationRoute_1.default);
