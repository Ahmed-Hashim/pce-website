"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

interface Company {
  name: string;
  logo?: string;
  abbrev?: string;
  shape?: "circle" | "square";
  description?: string;
  established?: string;
}

interface HoldingGroupProps {
  title: string;
  subtitle?: string;
  companies: Company[];
  holdingLogo?: string;
  holdingName?: string;
  holdingAlt?: string;
  holdingDescription?: string;
  holdingEstablished?: string;
}

export default function HoldingGroupSection({
  title,
  companies,
  holdingLogo = "/pce-logo.png",
  holdingName = "PRECISION HOLDING",
  holdingAlt = "Holding Logo",
}: HoldingGroupProps) {
  const getInitials = (text: string) => {
    return text
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  };

  return (
    <section className="relative py-(--space-section-y-mobile) sm:py-(--space-section-y-sm) md:py-(--space-section-y-md) lg:py-(--space-section-y-lg) bg-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,140,98,0.1),transparent_70%)]"></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-12 sm:mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle
                   
                    title={title}
                    background={title.split(" ").pop()}
                    outlineColor="var(--color-heading)"
                    titleColor="accent"
                    align="center"
                    className="mb-12 sm:mb-16"
                  />
        </motion.div>
      </div>

      {/* Holding Company Showcase */}
      <div className="relative z-10 max-w-4xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Central Holding Company */}
          <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl shadow-(--color-accent)/20 flex flex-col items-center justify-center p-6 sm:p-8 hover:scale-105 transition-all duration-500">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4 sm:mb-6">
                <Image
                  src={holdingLogo}
                  alt={holdingAlt}
                  fill
                  className="object-contain drop-shadow-lg filter brightness-0 invert"
                />
              </div>
              <h3 className="text-accent font-bold text-lg sm:text-xl tracking-wide text-center mb-2">
                {holdingName}
              </h3>

            </div>

            {/* Connection Lines - Hidden on mobile */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <div className="absolute top-1/2 left-full w-32 h-px bg-linear-to-r from-accent/30 to-transparent"></div>
              <div className="absolute top-1/2 right-full w-32 h-px bg-linear-to-l from-accent/30 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subsidiary Companies */}
      <div className="relative z-10 max-w-6xl mx-auto justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className={`${index === 0 ? "bg-accent/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center" : "bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-(--color-accent)/10"} `}>
                {/* Company Logo/Initials */}
                <div className="relative mb-3 sm:mb-4">
                  {company.logo ? (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        className="object-contain drop-shadow-md filter brightness-0 invert"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-linear-to-br from-accent/20 to-accent/10 rounded-${
                        company.shape === "square" ? "2xl" : "full"
                      } text-white font-bold text-lg sm:text-xl shadow-lg`}
                    >
                      {company.abbrev || getInitials(company.name)}
                    </div>
                  )}
                </div>

                {/* Company Name */}
                <h4 className="text-accent font-semibold text-sm sm:text-base leading-tight capitalize">
                  {company.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
