
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableSchadule from '@/components/tables/TableSchaduleMembers';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Schadule Membership",
  description:
    "Manage your schadule membership",
  // other metadata
};
export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Schadule Membership" />
      <div className="">
        <TableSchadule/>
      </div>
    </>
  )
}
