import React, { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";

export const Chevron = ({
  className,
  onClick,
  openDesc,
}: {
  className: string;
  onClick: () => void;
  openDesc: Boolean;
}) => {
  return (
    <motion.svg
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
      <motion.path
      animate={{
        rotate: openDesc ? 180 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      d="M6 9l6 6l6 -6" />
    </motion.svg>
  );
};
