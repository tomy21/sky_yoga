import { Prisma, Role, Status } from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  createPaginatedResponse,
  createResponse,
} from "../utils/ResponseHelpers";
import bcrypt from "bcrypt";

type CreateUserWithDetail = {
  username: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  status?: Status;
  roleMasterId?: number;
  userDetail?: {
    fullName?: string;
    nickName?: string;
    email?: string;
    phoneWa?: string;
    address?: string;
    emergencyContact?: string;
    agree: boolean | true;
  };
};

export async function createUser(data: CreateUserWithDetail) {
  try {
    const roleMaster = await prisma.roleMaster.findUnique({
      where: { id: data.roleMasterId },
    });

    if (!roleMaster) {
      throw new Error("RoleMaster not found");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        role: roleMaster.name,
        status: data.status ?? "ACTIVE",
        roleMasterId: data.roleMasterId,
        userDetail: data.userDetail
          ? {
              create: {
                fullName: data.userDetail.fullName,
                nickName: data.username,
                email: data.userDetail.email,
                phoneWa: data.userDetail.phoneWa,
                address: data.userDetail.address,
                emergencyContact: data.userDetail.emergencyContact,
                agree: data.userDetail.agree,
              },
            }
          : undefined,
      },
      include: {
        userDetail: true,
        roleMaster: true,
      },
    });

    return createResponse("USER", "CREATE", "Success to create user", user);
  } catch (error) {
    console.error(error);
    return createResponse("USER", "ERROR", "Failed to create user", error);
  }
}

export async function updateUser(id: number, data: CreateUserWithDetail) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
        status: data.status ?? "ACTIVE",
        roleMasterId: data.roleMasterId,
        userDetail: data.userDetail
          ? {
              upsert: {
                update: {
                  fullName: data.userDetail.fullName,
                  nickName: data.userDetail.nickName,
                  email: data.userDetail.email,
                  phoneWa: data.userDetail.phoneWa,
                  address: data.userDetail.address,
                  emergencyContact: data.userDetail.emergencyContact,
                },
                create: {
                  fullName: data.userDetail.fullName,
                  nickName: data.userDetail.nickName,
                  email: data.userDetail.email,
                  phoneWa: data.userDetail.phoneWa,
                  address: data.userDetail.address,
                  emergencyContact: data.userDetail.emergencyContact,
                },
              },
            }
          : undefined,
      },
      include: {
        userDetail: true,
      },
    });

    return createResponse("USER", "UPDATE", "Success to update user", user);
  } catch (error) {
    console.error(error);
    return createResponse("USER", "ERROR", "Failed to update user", error);
  }
}

export async function deleteUser(id: number) {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    return createResponse("USER", "DELETE", "Success to delete user", user);
  } catch (error) {
    return createResponse("USER", "ERROR", "Failed to get user by ID", error);
  }
}

export async function getUser(
  page: number = 1,
  limit: number = 10,
  search: string = "",
) {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          username: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const user = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      include: {
        roleMaster: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalData = await prisma.user.count({ where });

    return createPaginatedResponse(
      "USER",
      "READ",
      "Success to get all menus",
      user,
      page,
      limit,
      totalData,
    );
  } catch (error) {
    console.error(error);
    return createResponse("USER", "ERROR", "Failed to get user by ID", error);
  }
}

export async function getUserCustomer(
  page: number = 1,
  limit: number = 10,
  search: string = "",
) {
  try {
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      role: Role.CUSTOMER,
      ...(search && {
        username: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
    };

    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      include: {
        roleMaster: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalData = await prisma.user.count({ where });

    return createPaginatedResponse(
      "USER",
      "READ",
      "Success to get all menus",
      users,
      page,
      limit,
      totalData,
    );
  } catch (error) {
    console.error(error);
    return createResponse("USER", "ERROR", "Failed to get user by ID", error);
  }
}

export async function getAllUser() {
  try {
    const user = await prisma.user.findMany();

    return createResponse("USER", "READ", "Success to get all user", user);
  } catch (error) {
    return createResponse("USER", "ERROR", "Failed to get user by ID", error);
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return createResponse("USER", "READ", "Success to get user by ID", user);
  } catch (error) {
    return createResponse("USER", "ERROR", "Failed to get user by ID", error);
  }
}
