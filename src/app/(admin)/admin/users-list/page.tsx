
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableUserAccount from '@/components/tables/TableUserAccount';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Users Account",
  description:
    "Manage your user account",
  icons: {
    icon: '/favicon.ico',
  },
};
export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Users Account" />
      <div className="">
        <TableUserAccount/>
      </div>
    </>
  )
}
