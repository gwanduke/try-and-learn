import { useState } from "react";
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";

export const maskPhoneNumber = (phone: string) => {
  //Example: 0(999) 999 99 99
  const x = phone
    .replace(/\D/g, "")
    .match(/(\d?)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/) as any;
  return !x[3]
    ? x[1] + x[2]
    : `${x[1]}(${x[2]}) ${x[3]}${x[4] ? ` ${x[4]}` : ""}${
        x[5] ? ` ${x[5]}` : ""
      }`;
};

export function UncontrolledFormat() {
  const methods = useForm({
    defaultValues: {
      phoneNumber: "1(112) 131 23",
    },
  });
  const { register, handleSubmit, setValue } = methods;

  const onSubmit = (data: any) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UncontrolledInput />
        <button>Submit</button>
        <hr />
        <Watcher />
      </form>
    </FormProvider>
  );
}

function Watcher() {
  const { watch } = useFormContext();
  const { phoneNumber } = useWatch({});

  return <div>{(phoneNumber as string) || ""}</div>;
}

function UncontrolledInput() {
  const { register, setValue } = useFormContext();

  return (
    <input
      type="tel"
      name="phoneNumber"
      ref={register}
      onChange={(e) => {
        setValue("phoneNumber", maskPhoneNumber(e.target.value));
      }}
    />
  );
}
function ControlledInput() {
  const { field, meta } = useController({
    name: "phoneNumber",
  });

  return (
    <input
      type="tel"
      name={field.name}
      ref={field.ref}
      value={field.value}
      onChange={(e) => {
        field.onChange(maskPhoneNumber(e.target.value));
      }}
    />
  );
}
