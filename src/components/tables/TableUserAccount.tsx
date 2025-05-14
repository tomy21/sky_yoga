"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Select from "../form/Select";
import Badge from "../ui/badge/Badge";
import { IoTrashOutline } from "react-icons/io5";
import { format } from "date-fns";
import Pagination from "./Pagination";
import Button from "../ui/button/Button";
import DeleteConfirmationModal from "../ui/modal/delete-confirmation";
import SuccessModal from "../ui/modal/success-modal";
import { useDeleteUser, UserPayload, useUsers } from "@/hooks/useUsers";
import UsersForm from "../form/formadd/users";

export default function TableUserAccount() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLimit, setSelectedLimit] = useState<string>("10");
  const { data, isLoading, isError } = useUsers(
    currentPage,
    parseInt(selectedLimit),
    search,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<{
    id: number;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    status?: "ACTIVE" | "INACTIVE";
    roleMasterId?: number;
  } | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const userData: UserPayload[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const deleteUser = useDeleteUser();

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

  // const handleModalEdit = (items: {
  //     id: number;
  //     username: string;
  //     email: string;
  //     password: string;
  //     phone: string;
  //     role: string;
  //     status?: "ACTIVE" | "INACTIVE";
  //     roleMasterId?: number;
  // }) => {

  //     setSelectedUsers(items);
  //     setIsModalOpen(true);
  //     setIsAdd(false);
  // };

  const handleDeleteClick = (items: {
    id: number;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    status?: "ACTIVE" | "INACTIVE";
    roleMasterId?: number;
  }) => {
    setSelectedUsers(items);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUsers) {
      deleteUser.mutate(selectedUsers.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setIsSuccessModalOpen(true);
          setMessage("Users deleted successfully.");
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
              Add Users
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
                    className="text-theme-xs px-4 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    #
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-4 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Created Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-4 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Username
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-4 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Account
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-4 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {isLoading ? (
                  <TableRow>
                    <td colSpan={5} className="p-5 text-center">
                      Loading...
                    </td>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <td colSpan={5} className="p-5 text-center text-red-500">
                      Failed to load users account.
                    </td>
                  </TableRow>
                ) : userData.length === 0 ? (
                  <TableRow>
                    <td colSpan={5} className="p-5 text-center text-gray-500">
                      Data not found.
                    </td>
                  </TableRow>
                ) : (
                  userData.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {formatDate(items.createdAt?.toString())}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {items?.username}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-start justify-start">
                          <p className="text-sm font-semibold">{items.email}</p>
                          <p className="text-sm font-normal">{items.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {items?.role}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            items.status === "ACTIVE" ? "success" : "error"
                          }
                        >
                          {items.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <div className="flex w-full items-center justify-evenly">
                          {/*                                                     
                                                    <IoPencilOutline
                                                        onClick={() => handleModalEdit(items)}
                                                        className="cursor-pointer text-cyan-500 hover:text-cyan-700"
                                                        size={20}
                                                    /> */}
                          <IoTrashOutline
                            onClick={() => handleDeleteClick(items)}
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

      <UsersForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isAdd={isAdd}
        initialData={selectedUsers ?? undefined}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedUsers?.username || ""}
        isLoading={deleteUser.isPending}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={message}
      />
    </>
  );
}
