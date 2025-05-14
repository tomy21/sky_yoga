import { NextRequest, NextResponse } from "next/server";
import { getUserCustomer } from "../../controller/usersController";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page") ?? 1);
        const limit = Number(searchParams.get("limit") ?? 10);
        const search = searchParams.get("search") || "";
        const users = await getUserCustomer(page, limit, search);
        return NextResponse.json(users);
    } catch (error) {
        console.error("API ROUTE USER ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}