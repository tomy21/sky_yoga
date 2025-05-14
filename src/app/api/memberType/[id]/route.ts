import { NextRequest, NextResponse } from "next/server";
import {
  deleteMemberType,
  getMemberTypeById,
  updateMemberType,
} from "../../controller/memberTypeController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idType = Number(id);

  if (isNaN(idType)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const response = await getMemberTypeById(idType);
  return NextResponse.json(response);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idType = Number(id);
  if (isNaN(idType)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const body = await req.json();
  const response = await updateMemberType(idType, body);
  return NextResponse.json(response);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idType = Number(id);
  if (isNaN(idType)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const response = await deleteMemberType(idType);
  return NextResponse.json(response);
}
