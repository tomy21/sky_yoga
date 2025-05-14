import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { Metadata } from 'next';
import React from 'react'
import LayoutOverview from '../../(others-pages)/CardAdmin/OverviewCard/Page';

export const metadata: Metadata = {
  title: "Overview | SKY Yoga",
  description:
    "Overview admin SKY Yoga",
  icons: {
    icon: '/favicon.ico',
  },
};


export default function Overview() {
  return (
    <>
      <PageBreadcrumb pageTitle="Overview" />
      <LayoutOverview/>
    </>
  )
}
