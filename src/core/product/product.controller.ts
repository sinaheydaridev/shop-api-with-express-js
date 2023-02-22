import { NextFunction } from "express-serve-static-core";

import {
  ApplicationRequest,
  ApplicationResponse,
} from "interfaces/application.interface";
import { Pagination, PaginationQuery } from "interfaces/pagination.interface";

import { IProduct } from "models/product.model";

import { okResponse, paginationResponse } from "utils";

import productService from "./product.service";

export default class ProductController {
  async productList(
    req: ApplicationRequest<PaginationQuery>,
    res: ApplicationResponse<Pagination<IProduct[]>>,
    _next: NextFunction
  ) {
    const { items, count, page, limit } = await productService.productList(
      req.query
    );
    return okResponse(
      res,
      paginationResponse({ items, pagination: { count, page, limit } })
    );
  }

  async productDetail(
    req: ApplicationRequest<{ productId: string }>,
    res: ApplicationResponse<IProduct | null>,
    next: NextFunction
  ) {
    try {
      const product = await productService.productDetail(req.params.productId);
      return okResponse(res, product);
    } catch (error) {
      next(error);
    }
  }
}
