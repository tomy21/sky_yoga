import API from "../api";

interface UserPayload {
  username: string;
  email: string;
  password: string;
  phone: string;
  status?: "ACTIVE" | "INACTIVE";
  roleMasterId?: number;
  userDetail?: {
    fullName?: string;
    nickName?: string;
    email?: string;
    phoneWa?: string;
    address?: string;
    emergencyContact?: string;
  };
}

export const fetchUsers = async (page = 1, limit = 10, search = "") => {
  const response = await API.get(`/users?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

export const fetchCustomer = async (page = 1, limit = 10, search = "") => {
  const response = await API.get(`/users/get-customer?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

export const fetchUserById = async (id: number) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: UserPayload) => {
  const response = await API.post(`/users`, data);
  return response.data;
};

export const updateUser = async (id: number, data: UserPayload) => {
  const response = await API.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};
