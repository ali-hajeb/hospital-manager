import { IUserPopulated } from "@/src/lib/module/common/types";
import { Badge } from "@mantine/core";

export function getCustomFieldValue(data: IUserPopulated, field: keyof IUserPopulated) {
    switch (field) {
        case 'role': 
            let color = '';
            if (data[field] === 'ADMIN') {
                color = 'blue';
            } else {
                color = 'cyan';
            }
            return <Badge variant="light" color={color}>{data[field].toLocaleString()}</Badge>
        case 'location':
            return data[field]?.name || 'نامشخص';
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
