import {
  FormProvider,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Wrapper } from "../../components";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";

export interface FormValues {
  name: string;
  age: number;
  address: string;
}

export const IsolationForm = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: 0,
      address: "",
    },
  });

  return (
    <>
      {/* <DevTool control={control} /> */}
      <FormProvider {...methods}>
        <Wrapper>
          <h2>IsolationForm 컴포넌트</h2>
          <NameFieldControl />
          <AgeFieldControl />
          <AddressFieldControl />
        </Wrapper>
        <button
          onClick={() => {
            console.log(JSON.stringify(methods.getValues(), null, 2));
          }}
        >
          값 확인
        </button>
      </FormProvider>
    </>
  );
};

function NameField() {
  const { register } = useFormContext<FormValues>();

  return <input ref={register} type="text" name="name" />;
}

function AgeField() {
  const { register } = useFormContext<FormValues>();
  return <input ref={register} type="text" name="age" />;
}

function AddressField() {
  const { register } = useFormContext<FormValues>();

  return <input ref={register} type="text" name="address" />;
}

function NameFieldControl() {
  const { field } = useController({
    name: "name",
  });

  return (
    <input
      onChange={(e) => {
        field.onChange(e.target.value);
      }}
      type="text"
      value={field.value}
    />
  );
}

function AgeFieldControl() {
  const { field } = useController({
    name: "age",
  });
  return (
    <input
      onChange={(e) => {
        field.onChange(e.target.value);
      }}
      type="text"
      value={field.value}
    />
  );
}

function AddressFieldControl() {
  const { field } = useController({
    name: "address",
  });

  return (
    <input
      onChange={(e) => {
        field.onChange(e.target.value);
      }}
      type="text"
      value={field.value}
    />
  );
}
