import Location from "@/src/components/Location";
import { Card, Title } from "@mantine/core";

export default function LocationPanel() {
    return <>
        <Title mb={'md'}>مراکز تابع</Title>
        <Card shadow="md">
            <Location />
        </Card>
    </>
}
