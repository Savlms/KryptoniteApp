"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_middleware_1 = __importDefault(require("./logger.middleware"));
exports.default = (error, req, res, next) => {
    logger_middleware_1.default.error(error);
    return res.status(500).send({
        success: false,
        message: `Unexpected Error: ${error.message}`
    });
};
