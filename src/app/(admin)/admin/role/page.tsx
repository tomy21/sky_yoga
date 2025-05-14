import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import TableRole from '@/components/tables/TableRoleMaster'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Role Master",
  description:
    "Manage your role",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function page() {
  return (
    <div>
        <PageBreadcrumb pageTitle="Role Master" />
        <div className="">
            <TableRole/>
        </div>
    </div>
  )
}
