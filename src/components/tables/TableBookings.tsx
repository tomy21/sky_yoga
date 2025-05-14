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
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { format } from "date-fns";
import Pagination from "./Pagination";
import DeleteConfirmationModal from "../ui/modal/delete-confirmation";
import SuccessModal from "../ui/modal/success-modal";
import {
  BookingPayload,
  useBookingScheduleId,
  useDeleteBooking,
} from "@/hooks/useBooking";
import BookingForm from "../form/formadd/booking";

interface TableBookingsProps {
  scheduleId: number;
}

export default function TableBookings({ scheduleId }: TableBookingsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLimit, setSelectedLimit] = useState<string>("10");

  const { data, isLoading, isError } = useBookingScheduleId(
    scheduleId,
    currentPage,
    parseInt(selectedLimit),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<
    | {
        id: number;
        userId: number;
        scheduleId: number;
        status: "BOKEED" | "CANCEL";
      }
    | undefined
  >();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const classMasters: BookingPayload[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const deleteBooking = useDeleteBooking();

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

  // const handleModalAdd = () => {
  //     setIsModalOpen(true);
  //     setIsAdd(true);
  // };

  const handleModalEdit = (items: {
    id: number;
    userId: number;
    scheduleId: number;
    status: "BOKEED" | "CANCEL";
  }) => {
    setSelectedBooking(items);
    setIsModalOpen(true);
    setIsAdd(false);
  };

  const handleDeleteClick = (items: {
    id: number;
    userId: number;
    scheduleId: number;
    status: "BOKEED" | "CANCEL";
  }) => {
    setSelectedBooking(items);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBooking) {
      deleteBooking.mutate(selectedBooking.id, {
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
        {/* <div className="flex items-center justify-between p-3"> */}
        {/* <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-1/3 rounded-md border p-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    /> */}
        {/* <div className="flex flex-row items-center justify-center space-x-2">
                        <Button
                            onClick={handleModalAdd}
                            variant="primary"
                            className="bg-blue-light-500"
                        >
                            Booking New
                        </Button>
                    </div>
                </div> */}
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
                    Name User
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Class
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
                ) : classMasters.length === 0 ? (
                  <TableRow>
                    <td colSpan={7} className="p-5 text-center text-gray-500">
                      Data not found.
                    </td>
                  </TableRow>
                ) : (
                  classMasters.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        {formatDate(items.createdAt.toString())}
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-start justify-start">
                          <p className="text-sm font-semibold">
                            {items.user?.username}
                          </p>
                          <p className="text-sm font-medium">
                            {items.user?.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-start justify-start">
                          <p className="text-sm font-semibold">
                            {items.schedule?.class?.name}
                          </p>
                          <p className="text-sm font-medium">
                            {items.schedule?.class?.type}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            items.status === "BOKEED" ? "success" : "error"
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

      <BookingForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isAdd={isAdd}
        initialData={selectedBooking ?? undefined}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedBooking?.scheduleId.toString() || ""}
        isLoading={deleteBooking.isPending}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={message}
      />
    </>
  );
}
