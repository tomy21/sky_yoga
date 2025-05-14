"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ApexOptions } from "apexcharts";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

// Dynamic import
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function YogaTopUsersDonutChart() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Dummy data
  const topUsers = [
    { name: "Alice", value: 120 },
    { name: "Bob", value: 95 },
    { name: "Charlie", value: 75 },
    { name: "Diana", value: 60 },
    { name: "Edward", value: 45 },
  ];

  const series = topUsers.map((user) => user.value);
  const labels = topUsers.map((user) => user.name);

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels,
    colors: ["#465fff", "#70a1ff", "#2ed573", "#ffa502", "#ff6b81"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontFamily: "Outfit",
      },
    },
    legend: {
      position: "bottom",
      fontSize: "14px",
      fontFamily: "Outfit",
      labels: {
        colors: "#555",
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} Points`,
      },
    },
    stroke: {
      show: false,
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Top 5 Yoga Users
          </h3>
          <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
            Berdasarkan total poin dari kelas yoga
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="flex justify-center">
        <ReactApexChart options={options} series={series} type="donut" width="100%" height={300} />
      </div>
    </div>
  );
}
