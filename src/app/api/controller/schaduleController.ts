import { PrismaClient } from "@prisma/client";
import {
  createPaginatedResponse,
  createResponse,
} from "../utils/ResponseHelpers";

const prisma = new PrismaClient();

export const getAllSchedules = async (page = 1, limit = 10, search = "") => {
  const skip = (page - 1) * limit;

  const [schedules, totalSchedule] = await Promise.all([
    prisma.schedule.findMany({
      skip,
      take: limit,
      where: {
        class: {
          name: {
            contains: search, // Pastikan menggunakan ini tanpa 'mode'
          },
        },
      },
      include: {
        class: true,
        coach: true,
      },
      orderBy: {
        date: "desc",
      },
    }),
    prisma.schedule.count({
      where: {
        class: {
          name: {
            contains: search, // Sama seperti pada findMany
          },
        },
      },
    }),
  ]);

  return createPaginatedResponse(
    "SCHEDULE",
    "READ",
    "Success to get all schedules",
    schedules,
    page,
    limit,
    totalSchedule,
  );
};

export const getScheduleById = async (id: number) => {
  const schedule = await prisma.schedule.findUnique({
    where: { id },
    include: {
      class: true,
      coach: true,
    },
  });

  return createResponse(
    "SCHEDULE",
    "READ",
    "Success to get schedule by ID",
    schedule,
  );
};

export const getScheduleByIdAll = async (id: number) => {
  const schedule = await prisma.schedule.findMany({
    where: { id },
    include: {
      class: true,
      coach: true,
    },
  });

  return createResponse(
    "SCHEDULE",
    "READ",
    "Success to get schedule by ID",
    schedule,
  );
};

export const createSchedule = async (data: {
  classId: number;
  coachId: number;
  date: Date;
  time: string;
  quota: number;
  status?: "AVAILABLE" | "FULL_BOOKED";
}) => {
  const schedule = await prisma.schedule.create({
    data: {
      classId: data.classId,
      coachId: data.coachId,
      date: data.date,
      time: data.time,
      quota: data.quota,
      status: data.status ?? "AVAILABLE",
    },
  });

  return createResponse(
    "SCHEDULE",
    "CREATE",
    "Success to create schedule",
    schedule,
  );
};

export const updateSchedule = async (
  id: number,
  data: Partial<{
    classId: number;
    coachId: number;
    date: Date;
    time: string;
    quota: number;
    used: number;
    status: "AVAILABLE" | "FULL_BOOKED";
  }>,
) => {
  const schedule = await prisma.schedule.update({
    where: { id },
    data,
  });

  return createResponse(
    "SCHEDULE",
    "UPDATE",
    "Success to update schedule",
    schedule,
  );
};

export const deleteSchedule = async (id: number) => {
  const schedule = await prisma.schedule.delete({
    where: { id },
  });

  return createResponse(
    "SCHEDULE",
    "DELETE",
    "Success to delete schedule",
    schedule,
  );
};
