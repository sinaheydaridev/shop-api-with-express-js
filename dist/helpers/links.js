"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationEmailLink = exports.generatePasswordResetLink = void 0;
const config_1 = require("config");
const generatePasswordResetLink = (resetToken, userId) => {
    const link = `${config_1.config.CLIENT_SERVER}/passwordReset?token=${resetToken}&id=${userId}`;
    return link;
};
exports.generatePasswordResetLink = generatePasswordResetLink;
const generateVerificationEmailLink = (token) => {
    const link = `${config_1.config.CLIENT_SERVER}/verification-email?token=${token}`;
    return link;
};
exports.generateVerificationEmailLink = generateVerificationEmailLink;
//# sourceMappingURL=links.js.map