import { Router } from "express";

import { AuthUserRoutes } from "./authUser/auth-user.routes";
import { CartRoutes } from "./cart/cart.routes";
import { ChatRoutes } from "./chat/chat.routes";
import { ProductRoutes } from "./product/product.routes";
import { UploadRoutes } from "./upload/upload.routes";

type Routers = { path: string; routes: Router }[];

const routers: Routers = [
  {
    path: "/auth",
    routes: new AuthUserRoutes().routes(),
  },
  {
    path: "/uploads",
    routes: new UploadRoutes().routes(),
  },
  {
    path: "/products",
    routes: new ProductRoutes().routes(),
  },
  {
    path: "/cart",
    routes: new CartRoutes().routes(),
  },
  {
    path: "/messages",
    routes: new ChatRoutes().routes(),
  },
];

export default routers;
