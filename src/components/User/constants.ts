import { IUserPopulated } from "@/src/lib/module/common/types";
import { ITableViewField } from "@/src/components/TableView";

export const userSchemaFields: ITableViewField<IUserPopulated>[] = [
    {
        key: "firstName",
        title: "نام",
        alt: "نام کاربر",
        type: "text",
    },
    {
        key: "lastName",
        title: "نام خانوادگی",
        alt: "نام خانوادگی کاربر",
        type: "text",
    },
    {
        key: "username",
        title: "نام کاربری",
        alt: "نام کاربری با حروف انگلیسی",
        type: "text",
    },
    {
        key: "location",
        title: "مرکز",
        alt: "",
        type: "none",
    },
    {
        key: "role",
        title: "نقش کاربر",
        alt: "کارشناس / مدیر",
        type: "select",
        options: [
            {value: 'ADMIN', label: 'کارشناس'},
            {value: 'MANAGER', label: 'مدیر'},
            {value: 'MANAGER_VIEW_ONLY', label: 'ناظر (کل)'},
        ]
    },
];

export const filters = {
    username: 'براساس نام کاربری',
    lastName: 'براساس نام خانوادگی'
};
