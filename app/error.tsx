"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ANIMATION } from "@/lib/constants";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Error boundary for page-level errors.
 * Catches errors in the route segment and its children.
 * 
 * This provides a nice fallback UI instead of breaking the entire app.
 */
export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log to error reporting service
        console.error("Page error caught:", error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                {/* Icon */}
                <div className="mb-6">
                    <svg
                        className="w-16 h-16 mx-auto text-primary-medium"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                    </svg>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-primary-dark mb-4">
                    Oops! Something went wrong
                </h2>
                <p className="text-secondary-dark mb-8">
                    We encountered an error while loading this page.
                    Please try again or return to the homepage.
                </p>

                {/* Error digest for debugging (production) */}
                {error.digest && (
                    <p className="text-xs text-secondary-dark mb-6 font-mono bg-neutral-light rounded px-3 py-2">
                        Reference: {error.digest}
                    </p>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="btn btn-primary"
                        style={{
                            transition: `all ${ANIMATION.NORMAL}ms ease`
                        }}
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="btn btn-secondary"
                        style={{
                            transition: `all ${ANIMATION.NORMAL}ms ease`
                        }}
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
