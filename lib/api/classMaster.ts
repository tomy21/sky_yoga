import API from "../api";

interface ClassMaster {
    name: string;
    type: string;
    status: "ACTIVE" | "INACTIVE";
}

export const fetchClass = async (page = 1, limit = 10, search="") => {
    const response = await API.get(`/class-master?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchAllClass = async (page = 1, limit = 10, search="") => {
    const response = await API.get(`/class-master/all?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchClassById = async (id: number) => {
    const response = await API.get(`/class-master/${id}`);
    return response.data;
};

export const createClass = async (data: ClassMaster) => {
    const response = await API.post(`/class-master`, data);
    return response.data;
};

export const updateClass = async (id: number, data: ClassMaster) => {
    const response = await API.put(`/class-master/${id}`, data);
    return response.data;
};

export const deleteClass = async (id: number) => {
    const response = await API.delete(`/class-master/${id}`);
    return response.data;
};