import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllMenus, fetchMenus } from "../../lib/api/menu";
export interface MenuUpdatePayload {
    parentId: number | null;
    name: string;
    path: string;
    icon: string;
    position: number;
    status: "ACTIVE" | "INACTIVE";
}

export type MenuPayload = MenuUpdatePayload;

// Interface untuk menu lengkap (dengan ID dan tanggal dibuat)
export interface Menu extends MenuPayload {
    id: number;
    createdAt: string; // optional kalau ada
}

export const useMenus = (page = 1, limit = 10, search = "") => {
    return useQuery({
        queryKey: ["menus", page, limit, search],
        queryFn: () => fetchMenus(page, limit, search),
    });
};

export const useAllMenus = () => {
    return useQuery<{ data: MenuUpdatePayload[] }>({
        queryKey: ["menus"],
        queryFn: () => fetchAllMenus(),
    });
};

export const useCreateMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: MenuPayload) => {
            const res = await fetch("/api/menu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok) throw new Error(json.message || "Create menu failed");

            return json;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
    });
};

export const useUpdateMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: MenuPayload }) => {
            const res = await fetch(`/api/menu/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok) throw new Error(json.message || "Update menu failed");

            return json;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
    });
};

export const useDeleteMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const res = await fetch(`/api/menu/${id}`, {
                method: "DELETE",
            });

            const json = await res.json();

            if (!res.ok) throw new Error(json.message || "Delete menu failed");

            return json;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
        },
        onError: (error) => {
            console.error("Delete failed:", error);
        },
    });
};
