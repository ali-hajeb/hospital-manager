import Users from "@/src/components/User/Users";
import { Card, Title } from "@mantine/core";

export interface UserPanelProps {
    title?: string;
}

export default function UsersPanel({
    title
}: UserPanelProps) {
    return <>
        {title && <Title mb={'md'}>{title}</Title>}
        <Card shadow="md">
            <Users />
        </Card>
    </>;
}
