import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SKY YOGA | Welcome to dashboard admin",
  description: "SKY YOGA ADMIN DASHBOARD PAGE",
};

export default function SignIn() {
  return <SignInForm />;
}
