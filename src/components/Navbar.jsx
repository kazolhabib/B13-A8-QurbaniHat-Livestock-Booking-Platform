"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Animals", href: "/animals" },
  ];

  const customColor = "#253237";

  return (
    <div className="bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-200">
      <div className="navbar w-full mx-auto px-5 md:px-10 lg:px-20 flex justify-between">
        {/* Logo - Left Side */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
            <Image
              src={logo}
              alt="QurbaniHat Logo"
              width={200}
              height={48}
              style={{ height: "auto" }}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop & Tablet Menu Container - Right Side */}
        <div className="navbar-end flex items-center">
          {/* Desktop Links & Buttons (Hidden on Tablet/Mobile below 1280px) */}
          <div className="hidden xl:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: customColor }}
                    className={`relative py-2 transition-all duration-300 group ${
                      pathname === link.href ? "font-medium" : "font-normal hover:opacity-100"
                    }`}
                  >
                    {link.name}
                    {/* Animated Underline */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                        pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      style={{ backgroundColor: customColor }}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-8 ml-4 items-center">
              <Link
                href="/signin"
                style={{ color: customColor }}
                className="font-normal hover:opacity-100 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="btn bg-[#253237] px-8 text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:border-[#253237] hover:bg-transparent hover:text-[#253237] transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Hamburger Menu - Right Side (Visible on Tablet/Mobile below 1280px) */}
          <div className="dropdown dropdown-end xl:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-base-100 rounded-2xl w-72 border border-base-200 animate-in fade-in zoom-in duration-200"
            >
              <li className="menu-title text-base-content/50 px-4 py-2 uppercase text-xs font-bold tracking-widest">
                Navigation
              </li>
              {navLinks.map((link) => (
                <li key={link.href} className="my-1">
                  <Link
                    href={link.href}
                    style={{ color: customColor }}
                    className={`text-lg py-3 rounded-xl transition-colors ${
                      pathname === link.href
                        ? "font-medium bg-primary/10"
                        : "hover:bg-base-200"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              
              <div className="divider my-2 opacity-50"></div>
              
              <li className="menu-title text-base-content/50 px-4 py-2 uppercase text-xs font-bold tracking-widest">
                Account
              </li>
              <li className="my-1">
                <Link 
                  href="/signin" 
                  style={{ color: customColor }}
                  className="text-lg py-3 rounded-xl hover:bg-base-200 transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li className="mt-4">
                <Link 
                  href="/signup" 
                  className="btn btn-primary btn-md w-full text-white font-bold rounded-xl shadow-lg shadow-primary/20"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
