"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowUpDown, MapPin, Scale, Calendar, Tag } from "lucide-react";
import { toast } from "react-toastify";

import qurbaniBanner from "@/assets/qurbani-banner.png";

const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setFilteredAnimals(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...animals];

    // Search filter
    if (searchTerm) {
      result = result.filter((animal) =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort logic
    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredAnimals(result);
  }, [searchTerm, sortOrder, animals]);

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20">
      {/* Page Header */}
      <div className="relative h-[200px] md:h-[300px] flex items-center justify-center mb-10 overflow-hidden">
        {/* Banner Image */}
        <Image
          src={qurbaniBanner}
          alt="Explore All Animals Banner"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-[1360px] mx-auto text-center space-y-4 px-5">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white">
            Explore All Animals
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-lg font-medium">
            Find your perfect Qurbani animal from our verified collection of premium
            livestock across Bangladesh.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-20">
        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white/80 p-6 rounded-3xl shadow-sm border border-gray-100">
          {/* Search Box */}
          <div className="relative w-full md:w-[300px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#253237] transition-colors" />
            <input
              type="text"
              placeholder="Search by name or breed..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent focus:border-[#253237] rounded-xl outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-between gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-wider">
              <ArrowUpDown className="w-4 h-4" />
              Sort By:
            </div>
            <select
              className="bg-gray-50 border border-transparent focus:border-[#253237] px-6 py-3.5 rounded-xl outline-none text-sm font-bold text-[#253237] cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm font-medium">
            Showing <span className="text-[#253237] font-bold">{filteredAnimals.length}</span> animals found
          </p>
        </div>

        {/* Animals Grid / Loading Spinner */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#253237] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredAnimals.map((animal) => (
              <div
                key={animal.id}
                className="group bg-white rounded-3xl border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-[300px] overflow-hidden">
                  <div className={`absolute inset-0 w-full h-full ${animal.id === 6 ? "-scale-x-100" : ""}`}>
                    <Image
                      src={animal.image}
                      alt={animal.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-[#253237]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {animal.category}
                    </span>
                  </div>
                  {/* Location Badge */}
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl text-[#253237] text-[10px] font-bold shadow-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {animal.location}
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 space-y-6 flex-grow flex flex-col">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-[#253237] leading-tight">
                      {animal.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase">
                      <Tag className="w-3 h-3" />
                      {animal.breed}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Scale className="w-3 h-3" /> Weight
                      </span>
                      <span className="text-sm font-bold text-[#253237]">{animal.weight} kg</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Age
                      </span>
                      <span className="text-sm font-bold text-[#253237]">{animal.age}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Asking Price</span>
                      <span className="text-2xl font-black text-[#253237]">৳ {animal.price.toLocaleString()}</span>
                    </div>
                    <Link href={`/animals/${animal.id}`} onClick={() => toast.info("Loading animal details...")}>
                      <button className="px-8 py-3.5 bg-[#253237] text-white text-xs font-bold uppercase rounded-full hover:bg-[#FFCC4D] hover:text-[#253237] transition-all duration-300 shadow-lg cursor-pointer">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAnimals.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-400">No animals found matching your search</h2>
            <button
              onClick={() => { setSearchTerm(""); setSortOrder("default"); }}
              className="text-[#253237] font-bold underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalsPage;
