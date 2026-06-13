import { Schema } from "mongoose";

export type UserRole = 'ADMIN' | 'MANAGER' | 'MANAGER_VIEW_ONLY' | 'ADMIN_VIEW_ONLY';

export interface IUserSchema {
    firstName: string;
    lastName: string;
    location: string | Schema.Types.ObjectId;
    username: string;
    password: string;
    role: UserRole;
}

export default interface IUser extends IUserSchema {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    location: string | Schema.Types.ObjectId;
    role: UserRole;
}

