// components/ui/PrimaryButton.tsx
import React from 'react';
import { FaArrowRight } from 'react-icons/fa'; // npm install react-icons

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2.5 relative btn-primary text-base font-semibold py-1.5 pl-6 pr-1.5 text-center rounded-full z-[2] overflow-hidden group"
    >
      <span className="text-white overflow-hidden relative h-5">
        <span className="flex leading-none transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute left-0 top-0 flex leading-none transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span className="inline-flex justify-center items-center text-xl w-10 h-10 overflow-hidden bg-primary-dark rounded-full">
        <FaArrowRight className="text-white transform -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
      </span>
    </a>
  );
};

export default PrimaryButton;
