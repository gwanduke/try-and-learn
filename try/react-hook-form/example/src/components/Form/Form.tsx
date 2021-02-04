import "./Form.scss";
import { ReactNode, FormHTMLAttributes } from "react";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const Form = ({ children, ...props }: Props) => {
  return (
    <form className="Form" {...props}>
      {children}
    </form>
  );
};
