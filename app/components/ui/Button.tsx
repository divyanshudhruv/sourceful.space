import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) => {
  const baseClasses =
    "px-5 py-3 rounded-md font-medium transition-colors duration-200 text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-300";

  const variantClasses = {
    primary: "bg-[#18181B] text-white hover:bg-[#27272A] cursor-pointer ",
    secondary:
      "bg-white text-[#18181B] border border-gray-200 hover:bg-gray-50",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
