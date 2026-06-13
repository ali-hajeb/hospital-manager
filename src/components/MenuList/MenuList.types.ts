import { UserRole } from "@/src/lib/module/user";

export default interface IMenuItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    href: string;
    role?: UserRole[]
}
