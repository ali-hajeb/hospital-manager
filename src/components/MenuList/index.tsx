import { Stack } from "@mantine/core";
import IMenuItem from "./MenuList.types";
import { useContext } from "react";
import UserContext from "@/src/contexts/UserContext";
import MenuItem from "./MenuItem";
import { usePathname } from "next/navigation";

export interface MenuListProps {
    items: IMenuItem[];
}

export default function MenuList({
    items
}: MenuListProps) {
    const pathName = usePathname();
    const userContext = useContext(UserContext);
    return <Stack gap={'md'}>
        { items.map(item => {
            if (!item.role || (item.role && userContext && item.role.includes(userContext.role))) {
                return <MenuItem key={item.id} active={pathName.startsWith(item.href)} {...item}/>
            }
        })}
    </Stack>
};
