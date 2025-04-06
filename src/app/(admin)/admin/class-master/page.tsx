import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableClassMaster from '@/components/tables/TableClassMaster';
import { Table } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Class Master",
  description:
    "Manage your class",
  // other metadata
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
