import { FormValues } from "./SubmitButtonForm";
import { useFormContext, useWatch } from "react-hook-form";

export function SubmitButtonWatch() {
  const { watch } = useFormContext<FormValues>();
  const { isAgreed, userName } = watch();
  const enabled = !!isAgreed && !!userName;

  return <button disabled={!enabled}>전송</button>;
}

export function SubmitButtonUseWatch() {
  const { control } = useFormContext<FormValues>();
  const { isAgreed, userName } = useWatch<FormValues>({ control });
  const enabled = !!isAgreed && !!userName;

  return <button disabled={!enabled}>전송</button>;
}
