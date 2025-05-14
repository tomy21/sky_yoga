import API from "../api";


export const fetchRoles = async (page = 1, limit = 10) => {
    const response = await API.get(`/role?page=${page}&limit=${limit}`);
    return response.data;
};

export const fetchRoleById = async (id: number) => {
    const response = await API.get(`/role/${id}`);
    return response.data;
};

export const createRole = async (data: { name: string; status: string }) => {
    const response = await API.post(`/role`, data);
    return response.data;
};

export const updateRole = async (id: number, data: { name?: string; status: string }) => {
    const response = await API.put(`/role/${id}`, data);
    return response.data;
};

export const deleteRole = async (id: number) => {
    const response = await API.delete(`/role/${id}`);
    return response.data;
};
