import { NextRequest, NextResponse } from "next/server";
import {
  deleteSchedule,
  getScheduleById,
  updateSchedule,
} from "../../controller/schaduleController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const schaduleId = Number(id); // Pastikan ID diubah ke angka
  if (isNaN(schaduleId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const User = await getScheduleById(schaduleId);
  if (!User)
    return NextResponse.json({ error: "Schadule not found" }, { status: 404 });

  return NextResponse.json(User);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const schaduleId = Number(id); // Ubah ID menjadi angka
  if (isNaN(schaduleId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const body = await req.json();
  const updatedUser = await updateSchedule(schaduleId, body);
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const schaduleId = Number(id); // Ambil ID dari params
  if (isNaN(schaduleId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  await deleteSchedule(schaduleId);
  return NextResponse.json({ message: "Schadule deleted" });
}
