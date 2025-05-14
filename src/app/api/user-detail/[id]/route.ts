import { NextRequest, NextResponse } from "next/server";
import {
  deletedUserDetail,
  getUserDetailById,
  updateUserDetail,
} from "../../controller/usersDetail";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userDetailId = Number(id); // Pastikan ID diubah ke angka
  if (isNaN(userDetailId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const User = await getUserDetailById(userDetailId);
  if (!User)
    return NextResponse.json(
      { error: "user detail not found" },
      { status: 404 },
    );

  return NextResponse.json(User);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userDetailId = Number(id); // Ubah ID menjadi angka
  if (isNaN(userDetailId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const body = await req.json();
  const updatedUser = await updateUserDetail(userDetailId, body);
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userDetailId = Number(id); // Ambil ID dari params
  if (isNaN(userDetailId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  await deletedUserDetail(userDetailId);
  return NextResponse.json({ message: "User detail deleted" });
}
