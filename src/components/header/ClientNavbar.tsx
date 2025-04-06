import { CalendarDays, Home, List } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react'

export default function ClientNavbar() {
    type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
  };

  const navItems: NavItem[] = [
  {
    icon: <Home />,
    name: "Home",
    path: "/",
  },
  {
    icon: <List />,
    name: "Bookings",
    path: "/bookings",
  },
  {
    icon: <CalendarDays />,
    name: "Schadule",
    path: "/schadule",
  },
];

const pathname = usePathname();
const isActive = useCallback((path: string) => path === pathname, [pathname]);
  return (
    <>
      <header className="w-full">
        <div className='w-[90%] m-auto px-4 py-3 flex justify-between items-center sticky top-0 z-50 bg-white'>
          <div className="hidden md:flex items-center space-x-2">
            <Image src="/images/logo_horizontal_bg_white.jpg" alt="cyanlates" width={150} height={30} />
          </div>
          <ul className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.path || "#"} className={`flex items-center gap-2 font-medium hover:bg-cyan-100 rounded p-3 ${isActive(item.path || "#") ? "bg-cyan-100" : " "}`}>
                    <span className='w-[30px]'>{item.icon}</span> {item.name}
                </Link>
              </li>
            ))}
            
            
          </ul>
          <div className="hidden md:block">
            <button className="bg-cyan-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-cyan-600 transition">
              Check-in
            </button>
          </div>
        </div>
      </header>

        <ul className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2 md:hidden z-50">
            {navItems.map((item) => (
                <li key={item.name}>
                <Link href={item.path || "#"} className={`flex flex-col items-center text-sm text-gray-700 hover:text-cyan-500`}>
                    <span className={`w-[30px] ${isActive(item.path || "#") ? "text-cyan-500" : ""}`}>{item.icon}</span>
                    <p className={`${isActive(item.path || "#") ? "text-cyan-500" : ""}`}>{item.name}</p>
                </Link>
                </li>
            ))}       
        </ul>
    </>
  )
}
