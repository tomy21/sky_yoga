import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBooking,
  deleteBooking,
  fetchBooking,
  fetchBookingByScheduleId,
  fetchBookingByUser,
  updateBooking,
} from "../../lib/api/booking";

export interface BookingPayload {
  id: number;
  userId: number;
  scheduleId: number;
  status: "BOKEED" | "CANCEL"; // sesuaikan enum kamu
  createdAt: Date;
  schedule: {
    id: number;
    classId: number;
    coachId: number;
    date: Date;
    time: string;
    quota: number;
    used: number;
    status: "AVAILABLE" | "FULL_BOOKED";
    createdAt: Date;
    updatedAt: Date;
    class: {
      id: number;
      name: string;
      type: string;
      status: "ACTIVE" | "INACTIVE"; // sesuaikan dengan enum
      createdAt: Date;
      updatedAt: Date;
    };
  };
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    role: "ADMIN" | "CUSTOMER" | "COACH"; // sesuaikan role enum kamu
    phone: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt: Date;
    updatedAt: Date;
    roleMasterId: number;
  };
}

interface BookingCreatePayload {
  userId: number;
  scheduleId: number;
  status: "BOKEED" | "CANCEL";
}

interface BookingUpdatePayload {
  userId: number;
  scheduleId: number;
  status: "BOKEED" | "CANCEL";
  presence: "NOT_STARTED" | "PRESENT" | "ABSENT";
}

export const useBooking = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["bookings", page, limit, search],
    queryFn: () => fetchBooking(page, limit, search),
  });
};
export const useBookingScheduleId = (
  scheduleId: number,
  page = 1,
  limit = 10,
) => {
  return useQuery({
    queryKey: ["bookings by schedule", scheduleId, page, limit],
    queryFn: () => fetchBookingByScheduleId(scheduleId, page, limit),
  });
};

export const useBookingByuser = (userId: number, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["bookings by user", userId, page, limit],
    queryFn: () => fetchBookingByUser(userId, page, limit),
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookingCreatePayload) => createBooking(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BookingUpdatePayload }) =>
      updateBooking(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["booking-update"] }),
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["classMasters"] }),
  });
};
