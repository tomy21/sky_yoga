import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchHistoryTransaction,
  fetchHistoryTransactionById,
} from "../../lib/api/historyTransaction";
import {
  createHistoryTransaction,
  deleteHistoryTransaction,
  HistoryTransactionRequest,
  updateHistoryTransaction,
} from "@/app/api/controller/historyTransactionController";

export const useTransactionHistory = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["historyTransaction", page, limit, search],
    queryFn: () => fetchHistoryTransaction(page, limit, search),
  });
};

export const useCreateHistoryTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: HistoryTransactionRequest) =>
      createHistoryTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["historyTransaction"] });
    },
  });
};

export const useDeleteHistoryTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteHistoryTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["histroryTransaction"] });
    },
  });
};

export const useUpdateHistoryTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: HistoryTransactionRequest;
    }) => updateHistoryTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["historyTransaction"] });
    },
  });
};

export const useGetHistoryTransactionById = (id: number) => {
  return useQuery({
    queryKey: ["historyTransaction", id],
    queryFn: () => fetchHistoryTransactionById(id),
  });
};
