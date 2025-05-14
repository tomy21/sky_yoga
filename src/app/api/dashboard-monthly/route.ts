import { NextRequest, NextResponse } from "next/server";
import { getDashboardMonthly } from "../controller/dashboardController";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date");
        const value = await getDashboardMonthly(date ? new Date(date) : undefined);
        return NextResponse.json(value);
    } catch (error) {
        console.error("API ROUTE ROLE ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}