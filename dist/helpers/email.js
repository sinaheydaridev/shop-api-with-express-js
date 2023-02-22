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
exports.sendEmail = void 0;
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("config");
const transporter = nodemailer_1.default.createTransport({
    host: config_1.config.SMTP_HOST,
    port: config_1.config.SMTP_PORT,
    auth: {
        user: config_1.config.SMTP_USERNAME,
        pass: config_1.config.SMTP_PASSWORD,
    },
});
const sendEmail = ({ subject, to, template, context, }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ejs_1.default.renderFile(path_1.default.join(process.cwd(), "src", "views", `${template}.view.ejs`), context);
    const mainOptions = {
        subject,
        from: "<noreply@shop.com>",
        to,
        html: data,
    };
    transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Message sent: " + info.response);
        }
    });
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map