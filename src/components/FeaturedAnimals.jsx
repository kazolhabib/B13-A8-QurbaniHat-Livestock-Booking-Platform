"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { ArrowRight, Plus, Scale, MapPin, Tag } from "lucide-react";

const FeaturedAnimals = () => {
  const [featuredAnimals, setFeaturedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => {
        // Show first 4 animals as featured
        setFeaturedAnimals(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured animals:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-12 h-12 border-4 border-[#253237] border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <section className="py-20 px-5 md:px-10 lg:px-20 bg-white">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-8 animate__animated animate__fadeInDown">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[2px] bg-[#FFCC4D]"></span>
              <span className="text-[10px] text-[#253237] font-black uppercase tracking-[0.3em]">Premium Collection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#253237] uppercase italic tracking-tighter">
              Featured <span className="text-gray-300">Selection</span>
            </h2>
            <p className="text-gray-500 max-w-xl text-sm md:text-base font-medium">
              Handpicked premium livestock from the best farms across the country.
              Each animal is certified for health and quality standards.
            </p>
          </div>
          <Link href="/animals">
            <button className="px-8 py-4 bg-[#253237] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#FFCC4D] hover:text-[#253237] transition-all duration-500 group flex items-center gap-3 shadow-xl">
              View All Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredAnimals.map((animal, idx) => (
            <div 
              key={animal.id} 
              className={`group flex flex-col bg-white rounded-3xl border border-gray-100/50 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden animate__animated animate__fadeInUp`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={animal.image}
                  alt={animal.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Tag/Category */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[#253237] text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm border border-gray-100/50">
                    {animal.category}
                  </span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#253237]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 space-y-6 flex-grow flex flex-col">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <Tag className="w-4 h-4" /> {animal.breed}
                  </div>
                  <h3 className="text-2xl font-black text-[#253237] leading-tight capitalize">
                    {animal.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-50">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5" /> Weight
                    </span>
                    <span className="text-sm font-black text-[#253237]">{animal.weight} KG</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Origin
                    </span>
                    <span className="text-sm font-black text-[#253237]">{animal.location}</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Price</span>
                    <span className="text-2xl font-black text-[#253237]">৳ {animal.price.toLocaleString()}</span>
                  </div>
                  <Link href={`/animals/${animal.id}`} onClick={() => toast.success(`Viewing details of ${animal.name}`)}>
                    <button className="w-12 h-12 bg-[#253237] text-white rounded-2xl flex items-center justify-center hover:bg-[#FFCC4D] hover:text-[#253237] transition-all duration-500 shadow-lg cursor-pointer group-hover:rotate-90">
                      <Plus className="w-6 h-6" />
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

