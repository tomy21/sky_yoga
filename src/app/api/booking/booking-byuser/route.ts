import { NextRequest, NextResponse } from "next/server";
import { getBookingsByUser } from "../../controller/bookingController";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId") || 1);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    // Mendapatkan data booking berdasarkan scheduleId
    const bookings = await getBookingsByUser(userId, page, limit);
    
    // Mengembalikan hasil dalam bentuk JSON
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("API ROUTE ERROR:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}