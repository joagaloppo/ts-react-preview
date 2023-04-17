import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "filled" | "outline";
  padding?: "xs" | "sm" | "md" | "lg" | "xl";
}

function Input({ variant = "outline", padding = "sm", className, ...props }: InputProps) {
  const variants = {
    outline: "border border-gray-300 bg-white text-gray-900",
    filled: "border border-gray-300 bg-gray-100 text-gray-900",
  };

  const paddings = {
    xs: "py-2 px-3",
    sm: "py-2.5 px-3",
    md: "py-3 px-3",
    lg: "py-3.5 px-3.5",
    xl: "py-4 px-4",
  };

  const transition = "transition duration-300 ease-in-out";

  return (
    <input
      className={clsx(variants[variant], paddings[padding], transition, "w-full rounded-sm outline-none text-base", className)}
      {...props}
    />
  );
}

export default Input;
