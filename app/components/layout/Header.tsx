// components/Header.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Service", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const desktopPanelOpenLabel = "Open information panel";
  const desktopPanelEvents = { open: 'desktopSidePanel:open', close: 'desktopSidePanel:close' } as const;

  return (
 <header id="site-header" className=" bg-white transition-all duration-300 ">
  <div className="container mx-auto flex items-center justify-between py-4 px-4">

        {/* Logo */}
        <div className="shrink-0">
          <Link href="/">
            <Image
              src="/pce-logo.png"
              alt="PCE Logo"
             
              width={50}
              height={50}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex grow items-center justify-center">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              // THIS IS THE KEY LINE FOR YOUR GOLD COLOR
              <Link
                key={link.name}
                href={link.href}
                className="text-primary-dark font-medium transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-primary-dark text-button-text px-5 py-2 rounded-md text-sm font-medium hover:bg-primary-medium hover:scale-105 transition-all duration-300 backdrop-blur-sm">
            Book a Meeting
          </button>

          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event(desktopPanelEvents.open));
              }
            }}
            aria-label={desktopPanelOpenLabel}
            className="p-2 rounded-md border border-primary-dark/20 hover:bg-primary-dark/10 hover:border-primary-dark/30 transition-all duration-300 backdrop-blur-sm"
          >
            <FaBars className="text-primary-medium/70 text-base" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md border border-primary-dark/20 hover:bg-primary-dark/10 hover:border-primary-dark/30 focus:outline-none transition-all duration-300 backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary-medium/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-text/5 backdrop-blur-lg border-t border-text/10">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary-medium/80 hover:text-primary-medium hover:bg-text/10 rounded-md px-3 py-2 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
            <button className="bg-primary-medium/90 text-button-text w-full mt-4 px-6 py-2 rounded-lg hover:bg-primary-medium hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              Book a Meeting
            </button>
          </nav>
        </div>
      )}
      {/* Panel is now rendered globally in Layout */}
    </header>
  );
};

export default Header;
