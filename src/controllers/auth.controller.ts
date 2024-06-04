import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import UserService from "../services/user.service";
import Token from "../services/token.service";
import sendEmail from "../utils/sendmail.util";
import { BASEPATH } from "../configs/constants.config";

const {
    create,
    findOne,
    generateAuthToken
} = new UserService();
const TokenService = new Token();


export default class UserController {

    async signUp(req: Request, res: Response) {

        try {

            const data = req.body;
            data.emailIsConfired = false;

            const foundUser = await findOne({ email: data.email });

            if (foundUser) {
                return res.status(409).send({
                    success: false,
                    message: "Email already exists."
                });
            }

            const user = await create(data)
            const { id, email } = user!;

            const token = await TokenService.create(user._id, "emailConfirmation");
            const url = `${process.env.BASE_URL}${BASEPATH}/auth/confirm-email?otp=${token.otp}&email=${email}`;

            await sendEmail({
                from: `Kryptonite App <${process.env.MAIL_USER}>`,
                to: email,
                sender: "Kryptonite App",
                subject: 'Confirm your email on Kryptonite App',
                html: `Please confirm your email by clicking on the following link: ${url}`
            })

            return res.status(201).send({
                success: true,
                message: "Account created. Please check your email to confirm your registration. Link expires in 5 mins",
                data: { id, email }
            });

        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error signing up: ${error.message}`
            });
        }
    }

    async confirmEmail(req: Request, res: Response) {

        try {

            const { email, otp } = req.query;
            if (!email || !otp) {
                return res.status(401).send({
                    success: false,
                    message: "Please provide needed query"
                });
            }

            const user = await findOne({ email });
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

            const userToken = await TokenService.findOne({ otp, userId: user._id, type: "emailConfirmation" });
            if (!userToken) {
                return res.status(404).send({
                    success: false,
                    message: "Invalid or expired token"
                });
            }

            user.emailIsConfired = true;
            await user.save();

            return res.status(200).send({
                success: true,
                message: "Email confirmed succesfully",
                data: { id: user.id, email }
            });

        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error confirming email: ${error.message}`
            });
        }
    }

    async resendConfirmationMail(req: Request, res: Response) {
        try {
            const { email } = req.query;
            if (!email) {
                return res.status(401).send({
                    success: false,
                    message: "Please provide needed query"
                });
            }
            const user = await findOne({ email });
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

            const token = await TokenService.create(user._id, "emailConfirmation");
            const url = `${process.env.BASE_URL}${BASEPATH}/auth/confirm-email?otp=${token.otp}&email=${email}`;

            await sendEmail({
                from: `Kryptonite App <${process.env.MAIL_USER}>`,
                to: email,
                sender: "Kryptonite App",
                subject: 'Confirm your email on Kryptonite App',
                html: `Please confirm your email by clicking on the following link: ${url}`
            })

            return res.status(200).send({
                success: true,
                message: "A new confirmation email has been sent, please check your email. Link expires in 5 mins",
                data: { id: user._id, email }
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error resending confirmation token: ${error.message}`
            });
        }
    };

    async login(req: Request, res: Response) {

        try {

            const data = req.body;

            const user = await findOne({ email: data.email });

            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "User doesn't exist"
                });
            }

            const isValidPassword = await bcrypt.compare(data.password, user.password);

            if (!isValidPassword) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid credentials"
                });
            }

            const { id, email } = user!;
            const token = await TokenService.create(id, "login");
            const url = `${process.env.BASE_URL}${BASEPATH}/confirm-login?otp=${token.otp}&email=${email}`;

            await sendEmail({
                from: `Kryptonite App <${process.env.MAIL_USER}>`,
                to: email,
                sender: "Kryptonite App",
                subject: 'Welcome to Kryptonite App',
                html: `Click this link to continue to our platform: ${url}`
            })

            return res.status(200).send({
                success: true,
                message: "Please check your email to confirm your login. Link expires in 5 mins",
                data: { id, email }
            });

        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error logging in: ${error.message}`
            });
        }
    }

    async confirmLogin(req: Request, res: Response) {

        try {

            const { email, otp } = req.query;
            if (!email || !otp) {
                return res.status(401).send({
                    success: false,
                    message: "Please provide needed query"
                });
            }

            const user = await findOne({ email });
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "User not found"
                });
            }

            const userToken = await TokenService.findOne({ otp, userId: user._id, type: "login" });

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

        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error confirming login: ${error.message}`
            });
        }
    }
}