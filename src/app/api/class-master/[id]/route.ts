import { NextRequest, NextResponse } from "next/server";
import {
  deleteClass,
  getClassById,
  updateClass,
} from "../../controller/classController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const classID = Number(id); // Pastikan ID diubah ke angka
  if (isNaN(classID)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const classMaster = await getClassById(classID);
  if (!classMaster)
    return NextResponse.json(
      { error: "Class master not found" },
      { status: 404 },
    );

  return NextResponse.json(classMaster);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const classID = Number(id); // Ubah ID menjadi angka
  if (isNaN(classID)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const body = await req.json();
  const updatedRole = await updateClass(classID, body);
  return NextResponse.json(updatedRole);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const classID = Number(id); // Ambil ID dari params
  if (isNaN(classID)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  await deleteClass(classID);
  return NextResponse.json({ message: "Class Master deleted" });
}
