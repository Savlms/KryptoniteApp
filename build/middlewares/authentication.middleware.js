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
exports.authenticateForFiles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user.service"));
const apiKey_service_1 = __importDefault(require("../services/apiKey.service"));
const { findOne } = new user_service_1.default();
const ApiKeyService = new apiKey_service_1.default();
function authenticate(req, res, next) {
    try {
        const tokenHeader = req.headers['authorization'];
        if (!tokenHeader) {
            return res.status(401).send({
                success: false,
                message: "Please provide needed token"
            });
        }
        const tokenParts = tokenHeader.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).send({
                success: false,
                message: "Invalid token"
            });
        }
        const token = tokenParts[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid token"
                });
            }
            else {
                const authenticatedUser = yield findOne({ _id: decoded.id });
                if (!authenticatedUser) {
                    return res.status(404).send({
                        success: false,
                        message: "User not found"
                    });
                }
                req.user = authenticatedUser;
                next();
            }
        }));
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: `Unexpected Error: ${error.message}`
        });
    }
}
exports.default = authenticate;
//authentication for files that allows for API-Key
function authenticateForFiles(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenHeader = req.headers['authorization'];
            const apiKey = req.header('X-API-Key');
            if (!tokenHeader && !apiKey) {
                return res.status(401).send({
                    success: false,
                    message: "Please provide token or API-Key"
                });
            }
            if (tokenHeader) {
                const tokenParts = tokenHeader.split(' ');
                if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
                    return res.status(401).send({
                        success: false,
                        message: "Invalid token"
                    });
                }
                const token = tokenParts[1];
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.status(401).send({
                            success: false,
                            message: "Invalid token"
                        });
                    }
                    else {
                        const authenticatedUser = yield findOne({ _id: decoded.id });
                        if (!authenticatedUser) {
                            return res.status(404).send({
                                success: false,
                                message: "User not found"
                            });
                        }
                        req.user = authenticatedUser;
                        next();
                    }
                }));
            }
            else if (apiKey) {
                const foundApiKey = yield ApiKeyService.findOne({ key: apiKey, isValid: true });
                if (!foundApiKey) {
                    return res.status(404).send({
                        success: false,
                        message: "No Api Key found"
                    });
                }
                const authenticatedUser = yield findOne({ _id: foundApiKey.userId });
                if (!authenticatedUser) {
                    return res.status(404).send({
                        success: false,
                        message: "User not found"
                    });
                }
                req.user = authenticatedUser;
                next();
            }
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                message: `Unexpected Error: ${error.message}`
            });
        }
    });
}
exports.authenticateForFiles = authenticateForFiles;
