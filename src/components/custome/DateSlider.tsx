'use client';

import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

type DateSliderProps = {
  onDateChange: (date: Dayjs) => void;
};

export default function DateSlider({ onDateChange }: DateSliderProps) {
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('day'));

  // Buat 14 hari ke depan
  const dates = Array.from({ length: 14 }, (_, i) => dayjs().add(i, 'day'));

  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate]);

  return (
    <div className="overflow-x-auto w-full py-2">
      <div className="flex gap-3 w-max">
        {dates.map((date, index) => {
          const isActive = date.isSame(selectedDate, 'day');
          return (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg border text-sm font-semibold transition min-w-[60px] ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-white text-cyan-600 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <span className="text-base">{date.format('D')}</span>
              <span className="text-xs">{date.format('ddd')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
