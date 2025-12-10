"use client";

import { useState, useEffect } from "react";
import { ANIMATION } from "@/lib/constants";

/**
 * Debounces a value by the specified delay.
 * Useful for search inputs to avoid excessive API calls.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: ANIMATION.DEBOUNCE_DELAY)
 * @returns The debounced value
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearch = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   // This only runs 300ms after user stops typing
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = ANIMATION.DEBOUNCE_DELAY): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
