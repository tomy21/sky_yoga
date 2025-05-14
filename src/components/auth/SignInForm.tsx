"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useLogin } from "@/hooks/useAuth";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingModal from "../modal/LoadingModal";
import { AxiosError } from "axios";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [identify, setIdentify] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();

  const { mutateAsync: loginMutation } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!identify || !password) {
        toast.error("Semua field wajib diisi.");
        return;
      }
      const response = await loginMutation({
        identify,
        password,
        remember: isChecked,
      });

      if (response.code === 210200) {
        if (response.user.role !== "CUSTOMER") {
          localStorage.setItem("user", JSON.stringify(response.user));
          toast.success("Login berhasil");
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          response.user.role === "HO"
            ? route.push("/admin/dashboard")
            : route.push("/admin/overview");
        }

        if (response.user.role === "CUSTOMER") {
          toast.error("Maaf kamu tidak boleh akses halaman ini");
        }
      } else {
        console.log(response);
        toast.error(response.message);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data);
      }
      toast.error("Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="flex max-h-screen w-full flex-col md:h-screen lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div className="block md:hidden">
          <Image
            src="/images/logo_horizontal_bg_white.jpg"
            width={500}
            height={500}
            alt="signin"
          />
        </div>
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email or Username <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="info@gmail.com or username"
                    type="text"
                    onChange={(e) => setIdentify(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="text-theme-sm block font-normal text-gray-700 dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400 text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button type="submit" className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
