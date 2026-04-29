"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Scale, Calendar, Tag, CheckCircle2, ShieldCheck, HeartPulse } from "lucide-react";
import { authClient } from "@/lib/auth-client";

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
      setToastMessage("Booking confirmed successfully! Our team will contact you soon.");
      setBookingData({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        address: "",
      });

      // Clear toast after 4s
      setTimeout(() => setToastMessage(""), 4000);
    }, 1500);
  };

  if (loading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="w-16 h-16 border-4 border-[#253237] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] space-y-4">
        <h2 className="text-3xl font-black text-[#253237]">Animal Not Found</h2>
        <Link href="/animals" className="text-[#FFCC4D] font-bold hover:underline">
          Go back to All Animals
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-12 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1360px] mx-auto">
        <Link href="/animals" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#253237] transition-colors font-bold text-sm mb-8 group">
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to All Animals
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Animal Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Image Section */}
            <div className="relative rounded-[40px] overflow-hidden bg-white shadow-sm border border-gray-100 aspect-video md:aspect-[4/3] w-full">
              <Image
                src={animal.image}
                alt={animal.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-[#253237]/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full">
                  {animal.category}
                </span>
              </div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-[#FFCC4D]/90 backdrop-blur-md text-[#253237] text-xs font-bold rounded-full">
                  ID: #{animal.id}
                </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-gray-100 space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-[#253237] uppercase leading-tight italic mb-2">
                  {animal.name}
                </h1>
                <p className="text-gray-500 text-lg">{animal.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-gray-100">
                <div className="space-y-1">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Breed</div>
                  <div className="text-[#253237] font-bold">{animal.breed}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Scale className="w-3.5 h-3.5" /> Weight</div>
                  <div className="text-[#253237] font-bold">{animal.weight} kg</div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Age</div>
                  <div className="text-[#253237] font-bold">{animal.age}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Location</div>
                  <div className="text-[#253237] font-bold">{animal.location}</div>
                </div>
              </div>

              {/* Badges/Features */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#253237]/5 text-[#253237] rounded-xl text-sm font-bold">
                  <ShieldCheck className="w-5 h-5 text-green-600" /> Fully Vaccinated
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#253237]/5 text-[#253237] rounded-xl text-sm font-bold">
                  <HeartPulse className="w-5 h-5 text-rose-500" /> 100% Healthy
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#253237]/5 text-[#253237] rounded-xl text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#FFCC4D]" /> Verified Seller
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-gray-100 sticky top-24">
              <div className="space-y-2 mb-8">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Price</p>
                <h3 className="text-4xl font-black text-[#253237]">৳ {animal.price.toLocaleString()}</h3>
              </div>

              {!session ? (
                <div className="bg-[#f8f9fa] p-8 rounded-3xl text-center space-y-6">
                  <div className="w-16 h-16 bg-[#253237]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-[#253237]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-[#253237]">Login Required</h4>
                  <p className="text-sm text-gray-500">You need to be logged in to book this animal.</p>
                  <Link href="/login">
                    <button className="w-full py-4 bg-[#253237] text-white font-bold rounded-xl hover:bg-[#FFCC4D] hover:text-[#253237] transition-all duration-300">
                      Login to Book
                    </button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <h4 className="text-xl font-black text-[#253237] uppercase tracking-wide border-b border-gray-100 pb-4 mb-6">
                    Booking Details
                  </h4>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#253237] focus:ring-1 focus:ring-[#253237] transition-colors bg-gray-50"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#253237] focus:ring-1 focus:ring-[#253237] transition-colors bg-gray-50"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#253237] focus:ring-1 focus:ring-[#253237] transition-colors bg-gray-50"
                      placeholder="Your Contact Number"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivery Address</label>
                    <textarea
                      required
                      rows={3}
                      value={bookingData.address}
                      onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#253237] focus:ring-1 focus:ring-[#253237] transition-colors bg-gray-50 resize-none"
                      placeholder="Full Delivery Address"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full py-4 mt-4 bg-[#FFCC4D] text-[#253237] text-lg font-black uppercase rounded-xl hover:bg-[#253237] hover:text-[#FFCC4D] transition-all duration-300 disabled:opacity-70 flex justify-center shadow-lg"
                  >
                    {bookingLoading ? (
                      <span className="w-6 h-6 border-4 border-[#253237] border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 font-medium">No payment required until delivery.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {toastMessage && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success bg-[#253237] text-[#FFCC4D] border-none shadow-xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalDetails;
