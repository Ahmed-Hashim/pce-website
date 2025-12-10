"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/constants";

/**
 * Subscribes to media query changes and returns whether the query matches.
 * Uses matchMedia API for efficient event-driven updates.
 * 
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns Boolean indicating if the media query matches
 * 
 * @example
 * ```tsx
 * // Using with custom query
 * const isLarge = useMediaQuery("(min-width: 1024px)");
 * 
 * // Using with breakpoint constant
 * const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`);
 * 
 * return isDesktop ? <DesktopNav /> : <MobileNav />;
 * ```
 */
export function useMediaQuery(query: string): boolean {
    // Default to false on server and initial hydration
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        // Set initial value
        setMatches(mediaQuery.matches);

        // Create event handler
        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Add listener
        mediaQuery.addEventListener("change", handler);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handler);
        };
    }, [query]);

    return matches;
}

// =============================================================================
// Convenience hooks for common breakpoints
// =============================================================================

/**
 * Returns true if viewport is at least tablet size (md breakpoint)
 */
export function useIsTablet(): boolean {
    return useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`);
}

/**
 * Returns true if viewport is at least desktop size (lg breakpoint)
 */
export function useIsDesktop(): boolean {
    return useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`);
}

/**
 * Returns true if viewport is small/mobile (below md breakpoint)
 */
export function useIsMobile(): boolean {
    return !useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`);
}
