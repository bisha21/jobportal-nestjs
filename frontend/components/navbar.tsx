'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '@/public/next.svg';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={logo} alt="Logo" className="h-8 w-auto" />
              <span className="text-lg font-bold">JobPortal</span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-indigo-400 transition">
              Home
            </Link>
            <Link href="/jobs" className="hover:text-indigo-400 transition">
              Browse Jobs
            </Link>
            <Link href="/about" className="hover:text-indigo-400 transition">
              About Us
            </Link>
          </div>

          {/* Right: Login / Signup */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-2">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 hover:bg-gray-700 transition"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="block rounded-md px-3 py-2 hover:bg-gray-700 transition"
          >
            Browse Jobs
          </Link>
          <Link
            href="/about"
            className="block rounded-md px-3 py-2 hover:bg-gray-700 transition"
          >
            About Us
          </Link>
          <div className="flex space-x-2 pt-3">
            <Link
              href="/login"
              className="flex-1 text-center px-3 py-2 rounded-md border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="flex-1 text-center px-3 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
