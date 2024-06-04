import { Document } from 'mongoose';

export default interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    emailIsConfired: Boolean;
}