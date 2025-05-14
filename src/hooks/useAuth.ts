import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "../../lib/api/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ identify, password, remember }: { identify: string, password: string, remember: boolean }) => {
      // Sekarang login menerima objek dengan tiga properti
      return login(identify, password, remember);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};