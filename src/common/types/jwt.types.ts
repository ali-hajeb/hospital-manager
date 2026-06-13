import { UserRole } from "@/src/lib/module/user/user.types";

export default interface IJwtPayload {
    id: string;
    role: UserRole;
    location: string;
    iat: number;
    exp: number;
}
