import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service";
import AuthRequest from "../interfaces/auth.interface";
import ApiKey from "../services/apiKey.service";

const {
    findOne
} = new UserService();
const ApiKeyService = new ApiKey();


export default function authenticate(req: Request, res: Response, next: NextFunction) {
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
        jwt.verify(token, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid token"
                });
            } else {
                const authenticatedUser = await findOne({ _id: decoded.id });
                if (!authenticatedUser) {
                    return res.status(404).send({
                        success: false,
                        message: "User not found"
                    });
                }
                (req as AuthRequest).user = authenticatedUser;
                next();
            }
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: `Unexpected Error: ${error.message}`
        });
    }
}

//authentication for files that allows for API-Key
async function authenticateForFiles(req: Request, res: Response, next: NextFunction) {
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
            jwt.verify(token, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
                if (err) {
                    return res.status(401).send({
                        success: false,
                        message: "Invalid token"
                    });
                } else {
                    const authenticatedUser = await findOne({ _id: decoded.id });
                    if (!authenticatedUser) {
                        return res.status(404).send({
                            success: false,
                            message: "User not found"
                        });
                    }
                    (req as AuthRequest).user = authenticatedUser;
                    next();
                }
            });
        } else if (apiKey) {
            const foundApiKey = await ApiKeyService.findOne({ key: apiKey, isValid: true })

            if (!foundApiKey) {
                return res.status(404).send({
                    success: false,
                    message: "No Api Key found"
                });
            }

            const authenticatedUser = await findOne({ _id: foundApiKey.userId });
            if (!authenticatedUser) {
                return res.status(404).send({
                    success: false,
                    message: "User not found"
                });
            }

            (req as AuthRequest).user = authenticatedUser;
            next();

        }
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: `Unexpected Error: ${error.message}`
        });
    }
}

export { authenticateForFiles };