import { NextRequest, NextResponse } from "next/server";
import { getAllUserDetail } from "../controller/usersDetail";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 10);
        const search = searchParams.get("search") || "";
        const roles = await getAllUserDetail(page, limit, search);
        return NextResponse.json(roles);
    } catch (error) {
        console.error("API ROUTE ROLE ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

