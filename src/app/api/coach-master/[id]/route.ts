import { NextRequest, NextResponse } from "next/server";
import {
  deletecoach,
  getCoachById,
  updateCoach,
} from "../../controller/coachMaster";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const coachID = Number(id); // Pastikan ID diubah ke angka
  if (isNaN(coachID)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const classMaster = await getCoachById(coachID);
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
  const coachID = Number(id); // Ubah ID menjadi angka
  if (isNaN(coachID)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const body = await req.json();
  const updatedRole = await updateCoach(coachID, body);
  return NextResponse.json(updatedRole);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const coachID = Number(id); // Ambil ID dari params
  if (isNaN(coachID)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  await deletecoach(coachID);
  return NextResponse.json({ message: "Class Master deleted" });
}
