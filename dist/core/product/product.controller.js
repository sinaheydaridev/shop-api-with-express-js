"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("utils");
const product_service_1 = __importDefault(require("./product.service"));
class ProductController {
    productList(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { items, count, page, limit } = yield product_service_1.default.productList(req.query);
            return (0, utils_1.okResponse)(res, (0, utils_1.paginationResponse)({ items, pagination: { count, page, limit } }));
        });
    }
    productDetail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_service_1.default.productDetail(req.params.productId);
                return (0, utils_1.okResponse)(res, product);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map