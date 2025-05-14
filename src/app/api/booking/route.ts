import { NextRequest, NextResponse } from "next/server";
import { createBooking, getBooking } from "../controller/bookingController";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 10);
        const roles = await getBooking(page, limit);
        return NextResponse.json(roles);
    } catch (error) {
        console.error("API ROUTE ROLE ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const body = await req.json();
    const newRole = await createBooking(body);
    return NextResponse.json(newRole, { status: 201 });
}