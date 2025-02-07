"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisclient = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const redis_1 = require("redis");
exports.prisma = new client_1.PrismaClient();
exports.redisclient = (0, redis_1.createClient)();
