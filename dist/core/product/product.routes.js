"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = __importDefault(require("core/product/product.controller"));
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.productController = new product_controller_1.default();
    }
    routes() {
        this.router.get("", this.productController.productList);
        this.router.get("/:productId", this.productController.productDetail);
        return this.router;
    }
}
exports.ProductRoutes = ProductRoutes;
//# sourceMappingURL=product.routes.js.map