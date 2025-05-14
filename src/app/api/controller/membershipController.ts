import { Membership, StatusMembership } from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  createPaginatedResponse,
  createResponse,
} from "../utils/ResponseHelpers";
import { createHistoryTransaction } from "./historyTransactionController";

export type MembershipRequest = {
  userId: number;
  memberTypeId: number;
  startDate: Date;
  endDate: Date;
  status: "ACTIVE" | "EXPIRED";
};

export type MembershipWithUser = Membership & {
  user: {
    username: string;
    phone: string;
  };
  memberType: {
    type: string;
  };
};

export async function createMembership(data: MembershipRequest) {
  try {
    const newMembership = await prisma.membership.create({
      data: {
        userId: data.userId,
        memberTypeId: data.memberTypeId,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
      },
    });

    const checkTypeMember = await prisma.memberType.findUnique({
      where: {
        id: data.memberTypeId,
      },
    });

    const trxData = {
      userId: data.userId,
      memberTypeId: data.memberTypeId,
      startDate: data.startDate.toString(),
      endDate: data.endDate.toString(),
      duration: Number(checkTypeMember?.duration),
      amount: Number(checkTypeMember?.amount),
      paymentImage: null, // Kamu bisa menambahkan paymentImage jika perlu
    };

    const transactionResponse = await createHistoryTransaction(trxData);
    console.log(transactionResponse);

    return createResponse(
      "MEMBERSHIP",
      "CREATE",
      "Success to create membership and transaction",
      newMembership,
    );
  } catch (error) {
    return createResponse(
      "MEMBERSHIP",
      "ERROR",
      "Failed to create membership",
      error,
    );
  }
}

export async function getMembership(
  page: number = 1,
  limit: number = 10,
  search: string = "",
) {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          status: {
            equals: search as StatusMembership,
          },
        }
      : {};

    const memberships = await prisma.membership.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: {
          select: {
            username: true,
            phone: true,
          },
        },
        memberType: {
          select: {
            type: true,
          },
        },
      },
    });

    const total = await prisma.membership.count();

    return createPaginatedResponse(
      "MEMBERSHIP",
      "READ",
      "Success to get all memberships",
      memberships,
      page,
      limit,
      total,
    );
  } catch (error) {
    return createResponse(
      "MEMBERSHIP",
      "ERROR",
      "Failed to get memberships",
      error,
    );
  }
}

export async function getMembershipById(id: number) {
  try {
    const membership = await prisma.membership.findUnique({
      where: { id },
    });
    return createResponse(
      "MEMBERSHIP",
      "READ",
      "Success to get membership by ID",
      membership,
    );
  } catch (error) {
    return createResponse(
      "MEMBERSHIP",
      "ERROR",
      "Failed to get membership by ID",
      error,
    );
  }
}

export async function updateMembership(id: number, data: Membership) {
  try {
    const updatedMembership = await prisma.membership.update({
      where: { id },
      data: data,
    });
    return createResponse(
      "MEMBERSHIP",
      "UPDATE",
      "Success to update membership",
      updatedMembership,
    );
  } catch (error) {
    return createResponse(
      "MEMBERSHIP",
      "ERROR",
      "Failed to update membership",
      error,
    );
  }
}

export async function deleteMembership(id: number) {
  try {
    const deletedMembership = await prisma.membership.delete({
      where: { id },
    });
    return createResponse(
      "MEMBERSHIP",
      "DELETE",
      "Success to delete membership",
      deletedMembership,
    );
  } catch (error) {
    return createResponse(
      "MEMBERSHIP",
      "ERROR",
      "Failed to delete membership",
      error,
    );
  }
}
