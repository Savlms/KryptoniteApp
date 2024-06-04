import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import IUser from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    emailIsConfired: {
        type: Boolean,
        required: true
    }
}, {
    strict: true,
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update: any = this.getUpdate();
    let passwordHash;
    if (update.$set.password) {
        const salt = await bcrypt.genSalt(10);
        passwordHash = await bcrypt.hash(update.$set.password, salt);
        update.$set.password = passwordHash;
    }
    update.$set.updatedAt = new Date();
    next();
});

const User = model<IUser>("User", userSchema, "Users");
export default User;