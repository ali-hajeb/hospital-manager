import { IUserSchema } from "@/src/lib/module/user";

export interface UserForm extends Omit<IUserSchema, "location" | "role"> {
    confirmPassword: string;
    location: string;
    role: string;
}
