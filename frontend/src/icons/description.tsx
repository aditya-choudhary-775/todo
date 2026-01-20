import React from "react";
import { motion, AnimatePresence } from "motion/react";

export const IconDescription = ({
  className,
  onClick,
  show,
  checked,
}: {
  className: string;
  onClick?: () => void;
  show?: Boolean;
  checked: Boolean;
}) => {
  return (
    <AnimatePresence initial={false}>
      {show !== false && (
        <motion.svg
          layoutId="desc"
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          onClick={onClick}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 10h-14" />
          <path d="M5 6h14" />
          <path d="M14 14h-9" />
          <path d="M5 18h6" />

          {checked ? (
            <path d="M15 19l2 2l4 -4" />
          ) : (
            <>
              <path d="M18 15v6" />
              <path d="M15 18h6" />
            </>
          )}
        </motion.svg>
      )}
    </AnimatePresence>
  );
};
