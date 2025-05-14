import { NextRequest, NextResponse } from "next/server";
import {
  createHistoryTransaction,
  getHistoryTransaction,
} from "../controller/historyTransactionController";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const roles = await getHistoryTransaction(page, limit);
    return NextResponse.json(roles);
  } catch (error) {
    console.error("API ROUTE HIstory Transaction ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const newTransaction = await createHistoryTransaction(body);
  return NextResponse.json(newTransaction, { status: 201 });
}
