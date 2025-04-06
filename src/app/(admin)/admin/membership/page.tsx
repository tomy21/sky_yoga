import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableMembership from '@/components/tables/TableMembership';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Manage your membership",
  // other metadata
};
export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Membership" />
      <div className="">
        <TableMembership/>
      </div>
    </>
  )
}
