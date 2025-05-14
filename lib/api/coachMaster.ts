import API from "../api";

interface CoachMaster {
    name: string;
    status: "ACTIVE" | "INACTIVE";
}

export const fetchCoach = async (page = 1, limit = 10, search="") => {
    const response = await API.get(`/coach-master?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchAllCoach = async (page = 1, limit = 10, search="") => {
    const response = await API.get(`/coach-master/all?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchCoachById = async (id: number) => {
    const response = await API.get(`/coach-master/${id}`);
    return response.data;
};

export const createCoach = async (data: CoachMaster) => {
    const response = await API.post(`/coach-master`, data);
    return response.data;
};

export const updateCoach = async (id: number, data: CoachMaster) => {
    const response = await API.put(`/coach-master/${id}`, data);
    return response.data;
};

export const deleteCoach = async (id: number) => {
    const response = await API.delete(`/coach-master/${id}`);
    return response.data;
};