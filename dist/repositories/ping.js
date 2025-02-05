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
exports.findMany = exports.Update = exports.Create = void 0;
const db_1 = require("../db");
const Create = ({ message, postId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const ping = yield db_1.prisma.ping.create({
        data: {
            message,
            postId,
            userId,
        }
    });
    return ping;
});
exports.Create = Create;
const Update = ({ message, postId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(message);
    console.log(postId);
    console.log(userId);
    const ping = yield db_1.prisma.ping.update({
        where: {
            id: postId,
            userId: userId
        },
        data: {
            message: message
        }
    });
    console.log(ping);
    return ping;
});
exports.Update = Update;
const findMany = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const pings = yield db_1.prisma.ping.findMany({
        where: {
            userId: userId
        }
    });
    return pings;
});
exports.findMany = findMany;
