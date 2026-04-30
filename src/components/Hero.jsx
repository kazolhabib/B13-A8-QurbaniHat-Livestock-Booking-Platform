"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import qurbaniImg1 from "@/assets/qurbani-img-01.png";
import qurbaniImg2 from "@/assets/qurbani-img-02.png";
import qurbaniImg3 from "@/assets/qurbani-img-03.png";
import qurbaniImg4 from "@/assets/qurbani-img-04.png";
import qurbaniImg5 from "@/assets/qurbani-img-05.png";
import qurbaniImg6 from "@/assets/qurbani-img-06.png";
import qurbaniImg7 from "@/assets/qurbani-img-07.png";
import qurbaniImg8 from "@/assets/qurbani-img-08.png";

const slides = [
  {
    id: 1,
    title: "HALAL & SAFE QURBANI",
    subtitle: "NATURALLY GROWN WITH LOVE AND COMPASSION",
    description: "Celebrating EID UL AZHA Responsibly",
    image: qurbaniImg1,
  },
  {
    id: 2,
    title: "PREMIUM DESHI CATTLE",
    subtitle: "HEALTHY AND WELL-CARED FOR",
    description: "Book your Qurbani animal with confidence",
    image: qurbaniImg2,
  },
  {
    id: 3,
    title: "EASY ONLINE BOOKING",
    subtitle: "HASSLE-FREE PROCESS",
    description: "Delivering straight to your doorstep",
    image: qurbaniImg3,
  },
  {
    id: 4,
    title: "TOP QUALITY BREEDS",
    subtitle: "CAREFULLY SELECTED FOR YOU",
    description: "Explore our wide range of premium livestock",
    image: qurbaniImg4,
  },
  {
    id: 5,
    title: "100% ORGANIC FEED",
    subtitle: "RAISED IN NATURAL ENVIRONMENT",
    description: "Ensuring the best health for the animals",
    image: qurbaniImg5,
  },
  {
    id: 6,
    title: "VETERINARY CHECKED",
    subtitle: "CERTIFIED HEALTHY LIVESTOCK",
    description: "Your peace of mind is our priority",
    image: qurbaniImg6,
  },
  {
    id: 7,
    title: "SECURE PAYMENTS",
    subtitle: "MULTIPLE PAYMENT OPTIONS",
    description: "Book easily and securely online",
    image: qurbaniImg7,
  },
  {
    id: 8,
    title: "DOORSTEP DELIVERY",
    subtitle: "SAFE AND TIMELY TRANSPORT",
    description: "We handle the logistics for you",
    image: qurbaniImg8,
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[450px] md:h-[700px] bg-[#EBEBEB] overflow-hidden">
      {/* Slider Container */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex items-center px-6 md:px-10 lg:px-20 transition-opacity duration-[1500ms] ease-in-out ${currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {/* Background Image with Overlay */}
            <div
              className={`absolute inset-0 z-0 transition-transform duration-[5000ms] ease-linear ${currentSlide === index ? "scale-105" : "scale-100"
                }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40 md:bg-transparent" />
            </div>

            {/* Text Content */}
            <div
              className={`w-full md:w-[70%] lg:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-5 ${
                currentSlide === index ? "animate__animated animate__fadeInUp opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-[10px] md:text-sm font-semibold tracking-[0.2em] text-white/80 md:text-gray-600 uppercase italic">
                {slide.subtitle}
              </h3>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-[1.1] font-bold text-white md:text-[#253237] uppercase">
                {slide.title}
              </h1>
              <p className="text-white/90 md:text-gray-700 text-sm md:text-base max-w-md md:max-w-none">
                {slide.description}
              </p>

              <Link href="/animals" className="mt-2 md:mt-4">
                <button className="bg-white text-[#253237] md:bg-[#253237] md:text-white px-7 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-xl hover:bg-transparent hover:text-white md:hover:text-[#253237] border-2 border-white md:border-[#253237] hover:border-[#ffcc4d] transition-all duration-300 text-xs md:text-base tracking-widest cursor-pointer">
                  Explore All Animals
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 bg-[#253237]" : "w-2.5 bg-gray-400 hover:bg-[#253237]/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
