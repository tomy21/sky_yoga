"use client";

import React, { useEffect, useState } from "react";
import { useSchedule } from "@/hooks/useSchedule";
import dayjs, { Dayjs } from "dayjs";
import { Filter, Search } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useCreateBooking } from "@/hooks/useBooking";
import dynamic from "next/dynamic";

const DateSlider = dynamic(() => import("@/components/custome/DateSlider"), {
  ssr: false,
});
const ClientNavbar = dynamic(() => import("@/components/header/ClientNavbar"), {
  ssr: false,
});

type ClassItem = {
  id: number;
  date: string;
  time: string;
  status: string;
  coach: {
    name: string;
    type: string;
  };
  class: {
    name: string;
    type: string;
  };
};

interface jwtPayload {
  exp: number;
  iat: number;
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const { data, isLoading } = useSchedule();
  const [token, setToken] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [userId, setUserId] = useState("");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );
  const createBooking = useCreateBooking();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedDate(dayjs().startOf("day"));
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenRefresh = Cookies.get("tokenCustomer");
      setToken(tokenRefresh || "");

      if (tokenRefresh) {
        const decoded: jwtPayload = jwtDecode(tokenRefresh);
        if (decoded.id) {
          setUserId(decoded.id.toString());
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!data?.data) return;
      const filtered = data.data.filter(
        (classItem: ClassItem) =>
          dayjs(classItem.date).isSame(selectedDate, "day") &&
          classItem.class.type.toUpperCase() === activeTab,
      );
      setFilteredClasses(filtered || []);
    }
  }, [selectedDate, activeTab, data]);

  const handleBooking = (id: number) => {
    setSelectedScheduleId(id);
    setConfirmation(true);
  };

  const handleConfirm = async () => {
    if (!userId || !selectedScheduleId) return;

    createBooking.mutate(
      {
        userId: parseInt(userId),
        scheduleId: selectedScheduleId,
        status: "BOKEED",
      },
      {
        onSuccess: (response) => {
          if (response.code === 280001) {
            toast.success("Booking berhasil!");
            setConfirmation(false);
          }
          if (response.code === 280099) {
            toast.error(
              "Maaf kamu belum aktifasi membership, silahkan hubungi admin",
            );
            setConfirmation(false);
          }
        },
        onError: (err) => {
          console.log(err);
          toast.error(err?.message || "Gagal melakukan booking");
        },
      },
    );
  };

  const handleCancel = () => {
    setConfirmation(false);
    // setSelectedBookingId(null);
  };

  const renderClassItem = (item: ClassItem, index: number) => {
    const isBookedOrFull = item.status === "BOOKED" || item.status === "FULL";

    return (
      <div
        key={index}
        className="h-32 w-full rounded-xl border bg-white p-2 shadow-sm"
        onClick={() => handleBooking(item.id)}
      >
        <div className="flex w-full items-center justify-between">
          <p
            className={`text-xs font-semibold ${item.status === "WAITING" ? "text-pink-500" : "text-green-600"}`}
          >
            {item.status}
          </p>
          {token && (
            <button
              disabled={isBookedOrFull}
              className={`rounded px-3 py-1 text-xs ${
                isBookedOrFull
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-green-200 text-green-600"
              }`}
            >
              {isBookedOrFull ? "Unavailable" : "Booking class"}
            </button>
          )}
        </div>
        <p className="mt-1 text-lg font-bold">{item.time}</p>
        <p className="mt-1 text-gray-800">{item.class.name}</p>
        <p className="text-xs text-gray-600">coach {item.coach.name}</p>
      </div>
    );
  };

  const tabs: Array<"PUBLIC" | "PRIVATE"> = ["PUBLIC", "PRIVATE"];

  return (
    <>
      <ClientNavbar />
      <main className="container m-auto flex h-screen w-full flex-col overflow-hidden bg-white text-gray-800 sm:w-full md:w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold">Book a class</h1>
          <div className="flex flex-row items-center justify-center gap-3 rounded-md bg-cyan-500 px-3 py-2">
            <FaWhatsapp size={20} color="white" />
            <h1 className="text-sm font-semibold text-white">Chat admin</h1>
          </div>
        </div>

        {/* Tabs */}
        {mounted && (
          <div className="mt-5 mb-4 flex w-full items-center justify-between space-x-2">
            {tabs &&
              tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-1/2 rounded-md border py-2 font-semibold ${
                    activeTab === tab
                      ? "bg-cyan-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {tab === "PUBLIC" ? "Public Class" : "Private Class"}
                </button>
              ))}
          </div>
        )}

        {/* Search Bar */}
        {mounted && (
          <div className="mb-6 flex w-full items-center rounded-full bg-gray-100 px-4 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Cari"
              className="w-full bg-transparent px-2 outline-none"
            />
            <Filter size={18} className="text-gray-500" />
          </div>
        )}

        <DateSlider onDateChange={setSelectedDate} />
        {mounted && selectedDate && (
          <h2 className="my-4 mb-4 text-start font-semibold text-gray-900">
            {selectedDate.format("dddd, MMMM D, YYYY")}
          </h2>
        )}

        <div className="flex-1 overflow-y-auto pr-1">
          {isLoading ? (
            <div className="flex h-32 w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-solid border-cyan-500"></div>
            </div>
          ) : filteredClasses.length > 0 ? (
            <div className="flex flex-col gap-2">
              {filteredClasses.map(renderClassItem)}
            </div>
          ) : (
            <div className="flex w-full items-center justify-center text-center text-gray-400">
              No class available on this date.
            </div>
          )}
        </div>
      </main>

      {confirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">Confirmation</h2>
            <p className="mb-4 text-gray-700">
              Are you sure you want to book this class?
            </p>
            <div className="flex justify-end">
              <button
                className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
                onClick={handleConfirm}
              >
                Yes
              </button>
              <button
                className="rounded bg-gray-300 px-4 py-2 text-gray-700"
                onClick={handleCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
