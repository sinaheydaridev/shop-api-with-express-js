"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("core/cart/cart.controller"));
class CartRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.cartController = new cart_controller_1.default();
    }
    routes() {
        this.router.get("", this.cartController.cart);
        this.router.get("/add-to-cart", this.cartController.addToCart);
        this.router.get("/remove-from-cart", this.cartController.removeFromCart);
        return this.router;
    }
}
exports.CartRoutes = CartRoutes;
//# sourceMappingURL=cart.routes.js.map