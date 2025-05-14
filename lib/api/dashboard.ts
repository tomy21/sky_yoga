import API from "../api";

export const fetchDataDashboard = async (date: Date) => {
    const response = await API.get(`/dashboard?date=${date}`);
    return response.data;
};

export const fetchDataDashboardMonthly = async (date: Date) => {
    const response = await API.get(`/dashboard-monthly?date=${date}`);
    return response.data;
};