import { HistoryTransaction, Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import {
  createPaginatedResponse,
  createResponse,
} from "../utils/ResponseHelpers";

export type HistoryTransactionRequest = {
  userId: number;
  memberTypeId: number;
  duration: number;
  startDate: string;
  endDate: string;
  amount: number;
  paymentImage: string | null;
};

export type HistoryTrxWithUser = HistoryTransaction & {
  user: {
    username: string;
    phone: string;
  };
  memberType: {
    type: string;
  };
};

export async function createHistoryTransaction(
  data: HistoryTransactionRequest,
) {
  try {
    const trxNo = `TRX${new Date().toISOString().slice(2, 10).replace(/-/g, "")}${Math.floor(1000 + Math.random() * 9000)}`;

    const checkTypeMember = await prisma.memberType.findUnique({
      where: {
        id: data.memberTypeId,
      },
    });

    if (!checkTypeMember) {
      return createResponse(
        "HISTORYPAYMENT",
        "ERROR",
        "Member type not found",
        null,
      );
    }

    const newTransaction = await prisma.historyTransaction.create({
      data: {
        trxNo: trxNo,
        userId: data.userId,
        memberTypeId: data.memberTypeId,
        duration: checkTypeMember.duration,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        amount: checkTypeMember.amount,
        paymentImage: data.paymentImage,
      },
    });
    return createResponse(
      "HISTORYPAYMENT",
      "CREATE",
      "Success to create transaction",
      newTransaction,
    );
  } catch (error) {
    console.log(error);
    return createResponse(
      "HISTORYPAYMENT",
      "ERROR",
      "Failed to create transaction",
      error,
    );
  }
}

export async function getHistoryTransaction(
  page: number = 1,
  limit: number = 10,
  search: string = "",
) {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          trxNo: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const transactions = await prisma.historyTransaction.findMany({
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

    const total = await prisma.historyTransaction.count();

    return createPaginatedResponse(
      "HISTORYPAYMENT",
      "READ",
      "Success to get all transactions",
      transactions,
      page,
      limit,
      total,
    );
  } catch (error) {
    return createResponse(
      "HISTORYPAYMENT",
      "ERROR",
      "Failed to get transactions",
      error,
    );
  }
}

export async function getHistoryTransactionById(id: number) {
  try {
    const transaction = await prisma.historyTransaction.findUnique({
      where: { id },
    });
    return createResponse(
      "HISTORYPAYMENT",
      "READ",
      "Success to get transaction by ID",
      transaction,
    );
  } catch (error) {
    return createResponse(
      "HISTORYPAYMENT",
      "ERROR",
      "Failed to get transaction by ID",
      error,
    );
  }
}

export async function updateHistoryTransaction(
  id: number,
  data: HistoryTransactionRequest,
) {
  try {
    const updatedTransaction = await prisma.historyTransaction.update({
      where: { id },
      data: data,
    });
    return createResponse(
      "HISTORYPAYMENT",
      "UPDATE",
      "Success to update transaction",
      updatedTransaction,
    );
  } catch (error) {
    return createResponse(
      "HISTORYPAYMENT",
      "ERROR",
      "Failed to update transaction",
      error,
    );
  }
}

export async function deleteHistoryTransaction(id: number) {
  try {
    const deletedTransaction = await prisma.historyTransaction.delete({
      where: { id },
    });
    return createResponse(
      "HISTORYPAYMENT",
      "DELETE",
      "Success to delete transaction",
      deletedTransaction,
    );
  } catch (error) {
    return createResponse(
      "HISTORYPAYMENT",
      "ERROR",
      "Failed to delete transaction",
      error,
    );
  }
}
