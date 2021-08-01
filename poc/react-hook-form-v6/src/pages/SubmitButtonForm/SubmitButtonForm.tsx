import { Controller, FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { SubmitButtonUseWatch, SubmitButtonWatch } from "./SubmitButton";
import { Wrapper } from "../../components";

export interface FormValues {
  userName: string;
  isAgreed: boolean;
}

export const SubmitButtonForm = () => {
  const methods = useForm<FormValues>();
  const { register, control } = methods;

  return (
    <>
      <Wrapper>
        <h2>SubmitButtonForm 컴포넌트</h2>
        <FormProvider {...methods}>
          {/* <DevTool control={control} /> */}
          {/* <div>
            <input ref={register} type="text" name="userName" />
          </div>
          <div>
            <input ref={register} type="checkbox" name="isAgreed" />
          </div> */}
          <div>
            <Controller
              name="userName"
              defaultValue=""
              render={({ name, onChange, ref, value }) => (
                <input
                  ref={ref}
                  type="text"
                  name={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="isAgreed"
              defaultValue={false}
              render={({ name, onChange, ref, value }) => (
                <input
                  ref={ref}
                  type="checkbox"
                  name={name}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                />
              )}
            />
          </div>

          <div>
            <SubmitButtonUseWatch />
          </div>
        </FormProvider>
      </Wrapper>
    </>
  );
};
