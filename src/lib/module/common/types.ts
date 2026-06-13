import type { IUser } from "@/src/lib/module/user";
import { ILocation } from "@/src/lib/module/location";
import { IRecord } from "@/src/lib/module/record";

export interface IUserPopulated extends Omit<IUser, "location"> {
    location: ILocation
}

export interface IRecordPopulated extends Omit<IRecord, "location"> {
    location: ILocation
}
