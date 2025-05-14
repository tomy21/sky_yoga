"use client";

import Link from "next/link";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import Badge from "./ui/badge/Badge";
import { SchedulePayload, useSchedule } from "@/hooks/useSchedule";
import { useState } from "react";
import { format } from "date-fns";

export default function AttendanceList() {
  const [selectedLimit] = useState<string>("10");
  const { data } = useSchedule(1, parseInt(selectedLimit), "");

  const bookingData: SchedulePayload[] = data?.data || [];

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy");
  };

  return (
    <div className="mx-auto">
      <Table>
        {/* Table Header */}
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
          <TableRow>
            <TableCell
              isHeader
              className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              No
            </TableCell>
            <TableCell
              isHeader
              className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              Date
            </TableCell>
            <TableCell
              isHeader
              className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              Class Name
            </TableCell>
            <TableCell
              isHeader
              className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              Participant
            </TableCell>
            <TableCell
              isHeader
              className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              Status
            </TableCell>
            <TableCell
              isHeader
              className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {bookingData.map((items, index) => (
            <TableRow key={index}>
              <TableCell className="px-5 py-4 text-start sm:px-6">
                {index + 1}
              </TableCell>
              <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                {formatDate(items.createdAt.toString())}
              </TableCell>
              <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                {items?.class?.name}
              </TableCell>
              <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                {items?.used + "/" + items?.quota}
              </TableCell>
              <TableCell className="text-theme-sm px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                <Badge
                  size="sm"
                  color={items.status === "AVAILABLE" ? "success" : "error"}
                >
                  {items.status}
                </Badge>
              </TableCell>
              <TableCell className="text-theme-sm px-4 py-3 text-gray-500 dark:text-gray-400">
                <Link
                  href={`/admin/attendance/class-attendance?classId=${items.id}`}
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                >
                  Attendance
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
