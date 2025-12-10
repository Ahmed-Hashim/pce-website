"use client";

import { useEffect } from "react";
import { ANIMATION } from "@/lib/constants";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Root-level error boundary that catches errors in the root layout.
 * This is a fallback for errors that escape the regular error.tsx boundary.
 * 
 * Note: This must be a Client Component and include its own <html> and <body> tags.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        // Log to error reporting service
        console.error("Global error caught:", error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-primary-dark min-h-screen flex items-center justify-center">
                <div className="text-center px-4 max-w-lg">
                    {/* Icon */}
                    <div className="mb-6">
                        <svg
                            className="w-20 h-20 mx-auto text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    </div>

                    {/* Content */}
                    <h1 className="text-3xl font-bold text-white mb-4">
                        Something went wrong
                    </h1>
                    <p className="text-secondary-light mb-8">
                        We apologize for the inconvenience. An unexpected error has occurred.
                        Our team has been notified.
                    </p>

                    {/* Error digest for debugging */}
                    {error.digest && (
                        <p className="text-sm text-secondary-dark mb-6 font-mono">
                            Error ID: {error.digest}
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
                        <a
                            href="/"
                            className="btn btn-secondary"
                            style={{
                                transition: `all ${ANIMATION.NORMAL}ms ease`
                            }}
                        >
                            Go Home
                        </a>
                    </div>
                </div>
            </body>
        </html>
    );
}
