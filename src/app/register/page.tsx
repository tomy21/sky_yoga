import React from "react";
import { Metadata } from "next";
import RegisterCustomerPage from "@/components/form/formadd/registerMembers";

export const metadata: Metadata = {
  title: "SKY YOGA | Register account",
  description:
    "SKY YOGA adalah tempat terbaik untuk mengikuti kelas yoga dan meditasi. Temukan ketenangan, tingkatkan fleksibilitas, dan capai keseimbangan tubuh serta pikiran bersama instruktur profesional kami.",
  // other metadata
};

export default function Page() {
  return (
    <>
      <div className="w-full rounded-xl bg-white p-6 shadow-md">
        <RegisterCustomerPage />
      </div>
    </>
  );
}
