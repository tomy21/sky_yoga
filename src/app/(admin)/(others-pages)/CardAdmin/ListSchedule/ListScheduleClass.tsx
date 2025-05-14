"use client";

import React from "react";

type ScheduleItem = {
  id: number;
  time: string;
  used: number;
  quota: number;
  class: {
    name: string;
  };
  coach: {
    name: string;
  };
};

export default function ListSchaduleClass({
  data,
  onSelectScheduleAction,
}: {
  data: ScheduleItem[];
  onSelectScheduleAction: (id: number) => void;
}) {
  return (
    <div className="flex w-full flex-col items-start justify-start">
      <h1 className="text-2xl font-normal text-slate-400">
        List Schedule Class
      </h1>
      <div className="my-5 w-full border border-gray-200"></div>

      {!data || data.length === 0 ? (
        <div className="text-white italic">Tidak ada jadwal hari ini 💤</div>
      ) : (
        <div className="flex w-full flex-col items-start justify-start gap-3">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelectScheduleAction(item.id)}
              className="h-32 w-full cursor-pointer rounded-xl border bg-white p-2 shadow-sm transition hover:bg-slate-100"
            >
              <p className="mt-1 text-lg font-bold">{item.time}</p>
              <p className="mt-1 text-lg font-bold">
                {item.used} /{" "}
                <span className="text-xs text-slate-400">{item.quota}</span>
              </p>
              <p className="mt-1 text-gray-800">{item.class.name}</p>
              <p className="text-xs text-gray-600">coach {item.coach.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
