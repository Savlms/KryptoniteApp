import { Document, ObjectId } from 'mongoose';

export default interface IToken extends Document {
    otp: string;
    userId: ObjectId;
    type: string;
    createdAt: Date;
}