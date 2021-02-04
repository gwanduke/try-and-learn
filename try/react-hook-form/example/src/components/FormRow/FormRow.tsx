import "./FormRow.scss";
import { ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  field: ReactNode;
}

export const FormRow = ({ label, field }: Props) => {
  return (
    <div className="FormRow">
      <div className="FormRow__label">{label}</div>
      <div className="FormRow__field">{field}</div>
    </div>
  );
};
