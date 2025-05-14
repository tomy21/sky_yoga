import prisma from "../lib/prisma";
import {
  createPaginatedResponse,
  createResponse,
} from "../utils/ResponseHelpers";
import { ClassMaster, Prisma } from "@prisma/client";

export async function createClass(data: ClassMaster) {
  try {
    const classMaster = await prisma.classMaster.create({ data });
    return createResponse(
      "CLASSMASTER",
      "CREATE",
      "Success to create class",
      classMaster,
    );
  } catch (error) {
    return createResponse(
      "CLASSMASTER",
      "ERROR",
      "Failed to create class",
      error,
    );
  }
}

export async function updateClass(id: number, data: ClassMaster) {
  try {
    const classMaster = await prisma.classMaster.update({
      where: { id },
      data: data,
    });
    return createResponse(
      "CLASSMASTER",
      "CREATE",
      "Success to create class",
      classMaster,
    );
  } catch (error) {
    return createResponse(
      "CLASSMASTER",
      "ERROR",
      "Failed to create class",
      error,
    );
  }
}

export async function deleteClass(id: number) {
  try {
    const classMaster = await prisma.classMaster.delete({
      where: { id },
    });
    return createResponse(
      "CLASSMASTER",
      "DELETE",
      "Success to delete class",
      classMaster,
    );
  } catch (error) {
    return createResponse(
      "CLASSMASTER",
      "ERROR",
      "Failed to get class by ID",
      error,
    );
  }
}

export async function getClass(
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

    const masterClass = await prisma.classMaster.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalClass = await prisma.classMaster.count({ where });

    return createPaginatedResponse(
      "MENU",
      "READ",
      "Success to get all menus",
      masterClass,
      page,
      limit,
      totalClass,
    );
  } catch (error) {
    console.error(error);
    return createResponse("MENU", "ERROR", "Failed to get class by ID", error);
  }
}

export async function getAllClass() {
  try {
    const masterClass = await prisma.classMaster.findMany();

    return createResponse(
      "CLASSMASTER",
      "READ",
      "Success to get all class",
      masterClass,
    );
  } catch (error) {
    return createResponse(
      "CLASSMASTER",
      "ERROR",
      "Failed to get class by ID",
      error,
    );
  }
}

export async function getClassById(id: number) {
  try {
    const masterClass = await prisma.classMaster.findUnique({
      where: { id },
    });
    return createResponse(
      "CLASSMASTER",
      "READ",
      "Success to get class by ID",
      masterClass,
    );
  } catch (error) {
    return createResponse(
      "CLASSMASTER",
      "ERROR",
      "Failed to get class by ID",
      error,
    );
  }
}
