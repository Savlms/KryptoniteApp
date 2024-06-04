"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    otp: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
        enum: ["emailConfirmation", "login"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Automatically removes document after 5 mins
        expires: 300
    }
}, {
    strict: true,
    versionKey: false
});
const Token = (0, mongoose_1.model)("Token", tokenSchema, "Tokens");
exports.default = Token;
