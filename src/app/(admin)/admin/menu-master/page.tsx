import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableMenu from '@/components/tables/TableMenu';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Menu Master",
  description:
    "Manage your menu",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function page() {
  return (
    <div>
        <PageBreadcrumb pageTitle="Menu Master" />
        <div className="">
            <TableMenu/>
        </div>
    </div>
  )
}
