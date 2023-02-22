"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdResponse = exports.okResponse = exports.paginationResponse = void 0;
const paginationResponse = (data) => {
    const { items, pagination: { page, limit = "10", count }, } = data;
    return {
        items,
        pagination: {
            page,
            limit,
            count,
            totalPages: Math.ceil(count / +limit),
        },
    };
};
exports.paginationResponse = paginationResponse;
const okResponse = (res, data) => {
    res.status(200);
    return res.json(data);
};
exports.okResponse = okResponse;
const createdResponse = (res, data) => {
    res.status(201);
    return res.json(data);
};
exports.createdResponse = createdResponse;
//# sourceMappingURL=response.js.map