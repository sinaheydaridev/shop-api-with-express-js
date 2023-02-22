import { Router } from "express";

import CartController from "core/cart/cart.controller";

export class CartRoutes {
  private router: Router;
  private cartController: CartController;

  constructor() {
    this.router = Router();
    this.cartController = new CartController();
  }

  routes() {
    this.router.get("", this.cartController.cart);
    this.router.get("/add-to-cart", this.cartController.addToCart);
    this.router.get("/remove-from-cart", this.cartController.removeFromCart);
    return this.router;
  }
}
