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
exports.createlisting = void 0;
const lisiting_1 = require("../services/lisiting");
const createlisting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, images, rent, prefered_gender, address, location_city, } = req.body;
    const userId = req.userId;
    const listing = yield (0, lisiting_1.CreateListing)({
        title,
        description,
        images,
        rent,
        prefered_gender,
        address,
        location_city,
        userId,
    });
    if (listing.status === 402) {
        return res.status(listing.status).json({
            message: listing.message,
        });
    }
    if (listing.status === 411) {
        return res.status(listing.status).json({
            message: listing.message,
        });
    }
    return res.status(listing.status).json({
        message: listing.message,
        listing: listing.data,
    });
});
exports.createlisting = createlisting;
