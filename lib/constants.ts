/**
 * Application Constants
 * Centralized constants to eliminate magic numbers and strings throughout the codebase.
 */

// =============================================================================
// Site / SEO
// =============================================================================

/**
 * Canonical production origin (no trailing slash).
 * Single source of truth for canonical URLs, sitemap, robots, and JSON-LD.
 * Override per-environment with NEXT_PUBLIC_SITE_URL (must be a full https origin).
 */
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://pce-consultants.com";

// =============================================================================
// Pagination
// =============================================================================

export const PAGINATION = {
    /** Default items per page for project listings */
    PROJECTS_PER_PAGE: 12,
    /** Default items per page for news/blog listings */
    NEWS_PER_PAGE: 10,
    /** Default items per page for careers listings */
    CAREERS_PER_PAGE: 8,
    /** Number of page buttons to show around current page */
    PAGE_SIBLINGS: 2,
} as const;

// =============================================================================
// Grid Layouts
// =============================================================================

export const GRID = {
    /** Project grid columns configuration */
    PROJECTS: {
        mobile: 1,
        tablet: 2,
        desktop: 3,
    },
    /** Services grid columns configuration */
    SERVICES: {
        mobile: 1,
        tablet: 2,
        desktop: 4,
    },
    /** Team grid columns configuration */
    TEAM: {
        mobile: 1,
        tablet: 2,
        desktop: 4,
    },
} as const;

// =============================================================================
// Animation Durations (in milliseconds)
// =============================================================================

export const ANIMATION = {
    /** Fast transitions (hover effects, small elements) */
    FAST: 150,
    /** Normal transitions (most UI elements) */
    NORMAL: 300,
    /** Slow transitions (page transitions, large elements) */
    SLOW: 500,
    /** Very slow transitions (complex animations) */
    VERY_SLOW: 800,
    /** Hero slider auto-advance interval */
    HERO_SLIDER_INTERVAL: 5000,
    /** Debounce delay for search inputs */
    DEBOUNCE_DELAY: 300,
} as const;

// =============================================================================
// Breakpoints (matching Tailwind defaults)
// =============================================================================

export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    "2XL": 1536,
} as const;

// =============================================================================
// API & Cache
// =============================================================================

export const CACHE = {
    /** Default revalidation time for static data (in seconds) */
    REVALIDATE_DEFAULT: 3600, // 1 hour
    /** Short revalidation for frequently changing data */
    REVALIDATE_SHORT: 300, // 5 minutes
    /** Long revalidation for rarely changing data */
    REVALIDATE_LONG: 86400, // 24 hours
} as const;

// =============================================================================
// Form Validation
// =============================================================================

export const VALIDATION = {
    /** Maximum characters for name fields */
    NAME_MAX_LENGTH: 100,
    /** Maximum characters for email fields */
    EMAIL_MAX_LENGTH: 255,
    /** Maximum characters for message/description fields */
    MESSAGE_MAX_LENGTH: 5000,
    /** Maximum characters for phone number fields */
    PHONE_MAX_LENGTH: 30,
    /** Spam protection: max attempts before requiring captcha */
    MAX_ATTEMPTS_BEFORE_CAPTCHA: 1,
    /** Spam protection: cookie expiry in seconds */
    ATTEMPTS_COOKIE_EXPIRY: 3600, // 1 hour
} as const;

// =============================================================================
// Image Sizes
// =============================================================================

export const IMAGE_SIZES = {
    /** Thumbnail size for grid items */
    THUMBNAIL: { width: 400, height: 300 },
    /** Card size for project/blog cards */
    CARD: { width: 600, height: 400 },
    /** Hero size for full-width banners */
    HERO: { width: 1920, height: 1080 },
    /** Avatar size for team members */
    AVATAR: { width: 200, height: 200 },
    /** Logo size for clients */
    LOGO: { width: 200, height: 100 },
} as const;

// =============================================================================
// Content Limits
// =============================================================================

export const LIMITS = {
    /** Maximum featured projects to show on homepage */
    FEATURED_PROJECTS: 6,
    /** Maximum latest news to show on homepage */
    LATEST_NEWS: 3,
    /** Maximum clients to show in marquee */
    CLIENT_LOGOS: 20,
    /** Maximum expertise items to display */
    EXPERTISE_ITEMS: 8,
} as const;

// =============================================================================
// External Links & Social
// =============================================================================

export const EXTERNAL_LINKS = {
    /** Default target for external links */
    TARGET: "_blank",
    /** Default rel for external links */
    REL: "noopener noreferrer",
} as const;

// =============================================================================
// Accessibility
// =============================================================================

export const A11Y = {
    /** Skip link target ID */
    SKIP_LINK_TARGET: "primary",
    /** Focus ring offset */
    FOCUS_RING_OFFSET: 2,
} as const;
