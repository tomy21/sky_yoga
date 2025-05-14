import { MembershipRequest } from "@/app/api/controller/membershipController";
import API from "../api";

export const fetchMembership = async (page = 1, limit = 10, search = "") => {
    const response = await API.get(`/membership?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchMembershipById = async (id: number) => {
    const response = await API.get(`/membership/${id}`);
    return response.data;
};

export const createMembership = async (data: MembershipRequest) => {
    const response = await API.post(`/membership`, data);
    return response.data;
};

export const updateMembership = async (id: number, data: MembershipRequest) => {
    const response = await API.put(`/membership/${id}`, data);
    return response.data;
};

export const deleteMembership = async (id: number) => {
    const response = await API.delete(`/membership/${id}`);
    return response.data;
};