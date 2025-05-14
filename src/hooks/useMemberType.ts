import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMemberType,
  deleteMemberType,
  fetchMemberType,
  fetchMemberTypeById,
  updateMemberType,
} from "../../lib/api/memberType";
import { MemberTypeRequest } from "@/app/api/controller/memberTypeController";

export const useMemberType = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["memberType", page, limit, search],
    queryFn: () => fetchMemberType(page, limit, search),
  });
};

export const useCreateMemberType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MemberTypeRequest) => createMemberType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberType"] });
    },
  });
};

export const useDeleteMemberType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMemberType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberType"] });
    },
  });
};

export const useUpdateMemberType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MemberTypeRequest }) =>
      updateMemberType(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberType"] });
    },
  });
};

export const useGetMemberTypeById = (id: number) => {
  return useQuery({
    queryKey: ["memberType", id],
    queryFn: () => fetchMemberTypeById(id),
  });
};
