"use client";

// ============================================
// Reusable Button Component
// ============================================

import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "success" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  href,
  external = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-rose-600 to-orange-500 text-white hover:from-rose-700 hover:to-orange-600 focus:ring-rose-500 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50",
    secondary:
      "bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 focus:ring-slate-500",
    outline: "border-2 border-rose-500 text-rose-600 hover:bg-rose-50 focus:ring-rose-500 hover:border-rose-600",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500",
    success:
      "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 focus:ring-emerald-500",
    whatsapp:
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 focus:ring-green-400 shadow-lg shadow-green-500/30",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-2.5",
  };

  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim();

  const content = (
    <>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && leftIcon}
      {children}
      {rightIcon}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};

export default Button;
