"use client";

import DateSlider from '@/components/custome/DateSlider';
import ClientNavbar from '@/components/header/ClientNavbar';
import dayjs, { Dayjs } from 'dayjs';
import { Filter, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';

type ClassItem = {
  time: string;
  title: string;
  teacher: string;
  status: string;
  date: string;
};

export default function Page() {
  const [activeTab, setActiveTab] = useState('public');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().startOf('day'));
  const [loading, setLoading] = useState(false);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);


  const classes = [
    { time: '07:00', title: 'Pilates Reformer - Group Class', teacher: 'Evie', status: 'WAITING LIST', date: '2025-04-07' },
    { time: '08:00', title: 'Pilates Reformer - Group Class', teacher: 'Evie', status: '1 SPOT(S) LEFT', date: '2025-04-07' },
    { time: '10:00', title: 'Pilates Reformer - Group Class', teacher: 'Andita', status: '1 SPOT(S) LEFT', date: '2025-04-07' },
    { time: '11:00', title: 'Pilates Tower (Intermediate)', teacher: 'Andita', status: '1 SPOT(S) LEFT', date: '2025-04-07' },
    { time: '12:00', title: 'Pilates Reformer - Group Class', teacher: 'Andita', status: '3 SPOT(S) LEFT', date: '2025-04-07' },
    { time: '16:00', title: 'Pilates Reformer - Group Class', teacher: 'Poppy', status: '2 SPOT(S) LEFT', date: '2025-04-07' },
    { time: '16:30', title: 'Aerial for Kids', teacher: 'Claire', status: 'WAITING LIST', date: '2025-04-08' },
    { time: '17:00', title: 'Pilates Tower - Group Class', teacher: 'Poppy', status: 'WAITING LIST', date: '2025-04-08' },
    { time: '18:00', title: 'Pilates Reformer - Group Class', teacher: 'Andita', status: '3 SPOT(S) LEFT', date: '2025-04-09' },
    { time: '18:30', title: 'Pilates Reformer - Group Class', teacher: 'Andita', status: '1 SPOT(S) LEFT', date: '2025-04-09' },
  ];

  useEffect(() => {
    setLoading(true);

    // Simulasi loading (atau bisa diganti fetch API)
    setTimeout(() => {
      const filtered = classes.filter((classItem) =>
        dayjs(classItem.date).isSame(selectedDate, 'day')
      );
      setFilteredClasses(filtered);
      setLoading(false);
    }, 300);
  }, [selectedDate]);

  return (
    <>
        <ClientNavbar />
      <main className="flex flex-col items-start min-h-screen bg-white text-gray-800 p-5">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl font-semibold">Book a class</h1>
          <div className="flex flex-row gap-3 items-center justify-center rounded-md px-3 py-2 bg-cyan-500">
            <FaWhatsapp size={20} color="white" />
            <h1 className="text-sm text-white font-semibold">Chat admin</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center space-x-2 mt-5 mb-4 w-full">
          <button
            onClick={() => setActiveTab('public')}
            className={`w-1/2 py-2 rounded-md font-semibold border ${activeTab === 'public' ? 'bg-cyan-500 text-white' : 'bg-white text-gray-800'}`}
          >
            Public Class
          </button>
          <button
            onClick={() => setActiveTab('private')}
            className={`w-1/2 py-2 rounded-md font-semibold border ${activeTab === 'private' ? 'bg-cyan-500 text-white' : 'bg-white text-gray-800'}`}
          >
            Private Class
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex w-full items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Cari"
            className="bg-transparent outline-none px-2 w-full"
          />
          <Filter size={18} className="text-gray-500" />
        </div>

        {/* Date Slider */}
        <DateSlider onDateChange={setSelectedDate} />

        {/* Selected Date Display */}
        <h2 className="font-semibold text-gray-900 mb-4 text-start my-4">
          {selectedDate.format('dddd, MMMM D, YYYY')}
        </h2>

        {/* Class List */}
        <div className="flex flex-row flex-wrap justify-center items-center gap-2 text-sm min-h-[100px] w-full">
            {activeTab === 'public' && (
                loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500 border-solid"></div>
                </div>
                ) : filteredClasses.length > 0 ? (
                filteredClasses.map((item, index) => (
                    <div key={index} className="p-2 rounded-xl border bg-white shadow-sm w-44 min-h-32">
                        <p className={`text-xs font-semibold ${item.status.includes('WAITING') ? 'text-pink-500' : 'text-green-600'}`}>
                            {item.status}
                        </p>
                        <p className="text-lg font-bold mt-1">{item.time}</p>
                        <p className="mt-1 text-gray-800">{item.title}</p>
                        <p className="text-gray-600 text-xs">coach {item.teacher}</p>
                    </div>
                ))
                ) : (
                <div className="text-center text-gray-400 w-full flex justify-center items-center">
                    No class available on this date.
                </div>
                )
            )}

            {activeTab === 'private' && (
                <div className="text-gray-400 w-full flex justify-center items-center">
                Private class data not available (demo).
                </div>
            )}
            </div>

      </main>
    </>
  );
}
