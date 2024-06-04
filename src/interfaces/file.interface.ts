import { Document, ObjectId } from 'mongoose';

export default interface IFile extends Document {
    name: string;
    fileData: string;
    userId: ObjectId;
}