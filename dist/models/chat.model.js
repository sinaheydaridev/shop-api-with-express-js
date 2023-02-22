"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });
const Cart = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = Cart;
//# sourceMappingURL=chat.model.js.map