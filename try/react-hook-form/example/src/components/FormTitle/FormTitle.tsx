import "./FormTitle.scss";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

export const FormTitle = ({ title, ...props }: Props) => {
  return (
    <h1 className="FormTitle" {...props}>
      {title}
    </h1>
  );
};
