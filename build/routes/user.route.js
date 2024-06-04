"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const { getUser, getUsers } = new user_controller_1.default();
const router = express_1.default.Router();
//get a user
router.get("/:id", authentication_middleware_1.default, getUser);
//get all users
router.get("/", authentication_middleware_1.default, getUsers);
exports.default = router;
