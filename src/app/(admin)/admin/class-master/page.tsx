import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableClassMaster from '@/components/tables/TableClassMaster';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Class Master",
  description:
    "Manage your class",
  icons: {
    icon: '/favicon.ico',
  },
};
export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Class Master" />
      <div className="">
        <TableClassMaster/>
      </div>
    </>
  )
}
