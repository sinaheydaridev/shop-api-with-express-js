"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("enums");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // select: false,
    },
    mobileNumber: {
        type: String,
        maxlength: 10,
        required: true,
    },
    birthYear: {
        type: Number,
        max: 2000,
        min: 1900,
    },
    skillSet: {
        type: Array,
    },
    isVerifyEmail: {
        type: Boolean,
        default: true,
    },
    profileImage: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        enum: enums_1.Gender,
    },
}, { timestamps: true, versionKey: false });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map