import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserDetail, fetchUserDetail, fetchUserDetailById, fetchUserDetailByRole, updateUserDetail } from "../../lib/api/userDetails";

interface userDetails {
    fullname: string;
    nickname: string;
    email: string;
    phoneWa: string;
    address: string;
    emergencyContact: string;
}

export const useUserDetail = (page = 1, limit = 10, search = "") => {
    return useQuery({
        queryKey: ["menus", page, limit, search],
        queryFn: () => fetchUserDetail(page, limit, search),
    });
};
export const useUserDetailById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => fetchUserDetailById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-detail"] });
        },
        onError: (error) => {
            console.error("Delete failed:", error);
        },
    });
};

export const useUserDetailByRole = (page = 1, limit = 10, search = "") => {
    return useQuery({
        queryKey: ["user-byrole", page, limit, search],
        queryFn: () => fetchUserDetailByRole(page, limit, search),
    });
};


export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: ({ id, data }: { id: number; data: userDetails }) =>
        updateUserDetail(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-detail"] });
      },
    });
};

export const useDeleteUserDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUserDetail(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-detail"] });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });
};