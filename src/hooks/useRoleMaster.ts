import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createRole, deleteRole, fetchRoles, updateRole } from "../../lib/api/role";

interface RoleUpdatePayload {
  name?: string;
  status: "ACTIVE" | "INACTIVE"; // dari UI
}

interface RoleCreatePayload {
  name: string;
  status: "ACTIVE" | "INACTIVE"; // dari UI
}

export const useRoles = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["roles", page, limit],
    queryFn: () => fetchRoles(page, limit),
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleCreatePayload) =>
      createRole({
        name: data.name.toUpperCase(), // convert to enum style
        status: data.status.toUpperCase() as "ACTIVE" | "INACTIVE"
      }),
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["roles"], exact: false })},
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: RoleUpdatePayload }) =>
      updateRole(id, {
        name: data.name?.toUpperCase(),
        status: data.status.toUpperCase() as "ACTIVE" | "INACTIVE"
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });
};
