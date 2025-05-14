import { useQuery } from "@tanstack/react-query";
import { fetchDataDashboard, fetchDataDashboardMonthly } from "../../lib/api/dashboard";

export const useDashboardValue = (date: Date) => {
    return useQuery({
        queryKey: ["dashboard", date],
        queryFn: () => fetchDataDashboard(date),
    });
};

export const useDashboardMonthly = (date: Date) => {
    return useQuery({
        queryKey: ["dashboard-monthly", date],
        queryFn: () => fetchDataDashboardMonthly(date),
    });
};