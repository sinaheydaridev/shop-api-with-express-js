"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1 * 60 * 60, // this is the expiry time in seconds
    },
});
const Token = (0, mongoose_1.model)("Token", tokenSchema);
exports.default = Token;
//# sourceMappingURL=token.model.js.map