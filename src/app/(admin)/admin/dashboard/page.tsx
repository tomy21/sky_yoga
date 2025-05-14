import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import YogaTopUsersDonutChart from "@/components/ecommerce/YogaTopUsersDonutChart";

export const metadata: Metadata = {
  title: "SKY YOGA | Dashboard Analityc",
  description: "SKY YOGA Admin Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Dashboard() {
  return (
    <div className="grid min-h-full grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <YogaTopUsersDonutChart />
      </div>
      {/* <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div> */}

      {/* <div className="col-span-12">
        <StatisticsChart />
      </div> */}

      {/* <div className="col-span-12 xl:col-span-12">
        <RecentOrders />
      </div> */}
      {/* <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}
    </div>
  );
}
