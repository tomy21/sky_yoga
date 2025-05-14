import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMembership,
  deleteMembership,
  fetchMembership,
  fetchMembershipById,
  updateMembership,
} from "../../lib/api/membership";
import { MembershipRequest } from "@/app/api/controller/membershipController";

export const useMembership = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["membership", page, limit, search],
    queryFn: () => fetchMembership(page, limit, search),
  });
};

export const useCreateMembership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MembershipRequest) => createMembership(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership"] });
    },
  });
};

export const useDeleteMembership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMembership(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership"] });
    },
  });
};

export const useUpdateMembership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MembershipRequest }) =>
      updateMembership(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership"] });
    },
  });
};

export const useGetMemberTypeById = (id: number) => {
  return useQuery({
    queryKey: ["membership", id],
    queryFn: () => fetchMembershipById(id),
  });
};
