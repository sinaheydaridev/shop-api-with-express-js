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
exports.mongoDrop = exports.mongoClose = exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// config
const config_1 = require("config");
const mongoConnect = () => {
    return mongoose_1.default
        .connect(config_1.config.MONGO_CONNECTION_URI)
        .then(() => {
        console.log("Connected mongoDB!");
    })
        .catch((error) => console.log(`Error connecting to mongoDB ${error}`));
};
exports.mongoConnect = mongoConnect;
const mongoClose = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection
        .close()
        .then(() => {
        console.log("Closed mongoDB!");
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.mongoClose = mongoClose;
const mongoDrop = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection
        .dropDatabase()
        .then(() => {
        console.log("Dropped mongoDB!");
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.mongoDrop = mongoDrop;
//# sourceMappingURL=database.js.map