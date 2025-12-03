 {/* Background image with overlay */}
      {/* LEFT side triangle 1 (center) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-40 opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 0 50 L 100 0 L 100 100 Z"
            fill="var(--color-primary-medium)"
          />
        </svg>
      </div>

      {/* Triangle SVG background in top left corner pointing right */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 opacity-20 pointer-events-none">
        {/* Triangle on the left side pointing right */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 opacity-20 pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Triangle pointing → */}
            <path
              d="M 0 50 L 100 0 L 100 100 Z"
              fill="var(--color-primary-medium)"
            />
          </svg>
        </div>
        <div className="absolute left-0 bottom-10 w-28 h-28 opacity-20 pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M 0 50 L 100 0 L 100 100 Z"
              fill="var(--color-primary-medium)"
            />
          </svg>
        </div>
        <div className="absolute left-0 bottom-10 w-28 h-28 opacity-20 pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M 0 50 L 100 0 L 100 100 Z"
              fill="var(--color-primary-medium)"
            />
          </svg>
        </div>
      </div>