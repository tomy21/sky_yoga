import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClass, deleteClass, fetchAllClass, fetchClass, updateClass } from "../../lib/api/classMaster";

export interface ClassMasterPayload {
    name: string;
    type: string;
    status: "ACTIVE" | "INACTIVE";
}

export type ClassMasters = ClassMasterPayload;

export const useClassMaster = (page = 1 , limit = 10, search = "") => {
    return useQuery({
        queryKey: ["classMasters", page, limit, search],
        queryFn: () => fetchClass(page, limit, search),
    });
};
export const useClassMasterAll = (page = 1 , limit = 10, search = "") => {
    return useQuery({
        queryKey: ["classMasters", page, limit, search],
        queryFn: () => fetchAllClass(page, limit, search),
    });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ClassMasterPayload) =>
      createClass(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classMasters"] }),
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ClassMasterPayload }) =>
      updateClass(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classMasters"] }),
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      deleteClass(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classMasters"] }),
  });
};