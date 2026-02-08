// components/Header.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services/Sectors", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const desktopPanelOpenLabel = "Open information panel";
  const desktopPanelEvents = { open: 'desktopSidePanel:open', close: 'desktopSidePanel:close' } as const;

  return (
 <header id="site-header" className="  bg-linear-to-br from-black to-primary-dark border-t border-white/10 ">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4" >

        {/* Logo */}
        <div className="shrink-0">
          <Link href="/">
            <Image
              src="/pce-logo3.png"
              alt="PCE Logo"
              className="invert brightness-0"
              width={225}
              height={75}
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
                className="text-white font-medium transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/contact#cta" className="bg-primary-dark text-button-text px-5 py-2 rounded-sm text-sm border border-primary-medium font-medium hover:bg-primary-medium hover:scale-105 transition-all duration-300 backdrop-blur-sm">
            Book a Meeting
          </Link>

          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event(desktopPanelEvents.open));
              }
            }}
            aria-label={desktopPanelOpenLabel}
            className="p-2 rounded-md border border-primary-medium hover:bg-primary-dark/10 hover:border-primary-dark/30 transition-all duration-300 backdrop-blur-sm"
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
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact#cta" 
              className="block bg-primary-medium/90 text-button-text w-full mt-4 px-6 py-2 rounded-sm hover:bg-primary-medium hover:scale-105 transition-all duration-300 backdrop-blur-sm text-center"
              onClick={() => setIsOpen(false)}
            >
              Book a Meeting
            </Link>
          </nav>
        </div>
      )}
      {/* Panel is now rendered globally in Layout */}
    </header>
  );
};

export default Header;
