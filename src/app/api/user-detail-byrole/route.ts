import { NextRequest, NextResponse } from "next/server";
import { getUserDetailsByRoleMasterId } from "../controller/usersDetail";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page") ?? 1);
        const roleMasterId = Number(searchParams.get("roleMasterId") ?? 3);
        const limit = Number(searchParams.get("limit") ?? 10);
        const roles = await getUserDetailsByRoleMasterId(roleMasterId, page, limit);
        return NextResponse.json(roles);
    } catch (error) {
        console.error("API ROUTE ROLE ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
