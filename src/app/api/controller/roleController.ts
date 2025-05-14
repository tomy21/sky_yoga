import { Prisma, Role, Status } from "@prisma/client";
import prisma from "../lib/prisma";
import { createPaginatedResponse, createResponse } from "../utils/ResponseHelpers";


// GET - Get all roles
export async function getRoles(page: number = 1, limit: number = 10) {
    try {
        const skip = (page - 1) * limit;

        const roles = await prisma.roleMaster.findMany({
            skip,
            take: limit,
        });

        const totalRole = await prisma.roleMaster.count();

        return createPaginatedResponse(
            "ROLE",
            "READ",
            "Success to get all roles",
            roles,
            page,
            limit,
            totalRole
        );
    } catch (error) {
        return createResponse("ROLE", "ERROR", "Failed to get role by ID", error);
    }
}

// GET - Get role by ID
export async function getRoleById(id: number) {
    try {
        const role = await prisma.roleMaster.findUnique({
            where: { id },
        });
        return createResponse("ROLE", "READ", "Success to get role by ID", role);
    } catch (error) {
        return createResponse("ROLE", "ERROR", "Failed to get role by ID", error);
    }
}

export async function createRole(data: { name: string; status: "ACTIVE" | "INACTIVE" }) {
    try {
        const role = await prisma.roleMaster.create({
            data: {
                name: Role[data.name as keyof typeof Role],
                status: Status[data.status as keyof typeof Status],
            },
        });

        return createResponse("ROLE", "CREATE", "Success to create role", role);
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return createResponse("ROLE", "ERROR", "Role already exists", null);
        }

        return createResponse("ROLE", "ERROR", "Failed to create role", error);
    }
}
// PUT - Update role
export async function updateRole(
  id: number,
  data: { name?: string; status: "Active" | "Unactive" }
) {
  try {
    const updateRole = await prisma.roleMaster.update({
      where: { id },
      data: {
        ...(data.name && { name: Role[data.name.toUpperCase() as keyof typeof Role] }),
        status: Status[data.status.toUpperCase() as keyof typeof Status]
      }
    });

    return createResponse("ROLE", "UPDATE", "Success to update role", updateRole);
  } catch (error) {
    return createResponse("ROLE", "ERROR", "Failed to update role", error);
  }
}

// DELETE - Delete role
export async function deleteRole(id: number) {
    try {
        const deleteRole = await prisma.roleMaster.delete({
            where: { id },
        });
        return createResponse("ROLE", "DELETE", "Success to delete role", deleteRole);
    } catch (error) {
        return createResponse("ROLE", "ERROR", "Failed to get role by ID", error);
    }
}
