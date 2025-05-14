import { NextRequest, NextResponse } from "next/server";
import {
  deleteHistoryTransaction,
  getHistoryTransactionById,
  updateHistoryTransaction,
} from "../../controller/historyTransactionController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idTrx = Number(id);

  if (isNaN(idTrx)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const response = await getHistoryTransactionById(idTrx);
  return NextResponse.json(response);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idTrx = Number(id);
  if (isNaN(idTrx)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const body = await req.json();
  const response = await updateHistoryTransaction(idTrx, body);
  return NextResponse.json(response);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idTrx = Number(id);
  if (isNaN(idTrx)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const response = await deleteHistoryTransaction(idTrx);
  return NextResponse.json(response);
}
