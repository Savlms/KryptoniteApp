"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
function checkFileType(file, cb) {
    const filetypes = /img|jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
        return cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
exports.default = upload;
