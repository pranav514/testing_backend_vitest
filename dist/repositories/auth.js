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
exports.Update = exports.findUnique = exports.create = void 0;
const db_1 = require("../db");
const create = ({ name, gender, email, password, phone_number }) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield db_1.prisma.user.create({
        data: {
            name,
            gender,
            email,
            password,
            phone_number
        }
    });
    return User;
});
exports.create = create;
const findUnique = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    return data;
});
exports.findUnique = findUnique;
const Update = ({ name, password, phone_number, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name,
            password,
            phone_number
        }
    });
    return user;
});
exports.Update = Update;
