import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableMembershipTrx from '@/components/tables/TableMembershipTrx';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Membership",
    description:
      "Manage your membership",
    icons: {
      icon: '/favicon.ico',
    },
  };

export default function page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Membership" />
      <div className="">
        <TableMembershipTrx/>
      </div>
    </>
  )
}
