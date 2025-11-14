"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  year: string;
  link: string;
  identity?: {
    name: string;
    role: string;
    company?: string;
  };
}

interface FeaturedProjectsPreviewProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
  tagText?: string;
  viewProjectLabel?: string;
  viewAllLabel?: string;
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Commercial Complex Development",
    description:
      "Modern commercial complex featuring sustainable design and cutting-edge infrastructure.",
    image: "/1.png",
    category: "Commercial",
    location: "Dubai, UAE",
    year: "2024",
    link: "/projects/commercial-complex",
    identity: { name: "PCE Team", role: "Project Lead", company: "PCE" },
  },
  {
    id: 2,
    title: "Industrial Manufacturing Facility",
    description:
      "State-of-the-art manufacturing facility with advanced automation systems.",
    image: "/2.png",
    category: "Industrial",
    location: "Abu Dhabi, UAE",
    year: "2023",
    link: "/projects/manufacturing-facility",
    identity: { name: "PCE Team", role: "Site Supervisor", company: "PCE" },
  },
  {
    id: 3,
    title: "Residential Tower Project",
    description:
      "Luxury residential tower with premium amenities and smart home integration.",
    image: "/3.png",
    category: "Residential",
    location: "Sharjah, UAE",
    year: "2024",
    link: "/projects/residential-tower",
    identity: { name: "PCE Team", role: "Design Manager", company: "PCE" },
  },
  {
    id: 4,
    title: "Infrastructure Development",
    description:
      "Large-scale infrastructure project improving urban connectivity and efficiency.",
    image: "/4.png",
    category: "Infrastructure",
    location: "Dubai, UAE",
    year: "2023",
    link: "/projects/infrastructure-development",
    identity: { name: "PCE Team", role: "Operations", company: "PCE" },
  },
  {
    id: 5,
    title: "Residential Tower Project",
    description:
      "Luxury residential tower with premium amenities and smart home integration.",
    image: "/3.png",
    category: "Residential",
    location: "Sharjah, UAE",
    year: "2024",
    link: "/projects/residential-tower",
    identity: { name: "PCE Team", role: "Design Manager", company: "PCE" },
  },
  {
    id: 6,
    title: "Infrastructure Development",
    description:
      "Large-scale infrastructure project improving urban connectivity and efficiency.",
    image: "/4.png",
    category: "Infrastructure",
    location: "Dubai, UAE",
    year: "2023",
    link: "/projects/infrastructure-development",
    identity: { name: "PCE Team", role: "Operations", company: "PCE" },
  },
];

export default function FeaturedProjectsPreview({
  title = "PROUD PROJECTS",
  subtitle = "Showcasing our excellence in engineering and construction",
  projects = defaultProjects,

  viewProjectLabel = "View Project",
}: FeaturedProjectsPreviewProps) {
  const [currentProject, setCurrentProject] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerView(3); // lg and above
      else if (w >= 768) setItemsPerView(2); // md
      else setItemsPerView(1); // sm
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const goToProject = (index: number) => {
    const maxIndex = Math.max(0, projects.length - itemsPerView);
    setCurrentProject(Math.min(Math.max(index, 0), maxIndex));
  };

  return (
    <section className="py-[var(--space-section-y-mobile)] sm:py-[var(--space-section-y-sm)] md:py-[var(--space-section-y-md)] lg:py-[var(--space-section-y-lg)] px-[var(--space-section-x-mobile)] sm:px-[var(--space-section-x-sm)] md:px-[var(--space-section-x-md)] lg:px-[var(--space-section-x-lg)] bg-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/bg-2.png')] bg-cover bg-center opacity-20 scale-x-[-1] scale-y-[-1]"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <SectionTitle
            title={title}
            titleColor="heading"
            outlineColor="var(--color-heading)"
            background={title.split(" ").pop()}
            align="center"
          />
          <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Projects Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentProject * (100 / itemsPerView)
                }%)`,
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{ width: `${100 / itemsPerView}%` }}
                  className="shrink-0 p-2"
                >
                  <div className="group relative h-88 md:h-96 lg:h-104 rounded-xl overflow-hidden border border-border bg-border/10 hover:bg-border/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.04]">
                    {/* Image */}
                    <Image
                      width={500}
                      height={500}
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors"></div>

                    {/* Hover overlay matching screenshot */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="mb-3 inline-block bg-accent/90 text-button-text px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                        {project.category}
                      </span>
                      <h3 className="text-white text-2xl md:text-3xl font-extrabold drop-shadow-lg">
                        {project.title}
                      </h3>
                      <a
                        href={project.link}
                        className="mt-5 inline-flex items-center justify-center w-12 h-12 rounded-lg border-2 border-white/80 text-white hover:bg-white hover:text-bg transition-all duration-300"
                        aria-label={viewProjectLabel}
                      >
                        <FiArrowUpRight className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({
              length: Math.max(1, projects.length - itemsPerView + 1),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentProject === index
                    ? "bg-accent scale-125"
                    : "bg-border hover:bg-border-subtle"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
