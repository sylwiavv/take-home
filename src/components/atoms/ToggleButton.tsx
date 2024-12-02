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
      className={`active:scale-95 duration-150 text-white transition-colors rounded px-3 py-1 text-[1rem] font-bold tracking-wide hover:scale-90 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};
