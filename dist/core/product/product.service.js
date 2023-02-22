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
const product_model_1 = __importDefault(require("models/product.model"));
const utils_1 = require("utils");
const object_id_validation_1 = require("validations/params/object-id.validation");
exports.default = new (class productService {
    /** List */
    productList({ page, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield product_model_1.default.find()
                .skip((+page - 1) * +limit)
                .limit(+limit);
            const count = yield product_model_1.default.count();
            return { items, count, page, limit };
        });
    }
    /** Detail */
    productDetail(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, object_id_validation_1.objectIdValidation)({ id: productId, name: "productId" });
            const product = yield product_model_1.default.findOne({ _id: productId });
            if (!product)
                throw new utils_1.NotFoundException("Product not found");
            return product;
        });
    }
})();
//# sourceMappingURL=product.service.js.map