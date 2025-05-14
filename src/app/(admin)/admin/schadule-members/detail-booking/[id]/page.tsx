"use client"

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TableBookings from '@/components/tables/TableBookings';
import { useParams } from 'next/navigation'
import React from 'react'

export default function DetailBooking() {
    const params = useParams();
    const id = params?.id;

    const scheduleId = parseInt(id?.toString() || "0");
  return (
    <>
      <PageBreadcrumb prevPageTitle='Schedule Class' prevPageUrl='/admin/schadule-members' pageTitle={`Detail Booking`} />
      <div className="">
        <TableBookings  scheduleId={scheduleId} />
      </div>
    </>
  )
}
