import { Booking } from "@prisma/client";
import {
  createPaginatedResponse,
  createResponse,
} from "../utils/ResponseHelpers";
import { prisma } from "../lib/prisma";

export async function createBooking(data: Booking) {
  try {
    const checkMembership = await prisma.membership.findFirst({
      where: {
        userId: data.userId,
      },
    });

    if (!checkMembership) {
      return createResponse("BOOKING", "ERROR", "Member not found", null);
    }

    const bookingData = await prisma.booking.create({
      data,
    });

    // Tambahkan 1 ke used schedule
    await prisma.schedule.update({
      where: {
        id: data.scheduleId,
      },
      data: {
        used: {
          increment: 1,
        },
      },
    });

    return createResponse(
      "BOOKING",
      "CREATE",
      "Success to create Booking",
      bookingData,
    );
  } catch (error) {
    return createResponse(
      "BOOKING",
      "ERROR",
      "Failed to create Booking",
      error,
    );
  }
}

export async function updateBooking(id: number, data: Booking) {
  try {
    const bookingData = await prisma.booking.update({
      where: { id },
      data: data,
    });
    return createResponse(
      "BOOKING",
      "CREATE",
      "Success to create Booking",
      bookingData,
    );
  } catch (error) {
    return createResponse(
      "BOOKING",
      "ERROR",
      "Failed to create Booking",
      error,
    );
  }
}

export async function deleteBooking(id: number) {
  try {
    const bookingData = await prisma.booking.delete({
      where: { id },
    });
    return createResponse(
      "BOOKING",
      "DELETE",
      "Success to delete Booking",
      bookingData,
    );
  } catch (error) {
    return createResponse(
      "BOOKING",
      "ERROR",
      "Failed to get Booking by ID",
      error,
    );
  }
}

export async function getBooking(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;

    const bookingData = await prisma.booking.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalBooking = await prisma.booking.count();

    return createPaginatedResponse(
      "BOOKING",
      "READ",
      "Success to get all booking",
      bookingData,
      page,
      limit,
      totalBooking,
    );
  } catch (error) {
    console.error(error);
    return createResponse(
      "BOOKING",
      "ERROR",
      "Failed to get Booking by ID",
      error,
    );
  }
}

export async function getAllBooking() {
  try {
    const bookingData = await prisma.booking.findMany();

    return createResponse(
      "BOOKING",
      "READ",
      "Success to get all Booking",
      bookingData,
    );
  } catch (error) {
    return createResponse(
      "BOOKING",
      "ERROR",
      "Failed to get Booking by ID",
      error,
    );
  }
}

export async function getBookingById(id: number) {
  try {
    const bookingData = await prisma.booking.findFirst({
      where: { userId: id },
    });
    return createResponse(
      "BOOKING",
      "READ",
      "Success to get Booking by ID",
      bookingData,
    );
  } catch (error) {
    return createResponse(
      "BOOKING",
      "ERROR",
      "Failed to get Booking by ID",
      error,
    );
  }
}

export async function getBookingsByScheduleId(
  scheduleId: number,
  page = 1,
  limit = 10,
) {
  try {
    const skip = (page - 1) * limit;

    // Mengambil semua booking berdasarkan scheduleId
    const [bookingData, totalBooking] = await Promise.all([
      prisma.booking.findMany({
        skip,
        take: limit,
        where: {
          scheduleId: scheduleId,
        },
        include: {
          schedule: {
            include: {
              class: true,
            },
          },

          user: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
      prisma.booking.count({
        where: {
          scheduleId: scheduleId,
        },
      }),
    ]);

    // Membuat respons dengan pagination
    return createPaginatedResponse(
      "BOOKING",
      "READ",
      "Success to get all booking by scheduleId",
      bookingData,
      page,
      limit,
      totalBooking,
    );
  } catch (error) {
    return createResponse(
      "BOOKING",
      "ERROR",
      "Failed to get booking by scheduleId",
      error,
    );
  }
}

export async function getBookingsByUser(userId: number, page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;

    // Mengambil semua booking berdasarkan scheduleId
    const [bookingData, totalBooking] = await Promise.all([
      prisma.booking.findMany({
        skip,
        take: limit,
        where: {
          userId: userId,
        },
        include: {
          schedule: {
            include: {
              class: true,
            },
          },

          user: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
      prisma.booking.count({
        where: {
          userId: userId,
        },
      }),
    ]);

    // Membuat respons dengan pagination
    return createPaginatedResponse(
      "BOOKING",
      "READ",
      "Success to get all booking by scheduleId",
      bookingData,
      page,
      limit,
      totalBooking,
    );
  } catch (error) {
    return createResponse(
      "BOOKING",
      "ERROR",
      "Failed to get booking by scheduleId",
      error,
    );
  }
}
