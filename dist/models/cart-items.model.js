"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, { timestamps: true, versionKey: false });
const CartItems = (0, mongoose_1.model)("CartItems", cartSchema);
exports.default = CartItems;
//# sourceMappingURL=cart-items.model.js.map