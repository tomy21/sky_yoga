import { NextRequest, NextResponse } from "next/server";
import {
  deleteRole,
  getRoleById,
  updateRole,
} from "../../controller/roleController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const roleId = Number(id); // Pastikan ID diubah ke angka
  if (isNaN(roleId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const role = await getRoleById(roleId);
  if (!role)
    return NextResponse.json({ error: "Role not found" }, { status: 404 });

  return NextResponse.json(role);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const roleId = Number(id); // Ubah ID menjadi angka
  if (isNaN(roleId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const body = await req.json();
  const updatedRole = await updateRole(roleId, body);
  return NextResponse.json(updatedRole);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const roleId = Number(id); // Ambil ID dari params
  if (isNaN(roleId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  await deleteRole(roleId);
  return NextResponse.json({ message: "Role deleted" });
}
