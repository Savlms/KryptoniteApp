"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const apiKeySchema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    isValid: {
        type: Boolean,
        required: true
    }
}, {
    strict: true,
    timestamps: true,
    versionKey: false
});
const ApiKey = (0, mongoose_1.model)("APIKey", apiKeySchema, "APIKeys");
exports.default = ApiKey;
