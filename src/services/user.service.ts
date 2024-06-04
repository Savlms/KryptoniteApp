import jwt from "jsonwebtoken";
import { randomBytes } from 'crypto';

import User from "../models/user.model";
import IUser from "../interfaces/user.interface";
import { FilterQuery } from "mongoose";


export default class UserService {

    async create(user: IUser) {
        return await User.create(user);
    }

    async findOne(query: FilterQuery<IUser>) {
        return await User.findOne(query);
    }

    async findAll() {
        return await User.find();
    }

    generateAuthToken(user: IUser) {
        return jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: (3 * 24 * 60 * 60),
            }
        );
    }
}
