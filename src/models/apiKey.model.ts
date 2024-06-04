import { model, Schema } from "mongoose";
import IApiKey from "../interfaces/apiKey.interface";

const apiKeySchema = new Schema<IApiKey>({
    key: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    isValid: {
        type: Boolean,
        required: true
    }
}, {
    strict: true,
    timestamps: true,
    versionKey: false
});

const ApiKey = model<IApiKey>("APIKey", apiKeySchema, "APIKeys");
export default ApiKey;