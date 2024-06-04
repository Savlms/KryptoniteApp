import { model, Schema } from "mongoose";
import IFile from "../interfaces/file.interface";

const fileSchema = new Schema<IFile>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fileData: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    strict: true,
    timestamps: true,
    versionKey: false
});

const File = model<IFile>("File", fileSchema, "Files");
export default File;