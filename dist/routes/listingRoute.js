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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const listing_1 = require("../repositories/listing");
const lisiting_1 = require("../services/lisiting");
const router = express_1.default.Router();
router.post("/createlisting", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
router.put("/update/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, images, rent, prefered_gender, address, location_city, } = req.body;
    const listingId = req.params.id;
    const userId = req.userId;
    const updateListing = yield (0, lisiting_1.UpdateListings)({ title,
        description,
        images,
        rent,
        prefered_gender,
        address,
        location_city,
        listingId,
        userId });
    if (updateListing.status === 411) {
        return res.status(updateListing.status).json({
            message: updateListing.message
        });
    }
    return res.status(updateListing.status).json({
        message: updateListing.message
    });
}));
router.delete("/delete/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listingId = req.params.id;
    const userId = req.userId;
    const deleteListing = yield (0, lisiting_1.DeleteListing)({ listingId, userId });
    if (deleteListing.status === 411) {
        return res.status(deleteListing.status).json({
            message: "cannot delete the listing"
        });
    }
    return res.status(200).json({
        message: "listing deleted succesfully"
    });
}));
router.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const listings = yield (0, lisiting_1.GetAll)({ skip, limit, page });
    if (listings.status === 411) {
        return res.status(listings.status).json({
            message: listings.message
        });
    }
    return res.status(listings.status).json({
        message: listings.message,
        listings: listings.listing,
        pagination: listings.pagination
    });
}));
router.get("/getlisting/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listingId = req.params.id;
        const listing = yield (0, listing_1.findUnique)(listingId);
        console.log(listing);
        return res.status(200).json({
            message: "fetched the specific listing",
            listing,
        });
    }
    catch (error) {
        return res.status(411).json({
            message: "cannot fetched the listing",
        });
    }
}));
router.get("/userlisting", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const specificListing = yield (0, lisiting_1.GetUserSpecific)(userId);
    if (specificListing.status === 411) {
        return res.status(specificListing.status).json({
            message: specificListing.message
        });
    }
    return res.status(200).json({
        message: specificListing.message,
        listing: specificListing.listing
    });
}));
exports.default = router;
