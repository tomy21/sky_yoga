import prisma from "../lib/prisma";
import { createResponse } from "../utils/ResponseHelpers";
import { startOfDay, endOfDay } from "date-fns";

export async function getDashboardValue(date?: Date) {
  const today = new Date();
  // const targetDate = date ? new Date(date) : today;
  // const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
  // const endOfYear = new Date(targetDate.getFullYear(), 11, 31);
  try {
    const totalCustomer = await prisma.user.count({
      where: {
        roleMaster: {
          name: "CUSTOMER",
        },
      },
    });

    const totalBooking = await prisma.booking.count({
      where: {
        createdAt: {
          gte: startOfDay(date || today),
          lte: endOfDay(date || today),
        },
      },
    });

    // Cari user dengan booking terbanyak (DIBUAT LIST DESC)
    const topUsersRaw = await prisma.booking.groupBy({
      by: ["userId"],
      _count: {
        userId: true,
      },
      orderBy: {
        _count: {
          userId: "desc",
        },
      },
    });

    // Ambil detail user-nya berdasarkan ID yang di-group tadi
    const userIds = topUsersRaw.map((item) => item.userId);

    const userDetails = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    // Gabungkan data booking count dengan user detail
    const topUsers = userIds.map((id) => {
      const user = userDetails.find((u) => u.id === id);
      const bookingCount =
        topUsersRaw.find((b) => b.userId === id)?._count.userId || 0;

      return {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        totalBooking: bookingCount,
      };
    });

    const response = {
      totalCustomer,
      totalBooking,
      topUser: topUsers,
    };

    return createResponse("USER", "READ", "Success to get user", response);
  } catch (error) {
    return createResponse("COACH", "ERROR", "Failed to create coach", error);
  }
}

export async function getDashboardMonthly(date?: Date) {
  const today = new Date();
  const targetDate = date ? new Date(date) : today;
  const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
  const endOfYear = new Date(targetDate.getFullYear(), 11, 31);
  try {
    const bookingsByMonth = await prisma.booking.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
      _count: {
        _all: true,
      },
    });

    // Format hasil per bulan (1–12)
    const monthlyTotals = Array(12).fill(0);
    bookingsByMonth.forEach((item) => {
      const month = new Date(item.createdAt).getMonth(); // 0-11
      monthlyTotals[month] += item._count._all;
    });

    return createResponse("USER", "READ", "Success to get user", monthlyTotals);
  } catch (error) {
    return createResponse("USER", "ERROR", "Failed to create coach", error);
  }
}
