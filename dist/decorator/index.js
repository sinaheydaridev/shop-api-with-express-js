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
Object.defineProperty(exports, "__esModule", { value: true });
const HttpResponse = (status = null) => {
    return function (target, _propertyKey, descriptor) {
        const getStatusCode = () => {
            switch (status) {
                case "ok":
                    return 200;
                case "created":
                    return 201;
                default:
                    return null;
            }
        };
        const declaredFn = descriptor.value;
        descriptor.value = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield declaredFn.apply(target, [req, res, next]);
                if (getStatusCode()) {
                    res.status(getStatusCode());
                }
                return result;
            }
            catch (err) {
                const error = err;
                res
                    .status(error.status)
                    .json({ message: error.message, statusCode: error.status });
            }
        });
    };
};
//# sourceMappingURL=index.js.map