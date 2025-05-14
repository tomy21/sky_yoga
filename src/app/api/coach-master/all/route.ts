import { NextResponse } from "next/server";
import { getAllCoach } from "../../controller/coachMaster";

export async function GET() {
    const roles = await getAllCoach();
    return NextResponse.json(roles);
}