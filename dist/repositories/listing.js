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
exports.deleteListing = exports.findUniqueListing = exports.findMany = exports.findUnique = exports.Count = exports.getAll = exports.Update = exports.Create = void 0;
const db_1 = require("../db");
const Create = ({ title, description, images, rent, prefered_gender, address, location_city, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield db_1.prisma.listing.create({
        data: {
            title: title,
            description: description,
            images: images,
            rent: Number(rent),
            prefered_gender,
            address: address,
            location_city: location_city,
            userId: userId,
        }
    });
    return listing;
});
exports.Create = Create;
const Update = ({ title, description, images, rent, prefered_gender, address, location_city, listingId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const updateListing = yield db_1.prisma.listing.update({
        where: {
            id: listingId,
            userId: userId,
        },
        data: Object.assign(Object.assign({ title,
            description,
            images }, (rent !== undefined ? { rent: Number(rent) } : {})), { prefered_gender,
            address,
            location_city }),
    });
    return updateListing;
});
exports.Update = Update;
const getAll = ({ skip, limit }) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield db_1.prisma.listing.findMany({
        skip: Number(skip),
        take: Number(limit),
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    phone_number: true,
                },
            },
            pings: {
                select: {
                    message: true,
                    userId: true,
                    createdAt: true,
                }
            }
        },
    });
    return listing;
});
exports.getAll = getAll;
const Count = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.prisma.listing.count();
    return count;
});
exports.Count = Count;
const findUnique = (listingId) => __awaiter(void 0, void 0, void 0, function* () {
    const lisiting = yield db_1.prisma.listing.findUnique({
        where: {
            id: listingId
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    phone_number: true
                }
            }
        }
    });
    return lisiting;
});
exports.findUnique = findUnique;
const findMany = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield db_1.prisma.listing.findMany({
        where: {
            userId: userId
        }
    });
    return listing;
});
exports.findMany = findMany;
const findUniqueListing = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield db_1.prisma.listing.findUnique({
        where: {
            id: postId
        },
        select: {
            prefered_gender: true
        }
    });
    return listing;
});
exports.findUniqueListing = findUniqueListing;
const deleteListing = ({ listingId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield db_1.prisma.listing.delete({
        where: {
            id: listingId,
            userId: userId,
        },
    });
    return listing;
});
exports.deleteListing = deleteListing;
