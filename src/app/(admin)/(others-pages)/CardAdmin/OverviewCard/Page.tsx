"use client";
import React, { useState } from "react";
import ListSchaduleClass from "../ListSchedule/ListScheduleClass";
import { useSchedule } from "@/hooks/useSchedule";
import { isSameDay } from "date-fns";
import LIstAttendance from "../ListMemberAttendance/[schaduleId]";

type todaySchedule = {
  id: number;
  date: string;
  time: string;
  classId: number;
  coachId: number;
  quota: number;
  status: "AVAILABLE" | "FULL_BOOKED";
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

export default function LayoutOverview() {
  const { data, isLoading, isError } = useSchedule();
  const today = new Date();
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  const todaySchedule = data?.data?.filter((item: todaySchedule) =>
    isSameDay(new Date(item.date), today),
  );

  const handleSelectSchedule = (id: number) => {
    setSelectedScheduleId(id);
    console.log("Schedule dipilih:", id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex w-full items-start justify-between space-x-3">
      <div className="flex-1 rounded-xl bg-white p-3 shadow">
        <LIstAttendance schaduleId={selectedScheduleId ?? undefined} />
      </div>
      <div className="flex w-1/3 rounded-xl bg-white p-3">
        <ListSchaduleClass
          data={todaySchedule}
          onSelectScheduleAction={handleSelectSchedule}
        />
      </div>
    </div>
  );
}
