import { HistoryTransactionRequest } from "@/app/api/controller/historyTransactionController";
import API from "../api";

export const fetchHistoryTransaction = async (page = 1, limit = 10, search = "") => {
    const response = await API.get(`/historyTransaction?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
};

export const fetchHistoryTransactionById = async (id: number) => {
    const response = await API.get(`/historyTransaction/${id}`);
    return response.data;
};

export const createHistoryTransaction = async (data: HistoryTransactionRequest) => {
    const response = await API.post(`/historyTransaction`, data);
    return response.data;
};

export const updateHistoryTransaction = async (id: number, data: HistoryTransactionRequest) => {
    const response = await API.put(`/historyTransaction/${id}`, data);
    return response.data;
};

export const deleteHistoryTransaction = async (id: number) => {
    const response = await API.delete(`/historyTransaction/${id}`);
    return response.data;
};