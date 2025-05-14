import { MemberTypeRequest } from "@/app/api/controller/memberTypeController";
import API from "../api";

export const fetchMemberType = async (page = 1, limit = 10, search= "") => {
    const response = await API.get(`/memberType?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchMemberTypeById = async (id: number) => {
    const response = await API.get(`/memberType/${id}`);
    return response.data;
};

export const createMemberType = async (data: MemberTypeRequest) => {
    const response = await API.post(`/memberType`, data);
    return response.data;
};

export const updateMemberType = async (id: number, data: MemberTypeRequest) => {
    const response = await API.put(`/memberType/${id}`, data);
    return response.data;
};

export const deleteMemberType = async (id: number) => {
    const response = await API.delete(`/memberType/${id}`);
    return response.data;
};