"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_user_routes_1 = require("./authUser/auth-user.routes");
const cart_routes_1 = require("./cart/cart.routes");
const chat_routes_1 = require("./chat/chat.routes");
const product_routes_1 = require("./product/product.routes");
const upload_routes_1 = require("./upload/upload.routes");
const routers = [
    {
        path: "/auth",
        routes: new auth_user_routes_1.AuthUserRoutes().routes(),
    },
    {
        path: "/uploads",
        routes: new upload_routes_1.UploadRoutes().routes(),
    },
    {
        path: "/products",
        routes: new product_routes_1.ProductRoutes().routes(),
    },
    {
        path: "/cart",
        routes: new cart_routes_1.CartRoutes().routes(),
    },
    {
        path: "/messages",
        routes: new chat_routes_1.ChatRoutes().routes(),
    },
];
exports.default = routers;
//# sourceMappingURL=index.js.map