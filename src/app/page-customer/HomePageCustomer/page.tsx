"use client";
import ClientNavbar from "@/components/header/ClientNavbar";
import { useLogin } from "@/hooks/useAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Link from "next/link";
import { FaInstagram, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { PiStarThin } from "react-icons/pi";
import Modal from "@/components/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const [login, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [identify, setIdentify] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: loginMutation } = useLogin();
  const [token, setToken] = useState("");

  const route = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0px",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenRefresh = Cookies.get("tokenCustomer");
      setToken(tokenRefresh || "");
      if (token) {
        try {
          // const decoded: jwtPayload = jwtDecode(tokenRefresh || "");
          // setUser(decoded);
          setIsLoggedIn(true);
        } catch (error) {
          console.log(error);
          setIsLoggedIn(false); // Jika token tidak valid, logout
        }
      } else {
        setIsLoggedIn(false); // Jika tidak ada token, logout
      }
    }
  }, [token]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginMutation({ identify, password, remember });

      if (response.code === 210200) {
        Cookies.set("tokenCustomer", response.token, {
          expires: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 1 hari
          secure: true,
          sameSite: "Lax",
        });
        setToken(response.token);
        localStorage.setItem("userCustomer", JSON.stringify(response.user));
        setIsLoggedIn(true);
        setShowLoginModal(false);
        toast.success("Login berhasil");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Terjadi kesalahan pada server";
        toast.error(message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ClientNavbar />
      <main className="container m-auto flex max-h-screen w-full flex-col items-center bg-white text-gray-800 sm:w-1/2 md:w-1/2">
        {/* Navbar */}

        {/* Hero Logo */}
        <section className="text-center">
          <Image
            src="/images/logo_horizontal_bg_white.jpg"
            alt="skyyoga"
            width={300}
            height={150}
          />
        </section>

        {/* Gallery Slider */}
        <section className="mt-3 w-full max-w-3xl px-5">
          <Slider {...settings}>
            {["studio_1.jpg", "studio_2.jpg", "studio_3.jpg"].map((img, i) => (
              <div key={i} className="px-2">
                <Image
                  src={`/images/${img}`}
                  alt={`Studio ${i + 1}`}
                  width={200}
                  height={200}
                  className="h-[400px] w-full rounded-2xl object-cover md:h-[400px]"
                />
              </div>
            ))}
          </Slider>
        </section>

        {/* Mobile Bottom Navbar */}

        {/* Footer */}
        <div className="mt-10 grid w-[90%] grid-cols-4 gap-2 py-3 text-sm text-cyan-700 sm:grid-cols-2 md:grid-cols-2">
          <Link href="https://maps.app.goo.gl/qJtLrAoXnx3rWPnL7?g_st=iw">
            <div className="flex flex-col items-center justify-center gap-2 rounded bg-cyan-300 p-2">
              <FaLocationDot size={20} />
              <p className="sm:text-md text-[10px] md:text-sm">Location</p>
            </div>
          </Link>
          <Link href="https://wa.me/6287819996751">
            <div className="flex flex-col items-center justify-center gap-2 rounded bg-cyan-300 p-2">
              <FaWhatsapp size={20} />
              <p className="sm:text-md text-[10px] md:text-sm">Chat admin</p>
            </div>
          </Link>
          <Link href={"https://www.instagram.com/skyyoga.id/"}>
            <div className="flex flex-col items-center justify-center gap-2 rounded bg-cyan-300 p-2">
              <FaInstagram size={20} />
              <p className="sm:text-md text-[10px] md:text-sm">Instagram</p>
            </div>
          </Link>
          <Link href="https://maps.app.goo.gl/qJtLrAoXnx3rWPnL7?g_st=iw">
            <div className="flex flex-col items-center justify-center gap-2 rounded bg-cyan-300 p-2">
              <PiStarThin size={20} />
              <p className="sm:text-md text-[10px] md:text-sm">Give Review</p>
            </div>
          </Link>
        </div>

        {/* Register Button */}
        {!login ? (
          <div className="flex w-[90%] flex-col items-center gap-2 md:flex-row md:space-x-2">
            <div className="flex w-full justify-center sm:w-1/2 md:w-full">
              <button
                onClick={() => route.push("/register")}
                className="w-full rounded-md bg-cyan-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
              >
                Register now for new member
              </button>
            </div>
            <div className="flex w-full justify-center sm:w-1/2 md:w-full">
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full rounded-md bg-cyan-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
              >
                Login as member
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 flex w-full justify-center px-4 md:w-1/2">
            <button
              onClick={() => setShowBarcodeModal(true)}
              className="w-full rounded-md bg-green-500 px-8 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              Attendance Show Barcode
            </button>
          </div>
        )}
      </main>
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <h2 className="mb-4 text-center text-lg font-semibold">Login Member</h2>

        {/* Username or Email */}
        <input
          type="text"
          placeholder="Enter username or email"
          value={identify}
          onChange={(e) => setIdentify(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />

        {/* Remember Me & Forgot Password */}
        <div className="mb-5 flex items-center justify-between text-sm text-gray-600">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              className="form-checkbox accent-cyan-600"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <button
            className="text-cyan-600 hover:underline"
            onClick={() => alert("Redirect to forgot password page")}
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full rounded bg-cyan-600 py-2 text-white transition hover:bg-cyan-700"
        >
          {loading ? "Loading . . ." : "Login"}
        </button>
      </Modal>

      <Modal
        isOpen={showBarcodeModal}
        onClose={() => setShowBarcodeModal(false)}
      >
        <h2 className="mb-4 text-center text-lg font-semibold">
          Barcode Member
        </h2>
        {/* Ganti ini dengan QR/barcode member */}
        {token ? (
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={token}
            viewBox={`0 0 256 256`}
          />
        ) : (
          <p>Tidak ada token ditemukan.</p>
        )}
      </Modal>
    </>
  );
}
