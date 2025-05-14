import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6 bg-white dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col dark:bg-gray-900 sm:p-0">
          {children}

          {/* Side Background with Overlay */}
          <div className="lg:w-1/2 w-full h-full relative hidden lg:grid place-items-center">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/images/studio_1.jpg')] bg-cover bg-center" />
            
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* GridShape and Logo content */}
            <div className="relative z-10 flex flex-col items-center text-white space-y-6 px-6">
              <GridShape />

              <Image
                width={300}
                height={60}
                src="/images/logo_horizontal_bg_white-removebg-preview.png"
                alt="Logo"
                className="drop-shadow-lg"
              />

              <p className="text-center text-white/80 text-lg">
                Dashboard <span className="font-semibold text-white">SKY YOGA</span> Admin
              </p>
            </div>
          </div>

          {/* Theme Toggler */}
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
