import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableMembership from '@/components/tables/TableMembership';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Detail Membership",
  description:
    "Manage your membership detail",
  icons: {
    icon: '/favicon.ico',
  },
};
export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Detail Membership" />
      <div className="">
        <TableMembership/>
      </div>
    </>
  )
}
