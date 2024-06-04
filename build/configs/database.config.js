"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
const logger_middleware_1 = __importDefault(require("../middlewares/logger.middleware"));
function connectToMongo() {
    mongoose_1.default.connect(process.env.DB_URI)
        .then(() => {
        logger_middleware_1.default.info("Connection to database has been established successfully.");
    })
        .catch((err) => {
        logger_middleware_1.default.error("Unable to connect to database.");
    });
}
exports.default = connectToMongo;
