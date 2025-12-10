import Image from "next/image";
import Section from "./Section";

interface ProjectGalleryProps {
  images: string[];
  projectName?: string;
}

export default function ProjectGallery({ images, projectName = "Project" }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <Section className="w-full" container={true}>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {images.map((src, i) => (
            <div key={`gal-${i}`} className="relative h-64 md:h-80 lg:h-96 group overflow-hidden">
              <Image 
                src={src} 
                alt={`${projectName} gallery image ${i + 1}`} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/10 transition-colors duration-500" />
            </div>
          ))}
       </div>
    </Section>
  );
}
