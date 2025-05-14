import { NextRequest, NextResponse } from "next/server";
import {
  deleteMembership,
  getMembershipById,
  updateMembership,
} from "../../controller/membershipController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idTrx = Number(id);

  if (isNaN(idTrx)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const response = await getMembershipById(idTrx);
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
  const response = await updateMembership(idTrx, body);
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

  const response = await deleteMembership(idTrx);
  return NextResponse.json(response);
}
