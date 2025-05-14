import API from "../api";

export const fetchUserDetail = async (page = 1, limit = 10, search = "") => {
    const response = await API.get(`/user-detail?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchUserDetailByRole = async (page = 1, limit = 10, search = "") => {
    const response = await API.get(`/user-detail-byrole?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchUserDetailById = async (id: number) => {
    const response = await API.get(`/user-detail/${id}`);
    return response.data;
};

export const createUserDetail = async (data: { name: string; status: string }) => {
    const response = await API.post(`/user-detail`, data);
    return response.data;
};

export const updateUserDetail = async (id: number, data: 
    { 
        fullname: string;
        nickname: string;
        email: string;
        phoneWa: string;
        address: string;
        emergencyContact: string; 
    }) => {
    const response = await API.put(`/user-detail/${id}`, data);
    return response.data;
};

export const deleteUserDetail = async (id: number) => {
    const response = await API.delete(`/user-detail/${id}`);
    return response.data;
};