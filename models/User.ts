import mongoose, {Schema, Document} from "mongoose";

export interface IUser {
    userName: string;
    email: string;
    password: string;
    role: string;
}

export interface IUserModel extends IUser ,Document{};

const userSchema: Schema = new Schema(
    {
        userName:{
            type: String,
            required: true,
            unique: true,
        },
        email : {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        }
    }
);

export default mongoose.model<IUserModel>("User", userSchema);