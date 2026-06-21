import axiosInstance from "@/src/lib/axios";
import type IRecord from "./record.types";
import type { INewRecord } from "./record.types";

export async function createRecord(data: INewRecord) {
    return axiosInstance.post('/record', data);
}

export async function updateRecord({ _id, ...updatedData }: IRecord) {
    return axiosInstance.patch('/record', {_id, ...updatedData});
}

export async function deleteRecord(id: string) {
    return axiosInstance.delete(`/record/${id}`);
}

export async function getRecords(params?: Record<string, string | number | undefined>) {
    return axiosInstance.get('/record', { params })
}

export async function getRecordById(id: string) {
    return axiosInstance.get(`/record/${id}`);
}

