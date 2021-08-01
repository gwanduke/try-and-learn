import { FormValues } from "./SubmitButtonForm";
import { useFormContext, useWatch } from "react-hook-form";

export function SubmitButtonWatch() {
  const { watch } = useFormContext<FormValues>();
  const { isAgreed, userName } = watch();
  const enabled = !!isAgreed && !!userName;

  return <button disabled={!enabled}>{enabled ? "전송" : "전송불가"}</button>;
}

export function SubmitButtonUseWatch() {
  const { control } = useFormContext<FormValues>();
  const { isAgreed, userName } = useWatch<FormValues>({ control });
  console.log(isAgreed, userName);
  const enabled = !!isAgreed && !!userName;

  return <button disabled={!enabled}>{enabled ? "전송" : "전송불가"}</button>;
}
