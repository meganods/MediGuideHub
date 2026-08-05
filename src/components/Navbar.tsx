"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { ShieldCheck, User as UserIcon, LogOut, Menu, X, HeartPulse } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-[#F9FAFB] p-2 rounded-xl border border-stone-200 group-hover:border-[#C9A15A] transition-all">
                  <HeartPulse className="h-6 w-6 text-[#C9A15A]" />
                </div>
                <span className="font-heading font-bold text-xl tracking-tight text-[#113F48] group-hover:text-[#C9A15A] transition-colors">
                  MediGuide<span className="text-[#C9A15A]">Hub</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors hover:text-[#C9A15A] ${
                    isActive(link.href) ? "text-[#C9A15A] font-semibold" : "text-[#113F48]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* User Account / Admin CTA Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                user.role === "admin" ? (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/auth?tab=signin"
                      className="flex items-center justify-center px-6 h-11 font-medium text-white bg-[#C9A15A] hover:bg-[#B58F4E] rounded-xl transition-all shadow-md shadow-[#C9A15A]/10 hover:shadow-lg"
                    >
                      Login
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-1.5 px-4 h-11 text-sm font-medium text-[#113F48] bg-[#F9FAFB] hover:bg-stone-50 rounded-xl border border-stone-200 hover:border-[#C9A15A]/50 transition-all"
                    >
                      <UserIcon className="h-4 w-4 text-[#C9A15A]" />
                      My Dashboard
                    </Link>
                  </div>
                )
              ) : (
                <Link
                  href="/auth?tab=signin"
                  className="flex items-center justify-center px-6 h-11 font-medium text-white bg-[#C9A15A] hover:bg-[#B58F4E] rounded-xl transition-all shadow-md shadow-[#C9A15A]/10 hover:shadow-lg"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              {!mobileMenuOpen && (
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 rounded-xl text-[#113F48] hover:bg-[#F9FAFB] hover:text-[#C9A15A] transition-all"
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`fixed inset-0 z-[999] bg-black/40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
        onClick={() => setMobileMenuOpen(false)} 
      />

      {/* Mobile Drawer Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 z-[1000] w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-[#113F48] p-1.5 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-[#C9A15A]" />
            </div>
            <span className="font-bold text-lg text-[#113F48] tracking-tight">
              MediGuide <span className="text-[#C9A15A]">Hub</span>
            </span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="text-stone-400 hover:text-[#113F48] transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-3 p-6 overflow-y-auto flex-grow bg-white">
          <div className="flex flex-col space-y-1 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Navigation</span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                  isActive(link.href) ? "bg-[#113F48]/5 text-[#113F48]" : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <hr className="border-stone-100 mb-6" />

          <div className="flex flex-col space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Account</span>
            {user ? (
              user.role === "admin" ? (
                <>
                  <Link
                    href="/auth?tab=signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full h-12 font-medium text-white bg-[#C9A15A] rounded-xl transition-all"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full h-12 font-medium text-[#113F48] bg-[#F9FAFB] border border-stone-200 rounded-xl transition-all"
                  >
                    <UserIcon className="h-4 w-4" />
                    My Dashboard
                  </Link>
                </>
              )
            ) : (
              <Link
                href="/auth?tab=signin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full h-12 font-medium text-white bg-[#C9A15A] hover:bg-[#B58F4E] rounded-xl transition-all shadow-md shadow-[#C9A15A]/10"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
