import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  fetchCustomer,
  fetchUsers,
  updateUser,
} from "../../lib/api/users";

export interface UserPayload {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  status?: "ACTIVE" | "INACTIVE";
  roleMasterId?: number;
  createdAt: string;
  userDetail?: {
    fullName?: string;
    nickName?: string;
    email?: string;
    phoneWa?: string;
    address?: string;
    emergencyContact?: string;
    agree: boolean | true;
  };
  roleMaster?: {
    id?: number;
    name?: string;
    status?: "ACTIVE" | "INACTIVE";
  };
}

export interface UserPayloadNoRole {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  status?: "ACTIVE" | "INACTIVE";
  roleMasterId: number;
  userDetail?: {
    fullName?: string;
    nickName?: string;
    email?: string;
    phoneWa?: string;
    address?: string;
    emergencyContact?: string;
  };
}
export interface UserPayloadCreate {
  username: string;
  email: string;
  password: string;
  phone: string;
  status?: "ACTIVE" | "INACTIVE";
  roleMasterId: number;
  userDetail?: {
    fullName?: string;
    nickName?: string;
    email?: string;
    phoneWa?: string;
    address?: string;
    emergencyContact?: string;
    agree: boolean | true;
  };
}

export interface UserPayloadUpdate extends UserPayloadCreate {
  id: number;
}

export const useUsers = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: () => fetchUsers(page, limit, search),
  });
};

export const useCustomerAll = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["customer", page, limit, search],
    queryFn: () => fetchCustomer(page, limit, search),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserPayloadCreate) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserPayloadCreate }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
