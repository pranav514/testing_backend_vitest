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
exports.UpdateUser = exports.SignIn = exports.CreateUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../repositories/auth");
const CreateUser = ({ name, gender, email, password, phone_number, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("phone_number", phone_number);
    if (!name || !email || !password) {
        return {
            message: "enter the necessary fields which are name, email and password",
            status: 411,
        };
    }
    try {
        const user = yield (0, auth_1.create)({
            name,
            gender,
            email,
            password,
            phone_number,
        });
        return {
            message: "user created successfully",
            status: 200,
            data: user,
        };
    }
    catch (error) {
        console.error("Error creating user:", error);
        return {
            message: "An error occured while creating the user",
            status: 500,
        };
    }
});
exports.CreateUser = CreateUser;
const SignIn = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_1.findUnique)(email);
    console.log(user);
    if (!user) {
        return {
            message: "no user exist cannot login",
            status: 402,
        };
    }
    if (user.password != password) {
        return {
            message: "incorrect password",
            status: 411,
        };
    }
    const token = (0, jsonwebtoken_1.sign)(user.id, "secret");
    return {
        message: "user logged in sucessfully",
        status: 200,
        data: token,
    };
});
exports.SignIn = SignIn;
const UpdateUser = ({ name, password, phone_number, userId, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(userId);
        if (!userId) {
            return {
                message: "userId is not present",
                status: 402,
            };
        }
        const user = yield (0, auth_1.Update)({ name, password, phone_number, userId });
        return {
            message: "user updated Sucessfully",
            status: 200,
            user,
        };
    }
    catch (error) {
        return {
            message: "error while updating the user",
            status: 411,
        };
    }
});
exports.UpdateUser = UpdateUser;
