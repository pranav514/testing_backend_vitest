"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const vitest_mock_extended_1 = require("vitest-mock-extended");
const vitest_1 = require("vitest");
const prismaMock = (0, vitest_mock_extended_1.mockDeep)();
(0, vitest_1.beforeEach)(() => {
    (0, vitest_mock_extended_1.mockReset)(prismaMock);
});
exports.prisma = prismaMock;
