"use client";

import React, { useState } from "react";
import DeleteConfirmationModal from "../ui/modal/delete-confirmation";
import SuccessModal from "../ui/modal/success-modal";
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
import { useDeleteMembership, useMembership } from "@/hooks/useMembership";
import { format } from "date-fns";
import Badge from "../ui/badge/Badge";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import MembershipTrxForm from "../form/formadd/membershipTrx";
import { MembershipWithUser } from "@/app/api/controller/membershipController";

export default function TableMembershipTrx() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLimit, setSelectedLimit] = useState<string>("10");
  const { data, isLoading, isError } = useMembership(
    currentPage,
    parseInt(selectedLimit),
    search,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectMembership, setSelectMembership] = useState<{
    id: number;
    userId: number;
    memberTypeId: number;
    startDate: Date;
    endDate: Date;
    status: "ACTIVE" | "EXPIRED";
  } | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const membershipTrx: MembershipWithUser[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const deleteMembership = useDeleteMembership();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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
    userId: number;
    memberTypeId: number;
    startDate: Date;
    endDate: Date;
    status: "ACTIVE" | "EXPIRED";
  }) => {
    setSelectMembership(items);
    setIsModalOpen(true);
    setIsAdd(false);
  };

  const handleDeleteClick = (items: {
    id: number;
    userId: number;
    memberTypeId: number;
    startDate: Date;
    endDate: Date;
    status: "ACTIVE" | "EXPIRED";
  }) => {
    setSelectMembership(items);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectMembership) {
      deleteMembership.mutate(selectMembership.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setIsSuccessModalOpen(true);
          setMessage("Membership deleted successfully.");
        },
      });
    }
  };

  //   const formatCurrency = (
  //     value: number,
  //     locale: string = "id-ID",
  //     currency: string = "IDR",
  //   ) => {
  //     return new Intl.NumberFormat(locale, {
  //       style: "currency",
  //       currency: currency,
  //       minimumFractionDigits: 0,
  //     }).format(value);
  //   };
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
              Order Membership
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
                    Customer
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Type Membership
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Start Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    End Date
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
                ) : membershipTrx.length === 0 ? (
                  <TableRow>
                    <td colSpan={7} className="p-5 text-center text-gray-500">
                      Data not found.
                    </td>
                  </TableRow>
                ) : (
                  membershipTrx.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-start justify-start">
                          <h1 className="font-semibold text-gray-500 dark:text-gray-400">
                            {items.user.username ?? "-"}
                          </h1>
                          <h1 className="font-medium text-gray-300 dark:text-gray-200">
                            {items.user?.phone}
                          </h1>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {items.memberType?.type}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {format(new Date(items.startDate), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {format(new Date(items.endDate), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
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

      <MembershipTrxForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isAdd={isAdd}
        initialData={selectMembership ?? undefined}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectMembership?.userId.toString() || ""}
        isLoading={deleteMembership.isPending}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={message}
      />
    </>
  );
}
