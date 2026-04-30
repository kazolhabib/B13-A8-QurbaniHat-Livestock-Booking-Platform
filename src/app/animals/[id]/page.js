"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Scale, Calendar, Tag, CheckCircle2, ShieldCheck, HeartPulse } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const AnimalDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Auth state
  const { data: session, isPending } = authClient.useSession();

  // Booking form state
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Fetch animal data
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => {
        const foundAnimal = data.find((a) => a.id === parseInt(id));
        setAnimal(foundAnimal);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching animal details:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Pre-fill user data if logged in
    if (session?.user) {
      setBookingData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingLoading(true);

    // Simulate API call for booking
    setTimeout(() => {
      setBookingLoading(false);
      toast.success("Booking Request Sent Successfully!");
      router.push("/animals");
    }, 1500);
  };

  if (loading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="w-16 h-16 border-4 border-[#253237] border-t-[#FFCC4D] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-400">Animal not found</h2>
          <Link href="/animals" className="text-[#253237] font-bold underline">Back to All Animals</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20 pt-24">
      <div className="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-20">
        {/* Breadcrumb */}
        <Link
          href="/animals"
          className="inline-flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-10 hover:text-[#253237] transition-all group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Verified Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Visuals & Primary Info */}
          <div className="lg:col-span-7 space-y-10">
            {/* Image Showcase */}
            <div className="relative rounded-[48px] overflow-hidden bg-white shadow-2xl border border-gray-100 aspect-video md:aspect-[16/10] group">
              <Image
                src={animal.image}
                alt={animal.name}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Badges on Image */}
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <span className="px-5 py-2 bg-white/90 backdrop-blur-xl text-[#253237] text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
                  {animal.category}
                </span>
                <span className="px-5 py-2 bg-[#253237]/90 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFCC4D]" /> Verified Animal
                </span>
              </div>
            </div>

            {/* Comprehensive Details Section */}
            <div className="bg-white rounded-[48px] p-10 md:p-14 shadow-sm border border-gray-50 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-[2px] bg-[#FFCC4D]"></span>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">{animal.type} Specimen</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-[#253237] uppercase leading-[0.9] italic tracking-tighter">
                    {animal.name}
                  </h1>
                </div>
                <div className="flex items-center gap-3 bg-[#fcfcfc] px-6 py-3 rounded-2xl border border-gray-50">
                  <MapPin className="w-5 h-5 text-[#FFCC4D]" />
                  <span className="text-sm font-bold text-[#253237]">{animal.location}, Bangladesh</span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Breed
                  </p>
                  <p className="text-lg font-black text-[#253237]">{animal.breed}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Scale className="w-4 h-4" /> Live Weight
                  </p>
                  <p className="text-lg font-black text-[#253237]">{animal.weight} KG</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Age
                  </p>
                  <p className="text-lg font-black text-[#253237]">{animal.age}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Health Status
                  </p>
                  <p className="text-lg font-black text-green-600 uppercase">Excellent</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-5 pt-6 border-t border-gray-100">
                <h3 className="text-xl font-black text-[#253237] uppercase tracking-wide">Animal Description</h3>
                <p className="text-gray-500 leading-relaxed text-lg font-medium">
                  {animal.description}
                </p>
              </div>

              {/* Features Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { icon: HeartPulse, label: "Medical Checkup", desc: "100% Certified", color: "text-rose-500" },
                  { icon: ShieldCheck, label: "Secure Handling", desc: "Trusted Process", color: "text-green-500" },
                  { icon: Tag, label: "Best Value", desc: "Premium Grade", color: "text-orange-500" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-50/50 hover:border-gray-100 transition-all duration-300">
                    <div className={`w-10 h-10 shrink-0 bg-white rounded-xl flex items-center justify-center ${feature.color} shadow-sm border border-gray-50`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-[#253237] uppercase tracking-tight whitespace-nowrap">{feature.label}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase whitespace-nowrap">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Booking Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              {/* Pricing Card */}
              <div className="bg-[#253237] rounded-[48px] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <p className="text-[#FFCC4D] font-black uppercase tracking-[0.4em] text-[10px]">Asking Price</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black italic tracking-tighter">৳ {animal.price.toLocaleString()}</span>
                      <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Fixed</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 text-gray-400 text-xs font-bold uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> 
                      No hidden charges
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-xs font-bold uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> 
                      Free doorstep delivery in {animal.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Card */}
              <div className="bg-white rounded-[48px] p-10 md:p-12 shadow-xl border border-gray-100">
                {!session ? (
                  <div className="text-center space-y-8">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-10 h-10 text-[#253237]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-[#253237] uppercase tracking-tight">Login Required</h4>
                      <p className="text-sm text-gray-400 font-medium leading-relaxed">To ensure secure transactions, please log in to your account before booking.</p>
                    </div>
                    <Link href="/login">
                      <button 
                        onClick={() => toast.info("Please login first to book an animal!")}
                        className="w-full py-5 bg-[#253237] text-white font-black uppercase tracking-widest text-xs rounded-[20px] hover:bg-[#FFCC4D] hover:text-[#253237] transition-all duration-500 shadow-xl cursor-pointer"
                      >
                        Authorize & Book Now
                      </button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-8">
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-2">
                      <div className="w-10 h-[2px] bg-[#FFCC4D]"></div>
                      <h4 className="text-xl font-black text-[#253237] uppercase tracking-widest italic">Booking Form</h4>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-[#253237] focus:ring-0 transition-all bg-gray-50/50 text-sm font-bold text-[#253237]"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Email</label>
                        <input
                          type="email"
                          required
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-[#253237] focus:ring-0 transition-all bg-gray-50/50 text-sm font-bold text-[#253237]"
                          placeholder="Your email address"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-[#253237] focus:ring-0 transition-all bg-gray-50/50 text-sm font-bold text-[#253237]"
                            placeholder="01XXXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Delivery Address</label>
                          <textarea
                            required
                            rows="3"
                            value={bookingData.address}
                            onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-[#253237] focus:ring-0 transition-all bg-gray-50/50 text-sm font-bold text-[#253237] resize-none"
                            placeholder="Your complete delivery address"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full py-5 bg-[#FFCC4D] text-[#253237] text-sm font-black uppercase tracking-[0.2em] rounded-[24px] hover:bg-[#253237] hover:text-[#FFCC4D] transition-all duration-500 disabled:opacity-70 flex justify-center items-center shadow-xl group"
                    >
                      {bookingLoading ? (
                        <div className="w-6 h-6 border-4 border-[#253237] border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span className="flex items-center gap-3">
                          Confirm Reservation
                          <ShieldCheck className="w-5 h-5" />
                        </span>
                      )}
                    </button>
                    <p className="text-center text-[9px] text-gray-400 font-black uppercase tracking-widest">Guaranteed Secure Booking Process</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;
