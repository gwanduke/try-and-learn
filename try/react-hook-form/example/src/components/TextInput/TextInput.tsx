import "./TextInput.scss";
import { InputHTMLAttributes } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onDelete?: () => void;
}

export const TextInput = ({ onDelete, ...props }: Props) => {
  const { setValue, register, control } = useFormContext();
  const value = useWatch({
    control,
    name: props.name,
  });

  return (
    <div className="TextInput">
      <input className="TextInput__input" ref={register} {...props} />
      {value && (
        <span
          className="TextInput__del"
          onClick={() => {
            setValue(props.name, "");
          }}
        >
          (Del)
        </span>
      )}
    </div>
  );
};
