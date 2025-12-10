/**
 * Framer Motion Animation Variants
 * Centralized animation definitions for consistent motion across the app.
 */

import type { Variants, Transition } from "framer-motion";
import { ANIMATION } from "./constants";

// =============================================================================
// Common Transitions
// =============================================================================

export const transitions = {
    /** Fast ease-out transition */
    fast: {
        duration: ANIMATION.FAST / 1000,
        ease: "easeOut",
    } as Transition,

    /** Standard ease-out transition */
    default: {
        duration: ANIMATION.NORMAL / 1000,
        ease: "easeOut",
    } as Transition,

    /** Slow ease-in-out transition */
    slow: {
        duration: ANIMATION.SLOW / 1000,
        ease: "easeInOut",
    } as Transition,

    /** Spring animation for natural feel */
    spring: {
        type: "spring",
        stiffness: 300,
        damping: 30,
    } as Transition,

    /** Bouncy spring for playful animations */
    bouncy: {
        type: "spring",
        stiffness: 400,
        damping: 25,
    } as Transition,
};

// =============================================================================
// Fade Variants
// =============================================================================

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: transitions.default,
    },
    exit: {
        opacity: 0,
        transition: transitions.fast,
    },
};

export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitions.default,
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: transitions.fast,
    },
};

export const fadeInDown: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitions.default,
    },
};

export const fadeInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: transitions.default,
    },
};

export const fadeInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: transitions.default,
    },
};

// =============================================================================
// Scale Variants
// =============================================================================

export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: transitions.default,
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: transitions.fast,
    },
};

export const scaleOnHover: Variants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: transitions.fast,
    },
    tap: {
        scale: 0.98,
        transition: transitions.fast,
    },
};

export const cardHover: Variants = {
    initial: {
        scale: 1,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
    hover: {
        scale: 1.02,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
        transition: transitions.default,
    },
};

// =============================================================================
// Stagger Variants (for lists)
// =============================================================================

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitions.default,
    },
};

export const staggerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

// =============================================================================
// Slide Variants (for panels, drawers)
// =============================================================================

export const slideInRight: Variants = {
    hidden: {
        x: "100%",
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: transitions.default,
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: transitions.default,
    },
};

export const slideInLeft: Variants = {
    hidden: {
        x: "-100%",
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: transitions.default,
    },
    exit: {
        x: "-100%",
        opacity: 0,
        transition: transitions.default,
    },
};

export const slideInUp: Variants = {
    hidden: {
        y: "100%",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: transitions.default,
    },
    exit: {
        y: "100%",
        opacity: 0,
        transition: transitions.default,
    },
};

export const slideInDown: Variants = {
    hidden: {
        y: "-100%",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: transitions.default,
    },
    exit: {
        y: "-100%",
        opacity: 0,
        transition: transitions.default,
    },
};

// =============================================================================
// Modal/Overlay Variants
// =============================================================================

export const modalBackdrop: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: transitions.fast,
    },
    exit: {
        opacity: 0,
        transition: transitions.fast,
    },
};

export const modalContent: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: transitions.spring,
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: transitions.fast,
    },
};

// =============================================================================
// Page Transition Variants
// =============================================================================

export const pageTransition: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: ANIMATION.NORMAL / 1000,
            ease: "easeInOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: ANIMATION.FAST / 1000,
            ease: "easeInOut",
        },
    },
};

// =============================================================================
// Utility: Scroll-triggered animations
// =============================================================================

/**
 * Creates viewport animation props for scroll-triggered animations
 */
export const scrollAnimation = {
    initial: "hidden",
    whileInView: "visible",
    viewport: {
        once: true,
        margin: "-100px",
    },
};

/**
 * Creates hover animation props
 */
export const hoverAnimation = {
    initial: "initial",
    whileHover: "hover",
    whileTap: "tap",
};
