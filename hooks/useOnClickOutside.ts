"use client";

import { useEffect, RefObject } from "react";

/**
 * Triggers a callback when clicking outside of the specified element(s).
 * Useful for closing dropdowns, modals, and other overlays.
 * 
 * @param ref - Ref to the element that should not trigger the callback
 * @param handler - Callback to execute when clicking outside
 * @param enabled - Optional flag to enable/disable the listener
 * 
 * @example
 * ```tsx
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * useOnClickOutside(dropdownRef, () => setIsOpen(false), isOpen);
 * 
 * return (
 *   <div ref={dropdownRef}>
 *     {isOpen && <DropdownContent />}
 *   </div>
 * );
 * ```
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null>,
    handler: (event: MouseEvent | TouchEvent) => void,
    enabled: boolean = true
): void {
    useEffect(() => {
        if (!enabled) return;

        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref.current;

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler, enabled]);
}
