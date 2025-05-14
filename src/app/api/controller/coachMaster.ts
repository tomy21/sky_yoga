import { CoachMaster, Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  createPaginatedResponse,
  createResponse,
} from "../utils/ResponseHelpers";

export async function createCoach(data: CoachMaster) {
  try {
    const coach = await prisma.coachMaster.create({ data });
    return createResponse("COACH", "CREATE", "Success to create coach", coach);
  } catch (error) {
    return createResponse("COACH", "ERROR", "Failed to create coach", error);
  }
}

export async function updateCoach(id: number, data: CoachMaster) {
  try {
    const coach = await prisma.coachMaster.update({
      where: { id },
      data: data,
    });
    return createResponse("COACH", "CREATE", "Success to create coach", coach);
  } catch (error) {
    return createResponse("COACH", "ERROR", "Failed to create coach", error);
  }
}

export async function deletecoach(id: number) {
  try {
    const coach = await prisma.coachMaster.delete({
      where: { id },
    });
    return createResponse("COACH", "DELETE", "Success to delete coach", coach);
  } catch (error) {
    return createResponse("COACH", "ERROR", "Failed to get coach by ID", error);
  }
}

export async function getCoach(
  page: number = 1,
  limit: number = 10,
  search: string = "",
) {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const coach = await prisma.coachMaster.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalData = await prisma.coachMaster.count({ where });

    return createPaginatedResponse(
      "MENU",
      "READ",
      "Success to get all menus",
      coach,
      page,
      limit,
      totalData,
    );
  } catch (error) {
    console.error(error);
    return createResponse("MENU", "ERROR", "Failed to get coach by ID", error);
  }
}

export async function getAllCoach() {
  try {
    const coach = await prisma.coachMaster.findMany();

    return createResponse("COACH", "READ", "Success to get all coach", coach);
  } catch (error) {
    return createResponse("COACH", "ERROR", "Failed to get coach by ID", error);
  }
}

export async function getCoachById(id: number) {
  try {
    const coach = await prisma.coachMaster.findUnique({
      where: { id },
    });
    return createResponse("COACH", "READ", "Success to get coach by ID", coach);
  } catch (error) {
    return createResponse("COACH", "ERROR", "Failed to get coach by ID", error);
  }
}
