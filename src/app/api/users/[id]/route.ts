import { NextRequest, NextResponse } from "next/server";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../../controller/usersController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = Number(id); // Pastikan ID diubah ke angka
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const User = await getUserById(userId);
  if (!User)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(User);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = Number(id); // Ubah ID menjadi angka
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const body = await req.json();
  const updatedUser = await updateUser(userId, body);
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userId = Number(id); // Ambil ID dari params
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  await deleteUser(userId);
  return NextResponse.json({ message: "User deleted" });
}
