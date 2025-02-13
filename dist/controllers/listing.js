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
exports.specificlisting = exports.getlisting = exports.deletelisting = exports.updatelisting = exports.createlisting = void 0;
const lisiting_1 = require("../services/lisiting");
const notification_1 = require("../eventemitter/notification");
const notificationListner_1 = require("../utils/notificationListner");
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
    console.log("from the controller");
    notification_1.notificationEmitter.emit("ListingCreated", listing.data);
    notificationListner_1.notificationGenerator;
    return res.status(listing.status).json({
        message: listing.message,
        listing: listing.data,
    });
});
exports.createlisting = createlisting;
const updatelisting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            message: updateListing.message,
        });
    }
    notification_1.notificationEmitter.emit("ListingUpdated", updateListing.data);
    notificationListner_1.specificlistingNotification;
    return res.status(updateListing.status).json({
        message: updateListing.message,
        data: updateListing.data
    });
});
exports.updatelisting = updatelisting;
const deletelisting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.deletelisting = deletelisting;
const getlisting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.getlisting = getlisting;
const specificlisting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listingId = req.params.id;
    const lisiting = yield (0, lisiting_1.SpecificListing)(listingId);
    if (lisiting.status === 411) {
        return res.status(lisiting.status).json({
            message: lisiting.message
        });
    }
    return res.status(lisiting.status).json({
        message: lisiting.message,
        lisiting: lisiting.listing
    });
});
exports.specificlisting = specificlisting;
