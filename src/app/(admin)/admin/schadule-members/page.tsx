
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableSchadule from '@/components/tables/TableSchaduleMembers';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Schedule Class",
  description:
    "Manage your schadule membership",
  icons: {
    icon: '/favicon.ico',
  },
};
export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Schedule Class" />
      <div className="">
        <TableSchadule/>
      </div>
    </>
  )
}
