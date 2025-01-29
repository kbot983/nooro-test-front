import React from "react";
import Icon from "@mdi/react";

interface ButtonProps {
  icon?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  icon,
  children,
  type = "button",
}) => {
  const allClasses = `bg-primary-dark mb-8 flex w-full items-center justify-center rounded p-4 font-bold text-white transition-colors duration-300 hover:bg-secondary focus:outline-secondary ${className}`;
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={allClasses}
    >
      {children}
      {icon && <Icon path={icon} size={1} className="ml-1 inline-block" />}
    </button>
  );
};

export default Button;
