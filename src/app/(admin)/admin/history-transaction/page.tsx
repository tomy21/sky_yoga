import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableHistoryTransaction from '@/components/tables/TableHistoryTransaction';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "History Transaction",
    description:
      "Monitoring history transaction customer",
    icons: {
      icon: '/favicon.ico',
    },
  };

export default function page() {
  return (
    <>
      <PageBreadcrumb pageTitle="History Transaction" />
      <div className="">
        <TableHistoryTransaction/>
      </div>
    </>
  )
}
