import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCoach, deleteCoach, fetchAllCoach, fetchCoach, updateCoach } from "../../lib/api/coachMaster";

export interface CoachMasterPayload {
    name: string;
    status: "ACTIVE" | "INACTIVE";
}

export type CoachMaster = CoachMasterPayload;

export const useCoachMaster = (page = 1 , limit = 10, search = "") => {
    return useQuery({
        queryKey: ["CoachMasters", page, limit, search],
        queryFn: () => fetchCoach(page, limit, search),
    });
};
export const useCoachMasterAll = (page = 1 , limit = 10, search = "") => {
    return useQuery({
        queryKey: ["CoachMasters", page, limit, search],
        queryFn: () => fetchAllCoach(page, limit, search),
    });
};

export const useCreateCoach = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CoachMasterPayload) =>
      createCoach(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["CoachMasters"] }),
  });
};

export const useUpdateCoach = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CoachMasterPayload }) =>
      updateCoach(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["CoachMasters"] }),
  });
};

export const useDeleteCoach = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      deleteCoach(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["CoachMasters"] }),
  });
};