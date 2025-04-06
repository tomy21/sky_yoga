'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaInstagram, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { PiStarThin } from "react-icons/pi";
import ClientNavbar from '@/components/header/ClientNavbar';

export default function HomePage() {
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


  return (
    <>
    <ClientNavbar/>
      <main className="flex flex-col items-center min-h-screen bg-white text-gray-800">
      {/* Navbar */}

      {/* Hero Logo */}
      <section className="mt-5 text-center">
        <Image src="/images/logo_horizontal_bg_white.jpg" alt="skyyoga" width={300} height={150} />
      </section>

      {/* Gallery Slider */}
      <section className="mt-3 px-5 w-full max-w-3xl">
        <Slider {...settings}>
        {["studio_1.jpg", "studio_2.jpg", "studio_3.jpg", "studio_4.jpg"].map((img, i) => (
          <div key={i} className="px-2">
            <Image
              src={`/images/${img}`}
              alt={`Studio ${i + 1}`}
              width={800}
              height={500}
              className="rounded-2xl object-cover w-full h-[300px] md:h-[500px]"
            />
          </div>
        ))}
      </Slider>
      </section>

      {/* Mobile Bottom Navbar */}
      

      {/* Footer */}
      <footer className="mt-10 w-[90%] py-3 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-2 text-sm text-cyan-700">
        <div className="flex flex-col gap-2 items-center justify-center bg-cyan-300 rounded p-2">
          <FaLocationDot size={20}/>
          <p className='text-[10px] md:text-sm sm:text-md'>Location</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center bg-cyan-300 rounded p-2">
          <FaWhatsapp size={20} />
          <p className='text-[10px] md:text-sm sm:text-md'>Chat admin</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center bg-cyan-300 rounded p-2">
          <FaInstagram size={20}/>
          <p className='text-[10px] md:text-sm sm:text-md'>Instagram</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center bg-cyan-300 rounded p-2">
          <PiStarThin size={20}/>
          <p className='text-[10px] md:text-sm sm:text-md'>Give Review</p>
        </div>
      </footer>

      {/* Register Button */}
      <div className="w-full md:w-1/2 flex justify-center mt-5 px-4">
        <button className="bg-cyan-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-cyan-600 transition w-full">
          Register now for new member
        </button>
      </div>
    </main>
    </>
  );
}
