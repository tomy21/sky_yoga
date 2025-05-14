import { NextResponse } from "next/server";
import { getAllMenus } from "../../controller/menuController";

export async function GET() {
    const roles = await getAllMenus();
    return NextResponse.json(roles);
}
