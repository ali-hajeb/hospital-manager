import IMenuItem from "@/src/components/MenuList/MenuList.types";
import { IconBuildingHospital, IconDoorExit, IconHome, IconUsers } from "@tabler/icons-react";
import { BASE_PATH } from "./index";

export const SIDE_NAV_LIST: IMenuItem[] = [
    {
        id: '1',
        title: 'صفحه اصلی',
        href: `${BASE_PATH}/dashboard`,
        icon: <IconHome size={20} />
    },
    {
        id: '2',
        title: 'مراکز',
        href: `${BASE_PATH}/location`,
        icon: <IconBuildingHospital size={20} />
    },
    {
        id: '98',
        title: 'کاربران',
        href: `${BASE_PATH}/user`,
        icon: <IconUsers size={20} />,
        role: ['MANAGER']
    },
    {
        id: '99',
        title: 'خروج',
        href: `${BASE_PATH}/logout`,
        icon: <IconDoorExit size={20} />
    },
];
