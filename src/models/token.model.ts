import { model, Schema } from "mongoose";
import IToken from "../interfaces/token.interface";

const tokenSchema = new Schema<IToken>({
    otp: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
        enum: ["emailConfirmation", "login"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Automatically removes document after 5 mins
        expires: 300
    }
}, {
    strict: true,
    versionKey: false
});

const Token = model<IToken>("Token", tokenSchema, "Tokens");
export default Token;