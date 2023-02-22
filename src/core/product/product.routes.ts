import { Router } from "express";

import ProductController from "core/product/product.controller";

export class ProductRoutes {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
  }

  routes() {
    this.router.get("", this.productController.productList);
    this.router.get("/:productId", this.productController.productDetail);
    return this.router;
  }
}
