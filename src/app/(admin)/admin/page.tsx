import SignIn from "@/app/(full-width-pages)/(auth)/signin/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | SKY Membership",
  description: "Login page for SKY Membership system",
};

export default function HOME() {
  <SignIn />;
}
