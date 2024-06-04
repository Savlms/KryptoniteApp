"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const { findOne, findAll } = new user_service_1.default();
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const user = yield findOne({ _id });
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: "User not found"
                    });
                }
                const { id, email } = user;
                return res.status(200).send({
                    success: true,
                    message: "User fetched succesfully",
                    data: { id, email }
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error fetching user: ${error.message}`
                });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const users = yield findAll();
                return res.status(200).send({
                    success: true,
                    message: "Users fetched succesfully",
                    data: users
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error fetching users: ${error.message}`
                });
            }
        });
    }
}
exports.default = UserController;
