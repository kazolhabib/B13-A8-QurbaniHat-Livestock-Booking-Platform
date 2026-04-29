"use client";

import { CheckCircle2, Info, Star, ShieldCheck, HeartPulse, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import breedImg from "@/assets/hero_cow_1.png";

const QurbaniGuide = () => {
  const tips = [
    {
      title: "স্বাস্থ্য পরীক্ষা",
      desc: "পশুর চোখ উজ্জ্বল কিনা, চামড়া মসৃণ কিনা এবং চলাফেরা সপ্রতিভ কিনা তা নিশ্চিত করুন। অসুস্থ বা জখম পশু এড়িয়ে চলুন।",
      icon: <HeartPulse className="w-6 h-6 text-[#253237]" />,
    },
    {
      title: "বয়স যাচাই (দাঁত)",
      desc: "গরুর ক্ষেত্রে অন্তত ২ বছর (সামনের দুটি স্থায়ী দাঁত) এবং ছাগল বা ভেড়ার ক্ষেত্রে ১ বছর বয়স হতে হবে।",
      icon: <Scale className="w-6 h-6 text-[#253237]" />,
    },
    {
      title: "পরিচ্ছন্ন পরিবেশ",
      desc: "কুরবানির অন্তত ২ দিন আগে থেকে পশুকে পরিষ্কার, বাতাস চলাচল করে এমন জায়গায় রাখুন এবং তাজা ঘাস ও বিশুদ্ধ পানি দিন।",
      icon: <ShieldCheck className="w-6 h-6 text-[#253237]" />,
    },
  ];

  const breeds = [
    { name: "ব্রাহমান", features: "বিশাল দেহী, গরম সহনশীল এবং প্রিমিয়াম মাংসের জন্য পরিচিত।" },
    { name: "শাহীওয়াল", features: "শান্ত স্বভাবের এবং মাংস ও দুধ উভয় ক্ষেত্রেই জনপ্রিয় জাত।" },
    { name: "দেশি", features: "প্রাকৃতিক স্বাদে সেরা এবং সাধ্যের মধ্যে পছন্দের তালিকায় শীর্ষে।" },
    { name: "মীরকাদিম", features: "মুন্সিগঞ্জের বিখ্যাত সাদা জাত, যা অত্যন্ত সুস্বাদু ও নরম মাংসের জন্য পরিচিত।" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-[#f8f9fa]">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Side: Tips Content */}
          <div className="space-y-10 md:space-y-12">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] text-gray-400">
                Knowledge Base
              </h2>
              <h1 className="text-3xl md:text-5xl font-bold text-[#253237] leading-[1.1]">
                Essential Qurbani Tips <br className="hidden md:block" /> & Expert Guide
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                Preparing for Qurbani requires knowledge and care. We've compiled 
                expert advice to help you select and care for your sacrifice.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 md:gap-6 p-5 md:p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-[#253237]/5 rounded-2xl flex items-center justify-center group-hover:bg-[#FFCC4D] transition-colors duration-300">
                    {tip.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-bold text-[#253237]">{tip.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Top Breeds / Image */}
          <div className="relative mt-8 lg:mt-0">
            {/* Main Visual */}
            <div className="relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[700px]">
              <Image 
                src={breedImg} 
                alt="Premium Breeds" 
                fill 
                className="object-cover object-top scale-[1.5] -translate-y-1/4"
              />
              {/* Floating Info Box */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/95 backdrop-blur-xl p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl space-y-4 md:space-y-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-[#FFCC4D] fill-[#FFCC4D]" />
                  <h3 className="text-lg md:text-xl font-black text-[#253237] uppercase tracking-tighter italic">সেরা জাতের পশু ২০২৪</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {breeds.map((breed, index) => (
                    <div key={index} className="space-y-1 p-2.5 md:p-3 bg-[#253237]/5 rounded-xl md:rounded-2xl border border-[#253237]/5">
                      <h4 className="font-bold text-[#253237] text-[11px] md:text-sm">{breed.name}</h4>
                      <p className="text-[9px] md:text-[10px] text-gray-500 leading-tight line-clamp-2 md:line-clamp-none">{breed.features}</p>
                    </div>
                  ))}
                </div>

                <Link href="/animals">
                  <button className="w-full py-3.5 md:py-4 bg-[#253237] text-white text-xs md:text-sm font-bold rounded-xl md:rounded-2xl hover:bg-[#FFCC4D] hover:text-[#253237] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                    <Info className="w-4 h-4" />
                    বিস্তারিত গাইড দেখুন
                  </button>
                </Link>
              </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -z-10 -top-5 -right-5 w-40 h-40 md:w-64 md:h-64 bg-[#FFCC4D]/20 rounded-full blur-[60px] md:blur-[100px]" />
            <div className="absolute -z-10 -bottom-5 -left-5 w-40 h-40 md:w-64 md:h-64 bg-[#253237]/10 rounded-full blur-[60px] md:blur-[100px]" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default QurbaniGuide;
