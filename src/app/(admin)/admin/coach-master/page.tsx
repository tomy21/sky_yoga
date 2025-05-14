import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableCoachMaster from '@/components/tables/TableCoachMaster';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Coach Master",
  description:
    "Manage your coach",
  icons: {
    icon: '/favicon.ico',
  },
};
export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Coach Master" />
      <div className="">
        <TableCoachMaster/>
      </div>
    </>
  )
}
