import { Metadata } from 'next';
import React from 'react'
import SchadulePage from '../page-customer/Schadule/page';

export const metadata: Metadata = {
  title: "SKY YOGA | Your Schadule",
  description:
    "SKY YOGA adalah tempat terbaik untuk mengikuti kelas yoga dan meditasi. Temukan ketenangan, tingkatkan fleksibilitas, dan capai keseimbangan tubuh serta pikiran bersama instruktur profesional kami.",
};

export default function page() {
  return (
    <div className="max-h-screen">
      <SchadulePage/>
    </div>
  )
}
