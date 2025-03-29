"use client";

import { useState } from "react";
import Image from "next/image";
import { LucideShoppingBasket, Menu, X } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Image src={"/logo.svg"} alt="logo" width={150} height={50} />
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8">
        {["Home", "Women", "Men", "Kids"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative text-gray-700 hover:text-[#ff931c] font-bold transition"
          >
            {item}
            <span className="absolute left-0 bottom-[-3px] w-full h-[3px] bg-[#ff931c] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
        ))}
      </nav>

      {/* Right: Cart & Profile */}
      <div className="flex items-center gap-4">
        {/* Cart Icon */}
        <div className="relative">
          <div className="absolute -right-1 -top-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            0
          </div>
          <LucideShoppingBasket className="text-black" size={24} />
        </div>

        {/* Authentication */}
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-fit mt-16 w-64 bg-white shadow-lg rounded-l-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden flex flex-col p-6`}
      >
        {/* Close Button */}
        {/* <button className="self-end mb-4" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button> */}

        {/* Sidebar Links */}
        <nav className="flex flex-col gap-4 text-lg">
          {["Home", "Women", "Men", "Kids"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-[#ff931c] transition"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Profile & Cart in Sidebar */}
        {/* <div className="mt-8 flex items-center justify-between">
          <div className="relative">
            <div className="absolute -right-1 -top-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </div>
            <LucideShoppingBasket className="text-black" size={24} />
          </div>

          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div> */}
      </aside>
    </header>
  );
}
