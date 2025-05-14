import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import {
  createPaginatedResponse,
  createResponse,
} from "../utils/ResponseHelpers";

export type MemberTypeRequest = {
  type: string;
  duration: number;
  amount: number;
};

export async function createMemberType(data: MemberTypeRequest) {
  try {
    const newType = await prisma.memberType.create({
      data: {
        type: data.type,
        duration: data.duration,
        amount: data.amount,
      },
    });
    console.log("Creating member type with data:", data);
    return createResponse(
      "TYPEMEMBER",
      "CREATE",
      "Success to create type",
      newType,
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return createResponse("TYPEMEMBER", "ERROR", "Type already exists", null);
    }
    return createResponse(
      "TYPEMEMBER",
      "ERROR",
      "Failed to create type",
      error,
    );
  }
}

export async function getMemberType(
  page: number = 1,
  limit: number = 10,
  search: string = "",
) {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          type: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const typeMember = await prisma.memberType.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalRole = await prisma.memberType.count({ where });

    return createPaginatedResponse(
      "TYPEMEMBER",
      "READ",
      "Success to get all roles",
      typeMember,
      page,
      limit,
      totalRole,
    );
  } catch (error) {
    return createResponse(
      "TYPEMEMBER",
      "ERROR",
      "Failed to get member type by ID",
      error,
    );
  }
}

export async function getMemberTypeById(id: number) {
  try {
    const typeMember = await prisma.memberType.findUnique({
      where: { id },
    });
    return createResponse(
      "TYPEMEMBER",
      "READ",
      "Success to get member type by ID",
      typeMember,
    );
  } catch (error) {
    return createResponse(
      "TYPEMEMBER",
      "ERROR",
      "Failed to get member type by ID",
      error,
    );
  }
}

export async function updateMemberType(id: number, data: MemberTypeRequest) {
  try {
    const newType = await prisma.memberType.update({
      where: { id },
      data: {
        type: data.type,
        duration: data.duration,
        amount: data.amount,
      },
    });
    return createResponse(
      "TYPEMEMBER",
      "UPDATE",
      "Success to create role",
      newType,
    );
  } catch (error) {
    return createResponse(
      "TYPEMEMBER",
      "ERROR",
      "Failed to create role",
      error,
    );
  }
}

export async function deleteMemberType(id: number) {
  try {
    const newType = await prisma.memberType.delete({
      where: { id },
    });
    return createResponse(
      "TYPEMEMBER",
      "DELETE",
      "Success to create role",
      newType,
    );
  } catch (error) {
    return createResponse(
      "TYPEMEMBER",
      "ERROR",
      "Failed to create role",
      error,
    );
  }
}
