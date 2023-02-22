"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const env = (key, defaultValue = undefined) => {
    const value = process.env[key];
    if (!value && !defaultValue) {
        return undefined;
    }
    else if (!value && defaultValue) {
        return defaultValue;
    }
    return value;
};
exports.env = env;
//# sourceMappingURL=env.js.map