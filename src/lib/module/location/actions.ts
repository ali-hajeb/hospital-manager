import axiosInstance from "@/src/lib/axios";
import type ILocation from "./location.types";
import type { INewLocation } from "./location.types";

export async function createLocation(data: INewLocation) {
    return axiosInstance.post('/location', data);
}

export async function updateLocation({ _id, ...updatedData }: ILocation) {
    return axiosInstance.patch('/location', {_id, ...updatedData});
}

export async function deleteLocation(id: string) {
    return axiosInstance.delete(`/location/${id}`);
}

export async function getLocations(params?: Record<string, string>) {
    return axiosInstance.get('/location', { params })
}

export async function getLocationById(id: string) {
    return axiosInstance.get(`/location/${id}`);
}

