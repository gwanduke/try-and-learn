import "./Label.scss";
import { ReactNode, LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ children, ...props }: Props) => {
  return (
    <label className="Label" {...props}>
      {children}
    </label>
  );
};
