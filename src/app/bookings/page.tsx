import React from 'react'
import BookingPage from '../page-customer/Booking/page'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SKY YOGA | Booking class favorite",
  description:
    "SKY YOGA adalah tempat terbaik untuk mengikuti kelas yoga dan meditasi. Temukan ketenangan, tingkatkan fleksibilitas, dan capai keseimbangan tubuh serta pikiran bersama instruktur profesional kami.",
};

export default function page() {
  return (
    <div className="max-h-screen">
      <BookingPage/>
    </div>
  )
}
