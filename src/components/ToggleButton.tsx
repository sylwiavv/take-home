import React from "react";

interface ToggleButtonProps {
  className: string;
  buttonText: string;
  disabled?: boolean;
  onClick: () => void;
}

export const ToggleButton = ({
  disabled = false,
  className,
  buttonText,
  onClick,
}: ToggleButtonProps) => {
  return (
    <button
      className={`text-white text-sm transition-colors rounded px-3 py-1 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};
