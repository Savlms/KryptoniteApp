"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const apiKey_route_1 = __importDefault(require("./apiKey.route"));
const file_route_1 = __importDefault(require("./file.route"));
const constants_config_1 = require("../configs/constants.config");
exports.default = (app) => {
    app.use(`${constants_config_1.BASEPATH}/auth`, auth_route_1.default);
    app.use(`${constants_config_1.BASEPATH}/user`, user_route_1.default);
    app.use(`${constants_config_1.BASEPATH}/api-key`, apiKey_route_1.default);
    app.use(`${constants_config_1.BASEPATH}/file`, file_route_1.default);
    app.use(`${constants_config_1.BASEPATH}/`, (_req, res) => {
        res.send("Welcome to Krptonite API");
    });
    app.use("/", (_req, res) => {
        res.redirect(`${constants_config_1.BASEPATH}`);
    });
};
