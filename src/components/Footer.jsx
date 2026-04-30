"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, Phone, MapPin, ArrowRight, Globe, Send, Share2, Link as LinkIcon } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#253237] text-white pt-14 md:pt-20 pb-10">
      <div className="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* About Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src={logo} 
                alt="QurbaniHat" 
                width={180} 
                height={50} 
                className="brightness-0 invert" 
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              QurbaniHat is Bangladesh's most trusted online marketplace for premium Qurbani livestock. 
              We ensure 100% organic, healthy, and verified animals delivered to your doorstep.
            </p>
            <div className="flex items-center gap-4">
              {[
                { name: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'Instagram', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01' },
                { name: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                { name: 'Linkedin', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z' }
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#FFCC4D] hover:text-[#253237] transition-all duration-300 group"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:scale-110"
                  >
                    {social.name === 'Instagram' && <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />}
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-black uppercase tracking-widest italic flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#FFCC4D]"></span>
              Quick Links
            </h4>
            <ul className="space-y-4">
              {["Home", "All Animals", "Our Farms", "Qurbani Guide", "Terms & Conditions"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "All Animals" ? "/animals" : "#"}
                    className="text-gray-400 text-sm font-bold hover:text-[#FFCC4D] hover:translate-x-2 transition-all flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-black uppercase tracking-widest italic flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#FFCC4D]"></span>
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <MapPin className="w-5 h-5 text-[#FFCC4D]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Office Location</p>
                  <p className="text-sm font-bold">123 Livestock Avenue, Gulshan, Dhaka</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5 text-[#FFCC4D]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Helpline</p>
                  <p className="text-sm font-bold">+880 1700000033</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5 text-[#FFCC4D]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Email Support</p>
                  <p className="text-sm font-bold">support@qurbanihat.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h4 className="text-lg font-black uppercase tracking-widest italic flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#FFCC4D]"></span>
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm font-medium">Subscribe to get the latest updates on new livestock arrivals.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-[#FFCC4D] focus:ring-1 focus:ring-[#FFCC4D] transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-[#FFCC4D] text-[#253237] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
            © {currentYear} QurbaniHat Platform. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
