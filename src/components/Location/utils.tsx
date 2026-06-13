import { ILocation } from "@/src/lib/module/location";

export function getCustomFieldValue(data: ILocation, field: keyof ILocation) {
    switch (field) {
        default: {
            return data[field]?.toLocaleString() || '';
        }
    }
}
