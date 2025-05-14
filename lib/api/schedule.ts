import API from "../api";

interface SchedulePayload {
  classId: number;
  coachId: number;
  date: Date;
  time: string;
  quota: number;
  status: "AVAILABLE" | "FULL_BOOKED";
}

export const fetchSchedules = async (page = 1, limit = 10, search = "") => {
  const response = await API.get(`/schedule?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

export const fetchScheduleById = async (id: number) => {
  const response = await API.get(`/schedule/${id}`);
  return response.data;
};

export const createSchedule = async (data: SchedulePayload) => {
  const response = await API.post(`/schedule`, data);
  return response.data;
};

export const updateSchedule = async (id: number, data: SchedulePayload) => {
  const response = await API.put(`/schedule/${id}`, data);
  return response.data;
};

export const deleteSchedule = async (id: number) => {
  const response = await API.delete(`/schedule/${id}`);
  return response.data;
};