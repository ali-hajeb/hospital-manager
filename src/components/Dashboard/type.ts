import { INewRecord } from "@/src/lib/module/record";

export interface SearchForm {
    location: string;
    year: string;
}

export interface RecordForm extends Omit<INewRecord, "location" | "ins" | "bor" | "alos" | "surgIntensity" | "dedPerc" | "collRation" | "docPct" | "_table"> {
    location: string;
}
