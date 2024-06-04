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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_service_1 = __importDefault(require("../services/user.service"));
const token_service_1 = __importDefault(require("../services/token.service"));
const sendmail_util_1 = __importDefault(require("../utils/sendmail.util"));
const constants_config_1 = require("../configs/constants.config");
const { create, findOne, generateAuthToken } = new user_service_1.default();
const TokenService = new token_service_1.default();
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.emailIsConfired = false;
                const foundUser = yield findOne({ email: data.email });
                if (foundUser) {
                    return res.status(409).send({
                        success: false,
                        message: "Email already exists."
                    });
                }
                const user = yield create(data);
                const { id, email } = user;
                const token = yield TokenService.create(user._id, "emailConfirmation");
                const url = `${process.env.BASE_URL}${constants_config_1.BASEPATH}/auth/confirm-email?otp=${token.otp}&email=${email}`;
                yield (0, sendmail_util_1.default)({
                    from: `Kryptonite App <${process.env.MAIL_USER}>`,
                    to: email,
                    sender: "Kryptonite App",
                    subject: 'Confirm your email on Kryptonite App',
                    html: `Please confirm your email by clicking on the following link: ${url}`
                });
                return res.status(201).send({
                    success: true,
                    message: "Account created. Please check your email to confirm your registration. Link expires in 5 mins",
                    data: { id, email }
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error signing up: ${error.message}`
                });
            }
        });
    }
    confirmEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.query;
                if (!email || !otp) {
                    return res.status(401).send({
                        success: false,
                        message: "Please provide needed query"
                    });
                }
                const user = yield findOne({ email });
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: "User not found"
                    });
                }
                if (user.emailIsConfired) {
                    return res.status(404).send({
                        success: false,
                        message: "Email is already confirmed. Please log in."
                    });
                }
                const userToken = yield TokenService.findOne({ otp, userId: user._id, type: "emailConfirmation" });
                if (!userToken) {
                    return res.status(404).send({
                        success: false,
                        message: "Invalid or expired token"
                    });
                }
                user.emailIsConfired = true;
                yield user.save();
                return res.status(200).send({
                    success: true,
                    message: "Email confirmed succesfully",
                    data: { id: user.id, email }
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error confirming email: ${error.message}`
                });
            }
        });
    }
    resendConfirmationMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                if (!email) {
                    return res.status(401).send({
                        success: false,
                        message: "Please provide needed query"
                    });
                }
                const user = yield findOne({ email });
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: "User not found"
                    });
                }
                if (user.emailIsConfired) {
                    return res.status(404).send({
                        success: false,
                        message: "Email is already confirmed. Please log in."
                    });
                }
                const token = yield TokenService.create(user._id, "emailConfirmation");
                const url = `${process.env.BASE_URL}${constants_config_1.BASEPATH}/auth/confirm-email?otp=${token.otp}&email=${email}`;
                yield (0, sendmail_util_1.default)({
                    from: `Kryptonite App <${process.env.MAIL_USER}>`,
                    to: email,
                    sender: "Kryptonite App",
                    subject: 'Confirm your email on Kryptonite App',
                    html: `Please confirm your email by clicking on the following link: ${url}`
                });
                return res.status(200).send({
                    success: true,
                    message: "A new confirmation email has been sent, please check your email. Link expires in 5 mins",
                    data: { id: user._id, email }
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error resending confirmation token: ${error.message}`
                });
            }
        });
    }
    ;
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield findOne({ email: data.email });
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: "User doesn't exist"
                    });
                }
                const isValidPassword = yield bcryptjs_1.default.compare(data.password, user.password);
                if (!isValidPassword) {
                    return res.status(401).send({
                        success: false,
                        message: "Invalid credentials"
                    });
                }
                const { id, email } = user;
                const token = yield TokenService.create(id, "login");
                const url = `${process.env.BASE_URL}${constants_config_1.BASEPATH}/confirm-login?otp=${token.otp}&email=${email}`;
                yield (0, sendmail_util_1.default)({
                    from: `Kryptonite App <${process.env.MAIL_USER}>`,
                    to: email,
                    sender: "Kryptonite App",
                    subject: 'Welcome to Kryptonite App',
                    html: `Click this link to continue to our platform: ${url}`
                });
                return res.status(200).send({
                    success: true,
                    message: "Please check your email to confirm your login. Link expires in 5 mins",
                    data: { id, email }
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error logging in: ${error.message}`
                });
            }
        });
    }
    confirmLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.query;
                if (!email || !otp) {
                    return res.status(401).send({
                        success: false,
                        message: "Please provide needed query"
                    });
                }
                const user = yield findOne({ email });
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: "User not found"
                    });
                }
                const userToken = yield TokenService.findOne({ otp, userId: user._id, type: "login" });
                if (!userToken) {
                    return res.status(404).send({
                        success: false,
                        message: "Invalid or expired token, please proceed to login"
                    });
                }
                const token = generateAuthToken(user);
                return res.status(200).send({
                    success: true,
                    message: "Login confirmed succesfully",
                    data: { id: user.id, email, token }
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error confirming login: ${error.message}`
                });
            }
        });
    }
}
exports.default = UserController;
