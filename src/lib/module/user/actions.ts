import axiosInstance from "@/src/lib/axios";
import type { IUserSchema } from "./user.types";
import type IUser from './user.types';

interface ILoginData {
    username: string;
    password: string;
};
export async function login({ username, password }: ILoginData) {
    return axiosInstance.post('/auth/login', { username, password });
}

export async function logout() {
    return axiosInstance.post('/auth/logout');
}

export async function createUser(data: IUserSchema) {
    return axiosInstance.post('/auth/register', { ...data });
}

export async function updateUser({ _id, ...updatedData }: IUser) {
    return axiosInstance.patch('/auth', {_id, ...updatedData});
}

export async function deleteUser(id: string) {
    return axiosInstance.delete(`/auth/${id}`);
}

export async function getUsers(params: Record<string, string>) {
    return axiosInstance.get('/auth', { params })
}

export async function getUserInfo(_id: string) {
    return axiosInstance.get('/auth', { params: { _id, one: true}});
}

export async function getCurrentUserInfo() {
    return axiosInstance.get('/auth/me');
}
