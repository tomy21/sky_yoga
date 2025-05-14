import { NextResponse } from "next/server";
import { getAllClass } from "../../controller/classController";

export async function GET() {
    const roles = await getAllClass();
    return NextResponse.json(roles);
}
