"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Pagination from "./Pagination";
import Select from "../form/Select";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { format } from "date-fns";
import DeleteConfirmationModal from "../ui/modal/delete-confirmation";
import SuccessModal from "../ui/modal/success-modal";
import { useDeleteMenu, useMenus } from "@/hooks/useMenu";
import * as Icons from "../../icons/index";
import MenuFormModal from "../form/formadd/menu";
import { Status } from "@prisma/client";

interface Menu {
    id: number;
    parentId: number;
    name: string;
    path: string;
    icon: string;
    position: number;
    status: Status;
    createdAt: string;
}

export default function TableMenu() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLimit, setSelectedLimit] = useState<string>("10");
    const { data, isLoading, isError } = useMenus(currentPage, parseInt(selectedLimit), search);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<{
        id: number;
        parentId: number;
        path:string;
        name: string;
        icon: string;
        position: number;
        status: Status;
        createdAt: string;
    } | null>(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [parent, setParent] = useState(false);

    const menus: Menu[] = data?.data || [];
    const meta = data?.meta;
    const totalPages = meta?.totalPages || 1;

    const deleteRole = useDeleteMenu();

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "dd MMM yyyy");
    };

    const limitOption = [
        { value: "10", label: "10" },
        { value: "20", label: "20" },
        { value: "50", label: "50" },
    ];

    const handleModalAdd = () => {
        setIsModalOpen(true);
        setIsAdd(true);
    };

    const handleModalEdit = (menus: {
        id: number;
        parentId: number;
        name: string;
        path: string;
        icon: string;
        position: number;
        status: Status;
        createdAt: string;
    }) => {
        
        if (menus.parentId === null) {
            setParent(true);
        } else {
            setParent(true);
        }

        setSelectedRole(menus);
        setIsModalOpen(true);
        setIsAdd(false);
    };

    const handleDeleteClick = (menus: {
        id: number;
        parentId: number;
        name: string;
        path: string;
        icon: string;
        position: number;
        status: Status;
        createdAt: string;
    }) => {
        setSelectedRole(menus);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedRole) {
            deleteRole.mutate(selectedRole.id, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setIsSuccessModalOpen(true);
                    setMessage("Role deleted successfully.");
                },
            });
        }
    };

    return (
        <>
            <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="flex items-center justify-between p-3">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-1/3 rounded-md border p-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="flex flex-row items-center justify-center space-x-2">
                        <Button
                            onClick={handleModalAdd}
                            variant="primary"
                            className="bg-blue-light-500"
                        >
                            Add Menu
                        </Button>
                    </div>
                </div>
                <div className="max-w-full overflow-x-auto border-t-2 border-gray-300">
                    <div className="min-w-[1102px]">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-300 dark:border-white/[1]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        #
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Create Date
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Parent Menu
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Position
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {isLoading ? (
                                    <TableRow>
                                    <td colSpan={6} className="p-5 text-center">
                                        Loading...
                                    </td>
                                    </TableRow>
                                ) : isError ? (
                                    <TableRow>
                                    <td colSpan={6} className="p-5 text-center text-red-500">
                                        Failed to load roles.
                                    </td>
                                    </TableRow>
                                ) : menus.length === 0 ? (
                                    <TableRow>
                                    <td colSpan={6} className="p-5 text-center text-gray-500">
                                        No menu data found.
                                    </td>
                                    </TableRow>
                                ) : (
                                    menus.map((menu, index) => (
                                    <TableRow key={menu.id}>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {index + 1}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {formatDate(menu.createdAt)}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {(() => {
                                            const iconName = menu.icon.replace(/[<>/]/g, "").trim();
                                            const IconComponent = Icons[iconName as keyof typeof Icons];
                                            return IconComponent ? (
                                            <div className="flex flex-row items-center justify-start gap-x-2">
                                                <IconComponent className="inline-block h-7 w-7" />
                                                <span className="ml-2">{menu.name}</span>
                                            </div>
                                            ) : (
                                            <span>{menu.name}</span>
                                            );
                                        })()}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {menu.parentId === null ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        {menu.position}
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={menu.status === "ACTIVE" ? "success" : "error"}
                                        >
                                            {menu.status}
                                        </Badge>
                                        </TableCell>
                                        <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                                        <div className="flex w-full items-center justify-evenly">
                                            <IoPencilOutline
                                            onClick={() => handleModalEdit(menu)}
                                            className="cursor-pointer text-cyan-500 hover:text-cyan-700"
                                            size={20}
                                            />
                                            <IoTrashOutline
                                            onClick={() => handleDeleteClick(menu)}
                                            className="cursor-pointer text-red-500 hover:text-red-700"
                                            size={20}
                                            />
                                        </div>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                )}
                            </TableBody>

                        </Table>

                        <div className="w-full border border-slate-300"></div>

                        <div className="flex w-full items-center justify-between p-3">
                            <div className="flex w-44 items-center space-x-3">
                                <p className="w-1/2 text-right">Per page:</p>
                                <div className="w-20">
                                    <Select
                                        options={limitOption}
                                        onChange={setSelectedLimit}
                                        defaultValue={selectedLimit}
                                        className="w-20"
                                    />
                                </div>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <MenuFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isAdd={isAdd}
                isParent={parent}
                initialData={selectedRole ?? undefined}
            />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectedRole?.name || ""}
                isLoading={deleteRole.isPending}
            />
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                message={message}
            />
        </>
    );
}
