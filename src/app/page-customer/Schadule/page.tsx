"use client";
import DateSlider from "@/components/custome/DateSlider";
import ClientNavbar from "@/components/header/ClientNavbar";
import { useBookingByuser } from "@/hooks/useBooking";
import dayjs, { Dayjs } from "dayjs";
import { Filter, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface payloadBooking {
  id: number;
  userId: number;
  scheduleId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  schedule: {
    id: number;
    date: string;
    time: string;
    class: {
      id: number;
      name: string;
      type: string;
    };
    coach: {
      id: number;
      name: string;
      type: string;
    };
  };
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

interface jwtPayload {
  exp: number;
  iat: number;
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function SchadulePage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(
    dayjs().startOf("day"),
  );
  const [filteredClasses, setFilteredClasses] = useState<payloadBooking[]>([]);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const { data: mySchedule, isLoading } = useBookingByuser(
    parseInt(userId),
    1,
    10,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const tokenRefresh = Cookies.get("tokenCustomer");
    setToken(tokenRefresh || "");

    if (tokenRefresh) {
      const decoded: jwtPayload = jwtDecode(tokenRefresh);
      if (decoded.id) {
        setUserId(decoded.id.toString());
      }
    }
  }, [userId, token]);

  useEffect(() => {
    if (!mySchedule?.data) return;
    const filtered = mySchedule.data.filter((classItem: payloadBooking) =>
      dayjs(classItem.createdAt.toLocaleString()).isSame(selectedDate, "day"),
    );
    setFilteredClasses(filtered || []);
  }, [selectedDate, mySchedule]);

  const renderClassItem = (item: payloadBooking, index: number) => {
    return (
      <div
        key={index}
        className={`h-32 w-full rounded-xl border p-2 shadow-sm ${
          item.status === "BOKEED" ? "bg-white" : "bg-red-400 text-white"
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <p
            className={`text-xs font-semibold ${item.status === "CANCEL" ? "text-red-200" : "text-green-600"}`}
          >
            {item.status}
          </p>
        </div>
        <p className="mt-1 text-lg font-bold">{item.schedule.time}</p>
        <p className="mt-1 text-gray-800">{item.schedule?.class?.name}</p>
        <p className="text-xs text-gray-600">
          coach {item.schedule?.coach?.name}
        </p>
      </div>
    );
  };

  return (
    <>
      <ClientNavbar />
      <main className="flex min-h-screen flex-col items-start bg-white p-5 text-gray-800">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold">My Schedule</h1>
        </div>

        {/* Search Bar */}
        {mounted && (
          <div className="mt-5 mb-6 flex w-full items-center rounded-full bg-gray-100 px-4 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Cari"
              className="w-full bg-transparent px-2 outline-none"
            />
            <Filter size={18} className="text-gray-500" />
          </div>
        )}

        {/* Date Slider */}
        <DateSlider onDateChange={setSelectedDate} />

        {/* Selected Date Display */}
        <h2 className="my-4 mb-4 text-start font-semibold text-gray-900">
          {selectedDate.format("dddd, MMMM D, YYYY")}
        </h2>

        {/* Class List */}
        <div className="w-full flex-1 overflow-y-auto pr-1">
          {isLoading ? (
            <div className="flex h-32 w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-solid border-cyan-500"></div>
            </div>
          ) : filteredClasses.length > 0 ? (
            <div className="flex w-full flex-col gap-2">
              {filteredClasses.map(renderClassItem)}
            </div>
          ) : (
            <div className="flex w-full items-center justify-center text-center text-gray-400">
              No class available on this date.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
