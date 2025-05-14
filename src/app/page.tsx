import { Metadata } from "next";
import React from "react";
import HomePageCustomer from "./page-customer/HomePageCustomer/page";

export const metadata: Metadata = {
  title: "SKY YOGA | Kelas Yoga & Meditasi untuk Relaksasi dan Kesehatan",
  description:
    "SKY YOGA adalah tempat terbaik untuk mengikuti kelas yoga dan meditasi. Temukan ketenangan, tingkatkan fleksibilitas, dan capai keseimbangan tubuh serta pikiran bersama instruktur profesional kami.",
};

export default function HomePage() {
  return (
    <div className="max-h-screen">
      <HomePageCustomer />
    </div>
  );
}
