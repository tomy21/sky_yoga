import { NextRequest, NextResponse } from "next/server";
import { createCoach, getCoach } from "../controller/coachMaster";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 10);
        const search = searchParams.get("search") || "";
        const roles = await getCoach(page, limit, search);
        return NextResponse.json(roles);
    } catch (error) {
        console.error("API ROUTE ROLE ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const body = await req.json();
    const newRole = await createCoach(body);
    return NextResponse.json(newRole, { status: 201 });
}