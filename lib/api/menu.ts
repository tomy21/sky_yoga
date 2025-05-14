import { Status } from "@prisma/client";
import API from "../api";

interface Menu {
    parentId: number | null;
    path: string;
    name: string;
    icon: string;
    position: number;
    status: Status;
    createdAt: string;
}

export const fetchMenus = async (page = 1, limit = 10, search="") => {
    const response = await API.get(`/menu?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchAllMenus = async () => {
    const response = await API.get(`/menu/all`);
    return response.data;
};

export const fetchMenuById = async (id: number) => {
    const response = await API.get(`/menu/${id}`);
    return response.data;
};

export const createMenu = async (data: Menu) => {
    const response = await API.post(`/menu`, data);
    return response.data;
};

export const updateMenu = async (id: number, data: Menu) => {
    const response = await API.put(`/menu/${id}`, data);
    return response.data;
};

export const deleteMenu = async (id: number) => {
    const response = await API.delete(`/menu/${id}`);
    return response.data;
};
