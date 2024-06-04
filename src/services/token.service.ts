import { FilterQuery } from "mongoose";
import IToken from "../interfaces/token.interface";
import Token from "../models/token.model";


export default class TokenService {

    async create(userId: string, type: string) {
        return await Token.create({
            otp: this.generateToken(),
            userId,
            type
        });
    }

    async findOne(query: FilterQuery<IToken>) {
        return await Token.findOne(query);

    }

    generateToken() {
        return Math.floor(Math.random() * 900000) + 100000;
    }
}