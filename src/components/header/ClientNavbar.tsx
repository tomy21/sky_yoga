import { CalendarDays, Home, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";

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
      name: "Class",
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
        <div className="sticky top-0 z-50 m-auto flex w-[90%] items-center justify-between bg-white px-4 py-3">
          <div className="hidden items-center space-x-2 md:flex">
            <Image
              src="/images/logo_horizontal_bg_white.jpg"
              alt="cyanlates"
              width={150}
              height={30}
            />
          </div>
          <ul className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path || "#"}
                  className={`flex items-center gap-2 rounded p-3 font-medium hover:bg-cyan-100 ${isActive(item.path || "#") ? "bg-cyan-100" : " "}`}
                >
                  <span className="w-[30px]">{item.icon}</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <ul className="fixed bottom-0 z-50 flex w-full justify-around border-t bg-white py-2 md:hidden">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path || "#"}
              className={`flex flex-col items-center text-sm text-gray-700 hover:text-cyan-500`}
            >
              <span
                className={`w-[30px] ${isActive(item.path || "#") ? "text-cyan-500" : ""}`}
              >
                {item.icon}
              </span>
              <p
                className={`${isActive(item.path || "#") ? "text-cyan-500" : ""}`}
              >
                {item.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
