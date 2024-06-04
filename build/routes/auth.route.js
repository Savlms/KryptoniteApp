"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const user_schema_1 = require("../schemas/user.schema");
const router = express_1.default.Router();
const { signUp, confirmEmail, resendConfirmationMail, login, confirmLogin } = new auth_controller_1.default();
//signup
router.post("/", (0, validate_middleware_1.default)(user_schema_1.signupSchema), signUp);
//confirm email
router.post("/confirm-email", confirmEmail);
//resend confirm email
router.post("/email", resendConfirmationMail);
//login
router.post("/login", (0, validate_middleware_1.default)(user_schema_1.loginSchema), login);
//confirm login
router.post("/confirm-login", confirmLogin);
exports.default = router;
