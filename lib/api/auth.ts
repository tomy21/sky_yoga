import { AxiosError } from "axios";
import API from "../api";

export const login = async (
  identify: string,
  password: string,
  remember: boolean,
) => {
  try {
    const response = await API.post(`/auth/login`, {
      identify,
      password,
      remember,
    });
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await API.post(`/auth/logout`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data;
    }
    return { message: "Unknown error" };
  }
};
