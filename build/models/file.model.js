"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fileData: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    strict: true,
    timestamps: true,
    versionKey: false
});
const File = (0, mongoose_1.model)("File", fileSchema, "Files");
exports.default = File;
