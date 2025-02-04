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
exports.update = exports.signin = exports.signup = void 0;
const auth_1 = require("../services/auth");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("request recived");
    console.log("Received request at /api/v1/auth/signup");
    const { name, gender, email, password, phone_number } = req.body;
    const createuser = yield (0, auth_1.CreateUser)({ name, gender, email, password, phone_number });
    if (createuser.status == 411) {
        return res.status(411).json({
            message: createuser.message
        });
    }
    if (createuser.status === 500) {
        return res.status(500).json({
            messsage: createuser.message
        });
    }
    return res.status(200).json({
        message: createuser.message,
        user: createuser.data
    });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const data = yield (0, auth_1.SignIn)({ email, password });
    if (data.status == 402) {
        return res.status(402).json({
            message: data.message
        });
    }
    if (data.status == 411) {
        return res.status(411).json({
            message: data.message
        });
    }
    return res.status(200).json({
        message: data.message,
        token: data.data
    });
});
exports.signin = signin;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, phone_number } = req.body;
    const userId = req.userId;
    const updatedUser = yield (0, auth_1.UpdateUser)({ name, password, phone_number, userId });
    if (updatedUser.status == 402) {
        return res.status(updatedUser.status).json({
            message: updatedUser.message,
        });
    }
    if (updatedUser.status === 411) {
        return res.status(updatedUser.status).json({
            message: updatedUser.message
        });
    }
    return res.status(updatedUser.status).json({
        message: updatedUser.message,
        user: updatedUser.user
    });
});
exports.update = update;
