"use client";

import React, { useState } from "react";
import SuccessModal from "../ui/modal/success-modal";
import DeleteConfirmationModal from "../ui/modal/delete-confirmation";
import Pagination from "./Pagination";
import Select from "../form/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from "../ui/button/Button";
import { useDeleteMemberType, useMemberType } from "@/hooks/useMemberType";
import { MemberType } from "@prisma/client";
import { format } from "date-fns";
import { IoPencilOutline } from "react-icons/io5";
import MemberTypeForm from "../form/formadd/memberType";

export default function TableMemberType() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLimit, setSelectedLimit] = useState<string>("10");
  const { data, isLoading, isError } = useMemberType(
    currentPage,
    parseInt(selectedLimit),
    search,
  );
  const [selectedValue, setSelectedValue] = useState<{
    id: number;
    type: string;
    duration: number;
    amount: number;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const memberTypes: MemberType[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const deleteMemberType = useDeleteMemberType();

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

  const handleModalEdit = (items: {
    id: number;
    duration: number;
    type: string;
    amount: number;
  }) => {
    setSelectedValue(items);
    setIsModalOpen(true);
    setIsAdd(false);
  };

  const handleConfirmDelete = () => {
    if (selectedValue) {
      deleteMemberType.mutate(selectedValue.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setIsSuccessModalOpen(true);
          setMessage("Member type deleted successfully.");
        },
      });
    }
  };

  const formatCurrency = (
    value: number,
    locale: string = "id-ID",
    currency: string = "IDR",
  ) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(value);
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
              Add Type
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
                    Created Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Name Type
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Duration
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Amount
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
                    <td colSpan={5} className="p-5 text-center">
                      Loading...
                    </td>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <td colSpan={5} className="p-5 text-center text-red-500">
                      Failed to load roles.
                    </td>
                  </TableRow>
                ) : memberTypes.length === 0 ? (
                  <TableRow>
                    <td colSpan={7} className="p-5 text-center text-gray-500">
                      Data not found.
                    </td>
                  </TableRow>
                ) : (
                  memberTypes.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {formatDate(items.createdAt.toString())}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {items.type}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {items.duration + " month"}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {formatCurrency(items.amount)}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <div className="flex w-full items-center justify-evenly">
                          <IoPencilOutline
                            onClick={() => handleModalEdit(items)}
                            className="cursor-pointer text-cyan-500 hover:text-cyan-700"
                            size={20}
                          />
                          {/* <IoTrashOutline
                                                        onClick={() => handleDeleteClick(items)}
                                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                                        size={20}
                                                    /> */}
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

      <MemberTypeForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isAdd={isAdd}
        initialData={selectedValue ?? undefined}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedValue?.type || ""}
        isLoading={deleteMemberType.isPending}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={message}
      />
    </>
  );
}
