import { PrismaClient } from "@prisma/client";
import { createPaginatedResponse, createResponse } from "../utils/ResponseHelpers";


const prisma = new PrismaClient();

export const updateUserDetail = async (id: number, data: Partial<{
  fullname: string;
  nickname: string;
  email: string;
  phoneWa: string;
  address: string;
  emergencyContact: string;
}>) => {
  const userDetails = await prisma.userDetail.update({
    where: { id },
    data,
  });

  return createResponse(
    "USER",
    "UPDATE",
    "Success to update user information",
    userDetails
  )
};

export const deletedUserDetail = async (id: number) => {
  const userDetail = await prisma.userDetail.delete({
    where: { id },
  });

  return createResponse(
    "USER",
    "DELETE",
    "Success to delete user detail",
    userDetail
  )
};

export const getAllUserDetail = async (page = 1, limit = 10, search = "") => {
  const skip = (page - 1) * limit;

  const [userDetail, totalUserDetail] = await Promise.all([
    prisma.userDetail.findMany({
      skip,
      take: limit,
      where: {
        fullName: {
            contains: search,  // Pastikan menggunakan ini tanpa 'mode'
          },
        nickName: {
            contains: search,  // Pastikan menggunakan ini tanpa 'mode'
          },
        email: {
            contains: search,  // Pastikan menggunakan ini tanpa 'mode'
          },
        phoneWa: {
            contains: search,  // Pastikan menggunakan ini tanpa 'mode'
          },
      },
      
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.userDetail.count({
      where: {
        fullName: {
            contains: search,  // Pastikan menggunakan ini tanpa 'mode'
          },
        nickName: {
            contains: search,  // Pastikan menggunakan ini tanpa 'mode'
          },
        email: {
            contains: search,  // Pastikan menggunakan ini tanpa 'mode'
          },
        phoneWa: {
            contains: search,  // Pastikan menggunakan ini tanpa 'mode'
          },
      },
    }),
  ]);

  return createPaginatedResponse(
    "USER",
    "READ",
    "Success to get all user detail",
    userDetail,
    page,
    limit,
    totalUserDetail
  )
};

export const getUserDetailById = async (id: number) => {
  const userDetail = await prisma.userDetail.findUnique({
    where: { id },
  });

  return createResponse(
    "USER",
    "READ",
    "Success to get user detail by ID",
    userDetail
  );
};

export const getUserDetailsByRoleMasterId = async (
  roleMasterId: number,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;

  const userDetails = await prisma.userDetail.findMany({
    where: {
      user: {
        roleMasterId: roleMasterId,
      },
    },
    include: {
      user: true,
    },
    skip,
    take: limit,
  });

  const total = await prisma.userDetail.count({
    where: {
      user: {
        roleMasterId: roleMasterId,
      },
    },
  });

  return createPaginatedResponse(
    "USER",
    "READ",
    "Success get user detail by roleMasterId",
    userDetails,
    page,
    limit,
    total
  );
};