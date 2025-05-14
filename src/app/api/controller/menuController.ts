import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  createPaginatedResponse,
  createResponse,
} from "../utils/ResponseHelpers";
import { MenuUpdatePayload } from "@/hooks/useMenu";

export async function getMenus(
  page: number = 1,
  limit: number = 10,
  search: string = "",
) {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const menus = await prisma.menu.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalMenu = await prisma.menu.count({ where });

    return createPaginatedResponse(
      "MENU",
      "READ",
      "Success to get all menus",
      menus,
      page,
      limit,
      totalMenu,
    );
  } catch (error) {
    console.error(error);
    return createResponse("MENU", "ERROR", "Failed to get menu", error);
  }
}

export async function getAllMenus() {
  try {
    const menus = await prisma.menu.findMany();

    return createResponse("MENU", "READ", "Success to get all menus", menus);
  } catch (error) {
    return createResponse("ROLE", "ERROR", "Failed to get role by ID", error);
  }
}

export async function getMenuById(id: number) {
  try {
    const menu = await prisma.menu.findUnique({
      where: { id },
    });
    return createResponse("MENU", "READ", "Success to get menu by ID", menu);
  } catch (error) {
    return createResponse("MENU", "ERROR", "Failed to get menu by ID", error);
  }
}

export async function createMenu(data: MenuUpdatePayload) {
  try {
    const menu = await prisma.menu.create({
      data: data,
    });
    return createResponse("MENU", "CREATE", "Success to create menu", menu);
  } catch (error) {
    return createResponse("MENU", "ERROR", "Failed to create menu", error);
  }
}

export async function updateMenu(id: number, data: MenuUpdatePayload) {
  try {
    const updateMenu = await prisma.menu.update({
      where: { id },
      data: data,
    });

    return createResponse(
      "MENU",
      "UPDATE",
      "Success to update menu",
      updateMenu,
    );
  } catch (error) {
    return createResponse("MENU", "ERROR", "Failed to update menu", error);
  }
}

export async function deleteMenu(id: number) {
  try {
    const deleteMenu = await prisma.menu.delete({
      where: { id },
    });
    return createResponse(
      "MENU",
      "DELETE",
      "Success to delete menu",
      deleteMenu,
    );
  } catch (error) {
    return createResponse("MENU", "ERROR", "Failed to get menu by ID", error);
  }
}
