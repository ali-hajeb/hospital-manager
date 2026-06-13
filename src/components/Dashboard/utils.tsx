import { JALALI_MONTHS } from "@/src/constants";
import { IRecordPopulated } from "@/src/lib/module/common/types";
import { ILocation } from "@/src/lib/module/location";

export function getCustomFieldValue(data: IRecordPopulated, field: keyof IRecordPopulated) {
    switch (field) {
        case 'location': 
            return (data[field] as ILocation)?.name || 'نامشخص';
        case 'month':
            return JALALI_MONTHS[data[field]];
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
