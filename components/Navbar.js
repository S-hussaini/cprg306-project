// components/Navbar.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // close mobile menu on escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 text-white flex items-center justify-center font-bold">V</div>
              <div className="leading-tight">
                <div className="text-lg font-extrabold">Voluntr</div>
                <div className="text-xs text-gray-500 -mt-0.5 hidden md:block">Quick acts. Real impact.</div>
              </div>
            </Link>
          </div>

          {/* Center: search (desktop) */}
          <div className="flex-1 hidden md:flex justify-center px-4">
            <div className="w-full max-w-xl">
              <label className="relative block">
                <span className="sr-only">Search tasks</span>
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <FiSearch className="text-gray-400" />
                </span>
                <input
                  id="global-search"
                  placeholder="Search tasks, categories or location (e.g. 'education', 'park')"
                  className="w-full rounded-lg border bg-white px-10 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </label>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex sm:items-center sm:gap-3">
              <Link href="/signin" className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50">Sign in</Link>
              <Link href="/signup" className="text-sm px-3 py-1 rounded-md bg-emerald-600 text-white shadow-sm hover:opacity-95">Get Started</Link>
            </div>

            {/* mobile menu button */}
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-max-height duration-300 ease-in-out overflow-hidden ${open ? "max-h-72" : "max-h-0"}`}>
        <div className="px-4 pt-2 pb-4 space-y-2">
          <Link href="/tasks" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Tasks</Link>
          <Link href="/map" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Map</Link>
          <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Dashboard</Link>
          <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">About</a>

          <div className="pt-2 border-t">
            <Link href="/signin" className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-50">Sign in</Link>
            <Link href="/signup" className="mt-2 block px-3 py-2 rounded-md text-base bg-emerald-600 text-white text-center">Get Started</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
