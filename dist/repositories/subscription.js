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
exports.FindMany = exports.Create = exports.findUnique = void 0;
const db_1 = require("../db");
const findUnique = ({ userId, listingId }) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield db_1.prisma.subscription.findFirst({
        where: {
            userId,
        }
    });
    return notification;
});
exports.findUnique = findUnique;
const Create = ({ userId, listingId }) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield db_1.prisma.subscription.create({
        data: {
            userId,
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
