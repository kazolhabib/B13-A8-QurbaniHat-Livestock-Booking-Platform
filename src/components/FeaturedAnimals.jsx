"use client";

import Image from "next/image";
import Link from "next/link";
import img4 from "@/assets/qurbani-img-04.png";
import img5 from "@/assets/qurbani-img-05.png";
import img6 from "@/assets/qurbani-img-06.png";
import img7 from "@/assets/qurbani-img-07.png";

const featuredAnimals = [
  {
    id: 1,
    name: "Premium Brahman Bull",
    price: "৳ 1,85,000",
    weight: "420 kg",
    location: "Sirajganj",
    image: img4,
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Deshi Gabadi Cow",
    price: "৳ 1,20,000",
    weight: "310 kg",
    location: "Pabna",
    image: img5,
    tag: "Certified",
  },
  {
    id: 3,
    name: "Sahiwal Breed Master",
    price: "৳ 2,10,000",
    weight: "480 kg",
    location: "Kushtia",
    image: img6,
    tag: "Premium",
  },
  {
    id: 4,
    name: "Australian Hybrid Bull",
    price: "৳ 2,50,000",
    weight: "550 kg",
    location: "Rajshahi",
    image: img7,
    tag: "Limited Edition",
  },
];

const FeaturedAnimals = () => {
  return (
    <section className="py-20 px-5 md:px-10 lg:px-20 bg-white">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-block px-4 py-1.5 bg-[#253237]/5 text-[#253237] text-xs font-bold tracking-widest uppercase rounded-full">
              Premium Collection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#253237]">
              Featured Animals
            </h2>
            <p className="text-gray-500 max-w-xl">
              Handpicked premium livestock from the best farms across the country.
              Each animal is certified for health and quality.
            </p>
          </div>
          <Link href="/animals">
            <button className="px-8 py-4 border-2 border-[#253237] text-[#253237] font-bold rounded-xl hover:bg-[#253237] hover:text-white transition-all duration-300 group flex items-center gap-2">
              View All Collection
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredAnimals.map((animal) => (
            <div key={animal.id} className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              {/* Image Container */}
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src={animal.image}
                  alt={animal.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#253237] text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                    {animal.tag}
                  </span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#253237]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-[#253237] leading-tight min-h-[56px] flex items-center">
                    {animal.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Weight</span>
                    <span className="text-xs font-bold text-[#253237]">{animal.weight}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Origin</span>
                    <span className="text-xs font-bold text-[#253237]">{animal.location}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Asking Price</span>
                    <span className="text-2xl font-black text-[#253237]">{animal.price}</span>
                  </div>
                  <Link href={`/animals/${animal.id}`}>
                    <button className="w-12 h-12 bg-[#253237] text-white rounded-xl flex items-center justify-center hover:bg-[#FFCC4D] hover:text-[#253237] transition-all duration-300 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAnimals;
