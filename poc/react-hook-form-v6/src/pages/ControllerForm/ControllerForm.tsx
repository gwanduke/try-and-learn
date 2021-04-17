import { Controller, FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Wrapper } from "../../components";

export interface FormValues {
  A: string;
  B: string;
  C: string;
}

const validateRequired = () => {};

export const ControllerForm = () => {
  const methods = useForm<FormValues>({
    shouldFocusError: false,
  });
  const { register, handleSubmit, getValues, control } = methods;

  return (
    <>
      <DevTool control={control} />
      <Wrapper>
        <h2>ControllerForm 컴포넌트</h2>
        <p>
          Controlled 보다 ref로 전달된 register가 먼저 일어나며, 에러시
          Controlled보다 먼저 포커스 처리된다.
        </p>
        <FormProvider {...methods}>
          <div>
            <input
              ref={register({
                validate: (value) => {
                  return value ? true : "에러입니다";
                },
              })}
              type="text"
              name="A"
            />
          </div>
          <div>
            <Controller
              name="B"
              control={control}
              rules={{
                required: true,
              }}
              render={({ name, onChange, value, ref }) => (
                <input
                  ref={(innerRef) => {
                    ref.current = innerRef;
                  }}
                  type="text"
                  name={name}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                />
              )}
            />
          </div>
          <div>
            <input ref={register({ required: true })} type="text" name="C" />
          </div>

          <div>
            <button
              onClick={handleSubmit(
                () => {
                  console.log("---------성공-----------");
                  console.log(JSON.stringify(getValues(), null, 2));
                },
                (error) => {
                  console.log("---------에러-----------");
                  console.log(JSON.stringify(getValues(), null, 2));
                  console.log(error);
                  if (error && error.B && error.B.ref && error.B.ref.focus) {
                    error.B?.ref?.focus();
                  }
                }
              )}
            >
              전송
            </button>
          </div>
        </FormProvider>
      </Wrapper>
    </>
  );
};
