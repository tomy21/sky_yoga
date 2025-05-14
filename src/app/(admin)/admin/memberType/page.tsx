
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TableMemberType from "@/components/tables/TableMemberType";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Type Membership",
    description:
      "Manage your type membership",
    icons: {
      icon: '/favicon.ico',
    },
  };
  export default function Page() {
    return (
      <>
        <PageBreadcrumb pageTitle="Type Membership" />
        <div className="">
          <TableMemberType/>
        </div>
      </>
    )
  }