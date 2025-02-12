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
exports.GetUserSpecific = exports.SpecificListing = exports.GetAll = exports.DeleteListing = exports.UpdateListings = exports.CreateListing = exports.avnishv = void 0;
const listing_1 = require("../repositories/listing");
const db_1 = require("../db");
const avnishv = () => {
    const hello = console.log("hello world");
};
exports.avnishv = avnishv;
const CreateListing = ({ title, description, images, rent, prefered_gender, address, location_city, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!title || !description || !address || !location_city) {
            return {
                message: "some fields are missing",
                status: 402
            };
        }
        const lisiting = yield (0, listing_1.Create)({ title, description, images, rent, prefered_gender, address, location_city, userId });
        return {
            message: "listing added succesfully",
            status: 200,
            data: lisiting
        };
    }
    catch (error) {
        return {
            message: "error occured while creating the listing",
            status: 411
        };
    }
});
exports.CreateListing = CreateListing;
const UpdateListings = ({ title, description, images, rent, prefered_gender, address, location_city, listingId, userId, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(listingId);
        console.log(userId);
        const listing = yield (0, listing_1.Update)({
            title,
            description,
            images,
            rent,
            prefered_gender,
            address,
            location_city,
            listingId,
            userId,
        });
        console.log(listing);
        return {
            message: "listing updated succesfully",
            status: 200,
        };
    }
    catch (error) {
        return {
            message: "error occured while updating the listings",
            status: 411
        };
    }
});
exports.UpdateListings = UpdateListings;
const DeleteListing = ({ listingId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield (0, listing_1.deleteListing)({ listingId, userId });
        return {
            message: "listing deleted succesfully",
            status: 200,
        };
    }
    catch (error) {
        return {
            message: "cannot delete the listing",
            status: 411
        };
    }
});
exports.DeleteListing = DeleteListing;
const GetAll = ({ skip, limit, page }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = `listings:skip=${skip}:limit=${limit}`;
        const cachedData = yield db_1.redisclient.get(key);
        if (cachedData) {
            return Object.assign({ message: "fetched from the cached succesfully", status: 200 }, JSON.parse(cachedData));
        }
        const listing = yield (0, listing_1.getAll)({ skip, limit });
        const totalCount = yield (0, listing_1.Count)();
        const totalPage = Math.ceil(totalCount / Number(limit));
        const responseData = {
            listing: listing,
            pagination: {
                currentPage: page,
                totalPage: totalPage,
                totalItems: totalCount,
                itemsPerPage: limit
            }
        };
        yield db_1.redisclient.setEx(key, 3600, JSON.stringify(responseData));
        return Object.assign({ message: "all listings fetched successfully", status: 200 }, responseData);
    }
    catch (error) {
        return {
            message: "cannot fetched all the blogs",
            status: 411
        };
    }
});
exports.GetAll = GetAll;
const SpecificListing = (listingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield (0, listing_1.findUnique)(listingId);
        console.log(listing);
        return {
            message: "fetched the specific listing",
            status: 200,
            listing
        };
    }
    catch (error) {
        return {
            message: "cannot fetched the listing",
            status: 411,
        };
    }
});
exports.SpecificListing = SpecificListing;
const GetUserSpecific = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("userId", userId);
        const listing = yield (0, listing_1.findMany)(userId);
        console.log(listing);
        return {
            message: `fetched the blog of the user ${userId}`,
            status: 200,
            listing
        };
    }
    catch (error) {
        return {
            message: "cannot fetched the blog",
            status: 411,
        };
    }
});
exports.GetUserSpecific = GetUserSpecific;
