/**
 * Shared animation configurations for consistent animations across the app
 */

export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 24 },
};

export const slideDown = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
};

export const slideLeft = {
  initial: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
  duration: 0.2,
};

export const smoothTransition = {
  duration: 0.2,
  ease: "easeInOut" as const,
};

export const quickTransition = {
  duration: 0.1,
  ease: "easeInOut" as const,
};

export const deleteAnimation = {
  duration: 0.2,
  ease: "easeIn" as const,
};
