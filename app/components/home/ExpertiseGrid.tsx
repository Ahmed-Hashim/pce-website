"use client";


export interface ExpertiseItem {
  id: number;
  title: string;
  iconUrl: string;
}

interface ExpertiseGridProps {
  items: ExpertiseItem[];
}

export default function ExpertiseGrid({ items }: ExpertiseGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative bg-white rounded-sm p-8 shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-gray-100 hover:border-primary-medium/20"
        >
          {/* Hover Background Effect */}
          <div className="absolute inset-0 rounded-sm bg-linear-to-br from-primary-medium/5 to-secondary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Icon/Image Container - Centered and Larger */}
            <div className="mb-8">
              {item.iconUrl ? (
                <div className="duration-300 w-16 h-16 relative group-hover:scale-110 transition-transform">
                  <div
                    className="absolute inset-0 bg-primary-dark group-hover:bg-primary-medium transition-colors duration-300"
                    style={{
                      maskImage: `url(${item.iconUrl})`,
                      maskSize: "contain",
                      maskPosition: "center",
                      maskRepeat: "no-repeat",
                      WebkitMaskImage: `url(${item.iconUrl})`,
                      WebkitMaskSize: "contain",
                      WebkitMaskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                    }}
                  />
                </div>
              ) : (
                <div className="w-24 h-24 flex items-center justify-center text-primary-medium group-hover:scale-110 transition-all duration-300 bg-gray-100 rounded-sm">
                  <span className="text-xs text-gray-400">No Icon</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-4">
              {/* Title */}
              <h3 className="md:text-lg text-sm font-bold text-primary-dark group-hover:text-primary-medium transition-colors duration-300">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
