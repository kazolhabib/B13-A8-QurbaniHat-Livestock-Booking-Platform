import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fcfcfc] px-5 py-20">
      <div className="max-w-2xl w-full text-center space-y-10">
        {/* Animated 404 Visual */}
        <div className="relative inline-block">
          <h1 className="text-[120px] md:text-[200px] font-black text-[#253237]/5 leading-none select-none italic tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FFCC4D] rounded-[32px] rotate-12 flex items-center justify-center shadow-2xl animate-pulse">
                <Search className="w-12 h-12 md:w-16 md:h-16 text-[#253237] -rotate-12" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#253237] rounded-full flex items-center justify-center text-[#FFCC4D] font-bold text-xl shadow-lg border-4 border-white">
                ?
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-[#253237] uppercase tracking-tight italic">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-400 font-medium text-lg max-w-md mx-auto leading-relaxed">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or the link might be incorrect.
          </p>
          <p className="text-[#253237]/60 font-bold text-sm uppercase tracking-[0.2em]">
            Error Code: 404
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center pt-6">
          <Link
            href="/"
            className="w-full sm:w-auto px-12 py-5 bg-[#253237] text-white font-black uppercase tracking-widest text-xs rounded-[24px] hover:bg-[#FFCC4D] hover:text-[#253237] transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group"
          >
            <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
            Return to Homepage
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="pt-10">
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-gray-200"></span>
            <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em]">QurbaniHat Premium</span>
            <span className="w-12 h-[1px] bg-gray-200"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
