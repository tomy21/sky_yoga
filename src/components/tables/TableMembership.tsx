"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "./Pagination";
import Select from "../form/Select";
import {
  useDeleteUserDetail,
  useUserDetailByRole,
} from "@/hooks/useUsersDetail";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import DeleteConfirmationModal from "../ui/modal/delete-confirmation";
import SuccessModal from "../ui/modal/success-modal";

interface userDetails {
  id: number;
  fullName: string;
  nickName: string;
  email: string;
  phoneWa: string;
  address: string;
  emergencyContact: string;
  createdAt: string;
}

export default function TableMembership() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLimit, setSelectedLimit] = useState<string>("10");
  const { data, isLoading, isError } = useUserDetailByRole(
    currentPage,
    parseInt(selectedLimit),
    search,
  );
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isAdd, setIsAdd] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<{
    id: number;
    fullName: string;
    nickName: string;
    email: string;
    phoneWa: string;
    address: string;
    emergencyContact: string;
  } | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const userData: userDetails[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const deleteUserDetail = useDeleteUserDetail();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const limitOption = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "50", label: "50" },
  ];

  const handleModalEdit = (items: {
    id: number;
    fullName: string;
    nickName: string;
    email: string;
    phoneWa: string;
    address: string;
    emergencyContact: string;
  }) => {
    setSelectedUsers(items);
  };

  const handleDeleteClick = (items: {
    id: number;
    fullName: string;
    nickName: string;
    email: string;
    phoneWa: string;
    address: string;
    emergencyContact: string;
  }) => {
    setSelectedUsers(items);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUsers) {
      deleteUserDetail.mutate(selectedUsers.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setIsSuccessModalOpen(true);
          setMessage("Membership deleted successfully.");
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
                    Profil
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Contact
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Address
                  </TableCell>
                  {/* <TableCell
                                        isHeader
                                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Birtdate
                                    </TableCell> */}
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Emergency Contact
                  </TableCell>
                  {/* <TableCell
                                        isHeader
                                        className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Status
                                    </TableCell> */}
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
                ) : userData.length === 0 ? (
                  <TableRow>
                    <td colSpan={6} className="p-5 text-center text-gray-500">
                      Data not found.
                    </td>
                  </TableRow>
                ) : (
                  userData.map((items, index) => (
                    <TableRow key={items.id}>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-start justify-start">
                          <p className="text-sm font-semibold">
                            {items.fullName}
                          </p>
                          <p className="text-sm font-normal">
                            {items.nickName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-start justify-start">
                          <p className="text-sm font-semibold">{items.email}</p>
                          <p className="text-sm font-normal">{items.phoneWa}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {items.address}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {items.emergencyContact}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <div className="flex w-full items-center justify-evenly">
                          <IoPencilOutline
                            onClick={() => handleModalEdit(items)}
                            className="cursor-pointer text-cyan-500 hover:text-cyan-700"
                            size={20}
                          />
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

      {/* <MenuFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isAdd={isAdd}
                isParent={parent}
                initialData={selectedRole ?? undefined}
            /> */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedUsers?.fullName || ""}
        isLoading={deleteUserDetail.isPending}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={message}
      />
    </>
  );
}
