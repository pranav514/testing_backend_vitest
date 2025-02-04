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
exports.UserPing = exports.UpdatePing = exports.CreatePing = void 0;
const auth_1 = require("../repositories/auth");
const ping_1 = require("../repositories/ping");
const listing_1 = require("../repositories/listing");
const CreatePing = ({ message, postId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield (0, listing_1.findUniqueListing)(postId);
        if (listing === null || listing === void 0 ? void 0 : listing.prefered_gender) {
            const user = yield (0, auth_1.findUniqueUser)(userId);
            if ((user === null || user === void 0 ? void 0 : user.gender) == listing.prefered_gender) {
                const ping = yield (0, ping_1.Create)({ message, postId, userId });
                return {
                    message: "pinged sucessfully",
                    status: 200,
                    ping
                };
            }
            return {
                message: `${user === null || user === void 0 ? void 0 : user.gender} is not prefered for the following room`,
                status: 422
            };
        }
        else {
            const ping = yield (0, ping_1.Create)({ message, postId, userId });
            return {
                message: "pinged sucessfully",
                status: 200,
                ping
            };
        }
    }
    catch (error) {
        return {
            message: "ping not succesfull",
            status: 411,
        };
    }
});
exports.CreatePing = CreatePing;
const UpdatePing = ({ message, postId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ping = yield (0, ping_1.Update)({ message, postId, userId });
        return {
            message: "ping updated",
            status: 200
        };
    }
    catch (error) {
        return {
            message: "cannot update the ping",
            status: 411
        };
    }
});
exports.UpdatePing = UpdatePing;
const UserPing = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pings = yield (0, listing_1.findMany)(userId);
        return {
            message: "fetched the pings succesfully of the user ",
            status: 200,
            pings
        };
    }
    catch (error) {
        return {
            message: "cannot fetched the ping of the user",
            status: 411
        };
    }
});
exports.UserPing = UserPing;
