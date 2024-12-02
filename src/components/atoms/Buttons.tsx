import { FC } from "react";
import { XMarkIcon } from "../../icons/icons"

type ButtonProps = React.ComponentProps<"button">;

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={`transition-colors flex items-center justify-center ${props.className}`} {...props}>
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button className="hover:bg-[#f871713b] rounded-full p-1 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};
