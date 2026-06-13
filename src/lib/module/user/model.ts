import mongoose, { Model, Schema } from "mongoose";
import { IUserSchema } from "./user.types";
import { passwordReg } from "@/src/utils";

const userSchema = new Schema<IUserSchema>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: [6, 'Password must be longer than 6 characters!'],
        validate: {
            validator(password) {
                return passwordReg.test(password);
            },
            message: '{VALUE} is not a valid password!',
        },
        required: true,
    },
    location: {
        ref: 'Locations',
        type: Schema.Types.ObjectId,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'MANAGER', 'MANAGER_VIEW_ONLY', 'ADMIN_VIEW_ONLY'],
        default: 'ADMIN',
    },
});

const User: Model<IUserSchema> = (mongoose.models && mongoose.models.User) || mongoose.model('User', userSchema);

export default User;
