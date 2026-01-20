import React from "react";
import { motion } from "motion/react";

export const CheckBox = ({
  className,
  checked,
  onClick,
}: {
  className: string;
  checked: boolean;
  onClick: () => void;
}) => {
  return (
    <svg
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
      <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: checked ? 1 : 0,
          opacity: checked ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        d="M9 12l2 2l4 -4"
      />
    </svg>
  );
};
