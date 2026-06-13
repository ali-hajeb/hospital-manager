import { INewLocation } from "@/src/lib/module/location";
import type { ITableViewField } from '@/src/components/TableView/types';

export const locationSchemaFields: ITableViewField<INewLocation>[] = [
    {
        key: "name",
        title: "نام",
        alt: "نام مرکز",
        type: "text",
    },
    {
        key: "city",
        title: "شهر/روستا",
        alt: "شهر یا روستا مرکز",
        type: "text",
    },
    {
        key: "address",
        title: "آدرس",
        alt: "آدرس مرکز",
        type: "text",
    },
];

export const filters = {
    name: 'براساس نام مرکز',
    city: 'براساس شهر/روستا',
    address: 'براساس آدرس'
};
