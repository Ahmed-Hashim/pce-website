Framework:
Use Next.js 16 for all projects.

Styling:
Use Tailwind CSS v4 for all styling.

Language:
Use TypeScript (.tsx for components, .ts for logic).

Structure:

Use the app/ directory structure (Next.js 16 convention).

Use page.tsx for route pages.

Use layout.tsx for shared layouts (wrapping pages).

Use globals.css for all global styles, variables, and brand colors.

Dynamic Content Rule:

Any text, paragraph, image, or static data (such as titles, subtitles, labels, descriptions, button text, links, numbers, etc.) must be defined as a variable, prop, or imported data object within the component.

This ensures all content can be easily updated or localized later without editing the JSX structure.

Example:

interface HeroProps {
  title: string;
  description: string;
  imageSrc: string;
  stats: { label: string; value: string }[];
}

export default function HeroSection({ title, description, imageSrc, stats }: HeroProps) {
  return (
    <section className="text-center p-8 bg-[--color-secondary-light]">
      <h1 className="text-3xl font-bold text-[--color-primary]">{title}</h1>
      <p className="text-[--color-text-secondary] mt-2">{description}</p>
      <img
        src={imageSrc}
        alt="Hero Image"
        className="mx-auto mt-4 w-full max-w-md rounded-2xl"
      />
      <div className="flex justify-center gap-8 mt-6">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-xl font-semibold text-[--color-primary]">{stat.value}</p>
            <p className="text-[--color-text-secondary]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Usage example:
// <HeroSection
//   title="Welcome to Our Platform"
//   description="Empowering your digital experience."
//   imageSrc="/images/hero.png"
//   stats={[
//     { label: 'Users', value: '10K+' },
//     { label: 'Projects', value: '500+' },
//   ]}
// />


❌ Never hardcode text, labels, or image paths directly inside JSX elements.