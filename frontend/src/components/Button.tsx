import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

const variantStyles = {
  primary: "border-cyan-600 text-cyan-500 hover:bg-cyan-600/20",
  secondary: "border-red-600 text-red-500 hover:bg-red-600/20",
};

const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "cursor-pointer rounded-2xl border px-4 py-2 transition-colors",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
