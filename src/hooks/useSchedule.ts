import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSchedule,
  deleteSchedule,
  fetchSchedules,
  updateSchedule,
} from "../../lib/api/schedule";

export interface SchedulePayload {
  id: number;
  classId: number;
  coachId: number;
  date: Date;
  time: string;
  quota: number;
  used: number;
  status: "AVAILABLE" | "FULL_BOOKED";
  createdAt: Date;
  class: {
    id: number;
    name: string;
    type: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
  coach: {
    id: number;
    name: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
export interface SchedulePayloadCreate {
  classId: number;
  coachId: number;
  date: Date;
  time: string;
  quota: number;
  status: "AVAILABLE" | "FULL_BOOKED";
}

export const useSchedule = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["schedules", page, limit, search],
    queryFn: () => fetchSchedules(page, limit, search),
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SchedulePayloadCreate) => createSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SchedulePayloadCreate }) =>
      updateSchedule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};
