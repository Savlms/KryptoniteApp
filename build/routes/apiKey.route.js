"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiKey_controller_1 = __importDefault(require("../controllers/apiKey.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const { generateApiKey, invalidateApiKey } = new apiKey_controller_1.default();
const router = express_1.default.Router();
//generate apiKey
router.post("/", authentication_middleware_1.default, generateApiKey);
//invalidate apiKey
router.patch("/", authentication_middleware_1.default, invalidateApiKey);
exports.default = router;
