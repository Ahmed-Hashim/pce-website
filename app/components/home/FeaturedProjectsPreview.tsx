"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
  title = "OUR PROJECTS",
  subtitle = "",
  projects = defaultProjects,
  viewProjectLabel = "View Project",
}: FeaturedProjectsPreviewProps) {
  const [currentProject, setCurrentProject] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const dragStartX = useRef<number | null>(null);
  const dragStartTime = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const SWIPE_THRESHOLD_PX = 50;
  const SWIPE_MAX_DURATION_MS = 600;

  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerView(3); // lg and above
      else if (w >= 768) setItemsPerView(1); // md
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

  const nextProject = () => goToProject(currentProject + 1);
  const prevProject = () => goToProject(currentProject - 1);

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartTime.current = performance.now();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDragging.current || dragStartX.current === null) {
      isDragging.current = false;
      dragStartX.current = null;
      return;
    }
    const deltaX = e.clientX - dragStartX.current;
    const duration = performance.now() - dragStartTime.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX && duration < SWIPE_MAX_DURATION_MS) {
      if (deltaX < 0) {
        nextProject();
      } else {
        prevProject();
      }
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (isDragging.current) {
      handlePointerUp(e);
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentProject((prev) => {
        const maxIndex = Math.max(0, projects.length - itemsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 12000);
    return () => clearInterval(id);
  }, [projects.length, itemsPerView]);

  return (
    <section className="relative overflow-hidden bg-neutral-light/20">
      {/* <div className="absolute inset-0 bg-[url('/bg-2.png')] bg-cover bg-center opacity-20 scale-x-[-1] scale-y-[-1]"></div> */}
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <SectionTitle
            title={title}
            titleColor="heading"
            outlineColor="var(--color-neutral-light)"
            background={title.split(" ").pop()}
            align="center"
          />
          {subtitle && (
            <p className="mt-4 text-lg text-secondary-dark max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Projects Slider */}
        <div className="relative px-4 lg:px-0">
          <div
            className="overflow-hidden rounded-xl touch-manipulation select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentProject * (100 / itemsPerView)
                }%)`,
              }}
            >
              {projects.map((project, index) => {
                const centerIndex = currentProject + Math.floor(itemsPerView / 2);
                const isCenter = index === centerIndex;
                return (
                  <div
                    key={project.id}
                    style={{ width: `${100 / itemsPerView}%` }}
                    className={`shrink-0 p-2 transition-transform duration-500 ${
                      isCenter ? "scale-[1.02]" : "scale-[0.95]"
                    }`}
                  >
                    <ProjectHoverCard project={project} viewProjectLabel={viewProjectLabel} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={prevProject}
              aria-label="Previous"
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-primary-dark text-button-text hover:bg-primary-medium transition-colors"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            {(() => {
              const totalPages = Math.max(1, projects.length - itemsPerView + 1);
              const currentPage = Math.min(currentProject + 1, totalPages);
              const pad = (n: number) => n.toString().padStart(2, "0");
              return (
                <span className="text-sm tracking-widest text-secondary-dark">
                  {pad(currentPage)} / {pad(totalPages)}
                </span>
              );
            })()}
            <button
              onClick={nextProject}
              aria-label="Next"
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-primary-dark text-button-text hover:bg-primary-medium transition-colors"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectHoverCard({
  project,
  viewProjectLabel,
}: {
  project: Project;
  viewProjectLabel: string;
}) {
  return (
    <Link href={project.link} aria-label={viewProjectLabel} className="group block">
      <div className="relative h-88 md:h-96 lg:h-104 rounded-xl overflow-hidden border bg-secondary-dark/10 transition-all duration-300 hover:shadow-xl">
        <Image
          width={800}
          height={600}
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="relative rounded-xl bg-primary-dark/90 p-5 shadow-xl">
            <div className="absolute -left-3 bottom-5 w-2 h-12 bg-primary-medium rounded-full"></div>
            <div className="flex flex-col">
              <h6 className="text-white" >{project.title}</h6>
              <small>{project.category}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
