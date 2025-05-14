import { NextRequest, NextResponse } from "next/server";
import {
  deleteBooking,
  getBookingById,
  updateBooking,
} from "../../controller/bookingController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const bookingId = Number(id);
  if (isNaN(bookingId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const booking = await getBookingById(bookingId);
  if (!booking)
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  return NextResponse.json(booking);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const bookingId = Number(id);
  if (isNaN(bookingId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const body = await req.json();
  const updated = await updateBooking(bookingId, body);
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const bookingId = Number(id);
  if (isNaN(bookingId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  await deleteBooking(bookingId);
  return NextResponse.json({ message: "Booking deleted" });
}
