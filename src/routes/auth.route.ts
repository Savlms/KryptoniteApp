import express from 'express';

import AuthController from '../controllers/auth.controller';
import validate from '../middlewares/validate.middleware';
import { signupSchema, loginSchema } from '../schemas/user.schema';

const router = express.Router();
const {
    signUp,
    confirmEmail,
    resendConfirmationMail,
    login,
    confirmLogin
} = new AuthController();


//signup
router.post("/", validate(signupSchema), signUp);

//confirm email
router.post("/confirm-email", confirmEmail);

//resend confirm email
router.post("/email", resendConfirmationMail);

//login
router.post("/login", validate(loginSchema), login);

//confirm login
router.post("/confirm-login", confirmLogin);

export default router;