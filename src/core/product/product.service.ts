import { PaginationQuery } from "interfaces/pagination.interface";

import Product from "models/product.model";

import { BadRequestException, NotFoundException } from "utils";

import { objectIdValidation } from "validations/params/object-id.validation";

export default new (class productService {
  /** List */

  async productList({ page, limit }: PaginationQuery) {
    const items = await Product.find()
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const count = await Product.count();
    return { items, count, page, limit };
  }

  /** Detail */

  async productDetail(productId: string) {
    objectIdValidation({ id: productId, name: "productId" });
    const product = await Product.findOne({ _id: productId });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }
})();
