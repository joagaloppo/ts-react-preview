import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

function Button({ children, variant = "outline", size = "sm", className, ...props }: ButtonProps) {
  const variants = {
    filled: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "bg-white text-blue-500 border border-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50",
  };

  const sizes = {
    xs: "py-2 px-4",
    sm: "py-2.5 px-4",
    md: "py-3 px-6",
    lg: "py-3.5 px-8",
    xl: "py-4 px-10",
  };

  const transition = "transition duration-300 ease-in-out";

  return (
    <button className={clsx(variants[variant], sizes[size], transition, "font-medium rounded-sm text-base", className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
