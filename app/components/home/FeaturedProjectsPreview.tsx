"use client";
import { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import { projectsData } from "../../data/projects";

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

const defaultProjects: Project[] = projectsData.map((p, i) => ({
  id: i + 1,
  title: p.title,
  description: p.description,
  image: p.heroImage,
  category: p.category,
  location: p.location,
  year: p.year,
  link: `/projects/${p.slug}`,
}));

export default function FeaturedProjectsPreview({
  title = "Our Projects",
  subtitle = "",
  projects = defaultProjects,
}: FeaturedProjectsPreviewProps) {
  const [currentProject, setCurrentProject] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const dragStartX = useRef<number | null>(null);
  const dragStartTime = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const SWIPE_THRESHOLD_PX = 100;
  const SWIPE_MAX_DURATION_MS = 2000;

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
    if (
      Math.abs(deltaX) > SWIPE_THRESHOLD_PX &&
      duration < SWIPE_MAX_DURATION_MS
    ) {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" relative overflow-hidden">
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
              <p className="mt-4 text-lg text-secondary-dark max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

         {/* Projects Slider */}

          <div
            className="rounded-sm touch-manipulation select-none overflow-hidden"
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
                const centerIndex =
                  currentProject + Math.floor(itemsPerView / 2);
                const isCenter = index === centerIndex;
                return (
                  <div
                    key={project.id}
                    style={{ width: `${100 / itemsPerView}%` }}
                    className={`shrink-0 transition-transform duration-500 ${
                      isCenter ? "scale-[1.02]" : "scale-[0.95]"
                    }`}
                  >
                    <ProjectCard
                      href={project.link}
                      title={project.title}
                      category={project.category}
                      year={project.year}
                      imageSrc={project.image}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={prevProject}
              aria-label="Previous"
              className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-border bg-primary-dark text-button-text hover:bg-primary-medium transition-colors"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            {(() => {
              const totalPages = Math.max(
                1,
                projects.length - itemsPerView + 1
              );
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
              className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-border bg-primary-dark text-button-text hover:bg-primary-medium transition-colors"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
