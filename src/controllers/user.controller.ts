import { Request, Response } from "express";

import UserService from "../services/user.service";

const {
    findOne,
    findAll
} = new UserService();


export default class UserController {

    async getUser(req: Request, res: Response) {
        try {
            const _id = req.params.id;

            const user = await findOne({ _id });
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "User not found"
                });
            }

            const { id, email } = user
            return res.status(200).send({
                success: true,
                message: "User fetched succesfully",
                data: { id, email }
            });

        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error fetching user: ${error.message}`
            });
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const _id = req.params.id;

            const users = await findAll();

            return res.status(200).send({
                success: true,
                message: "Users fetched succesfully",
                data: users
            });

        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error fetching users: ${error.message}`
            });
        }
    }
}