"use client";

import { useState, useEffect } from "react";

/**
 * Returns true after the component has mounted on the client.
 * Useful for avoiding hydration mismatches with client-only code.
 * 
 * @returns Boolean indicating if component is running on client
 * 
 * @example
 * ```tsx
 * const isClient = useIsClient();
 * 
 * // Avoid hydration mismatch
 * if (!isClient) return null;
 * 
 * // Safe to use client-only APIs
 * return <div>Window width: {window.innerWidth}px</div>;
 * ```
 */
export function useIsClient(): boolean {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient;
}
