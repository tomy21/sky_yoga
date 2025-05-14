import API from "../api";

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

export const fetchBooking = async (page = 1, limit = 10, search = "") => {
  const response = await API.get(
    `/booking?page=${page}&limit=${limit}&search=${search}`,
  );
  return response.data;
};

export const fetchBookingById = async (id: number) => {
  const response = await API.get(`/booking/${id}`);
  return response.data;
};

export const fetchBookingByScheduleId = async (
  scheduleId: number,
  page = 1,
  limit = 10,
) => {
  const response = await API.get(
    `/booking/detail-schedule?scheduleId=${scheduleId}&page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const fetchBookingByUser = async (
  userId: number,
  page = 1,
  limit = 10,
) => {
  const response = await API.get(
    `/booking/booking-byuser?userId=${userId}&page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const createBooking = async (data: BookingCreatePayload) => {
  try {
    const response = await API.post(`/booking`, data);
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateBooking = async (id: number, data: BookingUpdatePayload) => {
  const response = await API.put(`/booking/${id}`, data);
  return response.data;
};

export const deleteBooking = async (id: number) => {
  const response = await API.delete(`/booking/${id}`);
  return response.data;
};
