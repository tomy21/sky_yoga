"use client";
import React, { useEffect, useState } from "react";
import { BoxIconLine, GroupIcon } from "@/icons";
import { useDashboardValue } from "@/hooks/useDashboard";
import { format } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EcommerceMetrics = ({ date }: any) => {
  const formattedDate = date ? date : format(new Date(), "yyyy-MM-dd");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    totalCustomer: number;
    totalBooking: number;
  }>({
    totalCustomer: 0,
    totalBooking: 0,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: valueDashboard, isLoading: isDashboardLoading } =
    useDashboardValue(formattedDate);
  const dataValue = valueDashboard && valueDashboard?.data;

  useEffect(() => {
    if (dataValue) {
      setData({
        totalCustomer: dataValue.totalCustomer,
        totalBooking: dataValue.totalBooking,
      });
      setIsLoading(false);
    }
  }, [dataValue]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <GroupIcon className="size-6 text-gray-800 dark:text-white/90" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="text-title-sm mt-2 font-bold text-gray-800 dark:text-white/90">
              {isLoading ? "Loading..." : data.totalCustomer}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Booking
            </span>
            <h4 className="text-title-sm mt-2 font-bold text-gray-800 dark:text-white/90">
              {isLoading ? "Loading..." : data.totalBooking}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
