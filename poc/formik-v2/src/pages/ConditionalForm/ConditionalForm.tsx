import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Wrapper } from "../../components";
import { useEffect } from "react";

export interface FormValues {
  userName: string;
  nickName: string;
  isAgreed: boolean;
}

export const ConditionalForm = () => {
  const methods = useForm<FormValues>({
    shouldUnregister: true,
    defaultValues: {
      userName: "",
    },
  });
  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
  } = methods;

  const { isAgreed, nickName, userName } = watch();

  return (
    <>
      <DevTool control={control} />
      <Wrapper>
        <h2>ConditionalForm 컴포넌트</h2>
        <p>
          shouldUnregister가 false이고 defaultValues가 제공되어야만 unregister
          되지 않습니다. 화면에 보이지 않는 컴포넌트는 register되지 않습니다.
        </p>
        <FormProvider {...methods}>
          <div>
            <input ref={register} type="checkbox" name="isAgreed" />
            {isAgreed && (
              <input
                type="text"
                name="userName"
                ref={register({
                  required: true,
                })}
              />
            )}
            <input
              style={{ display: isAgreed ? "block" : "none" }}
              type="text"
              name="nickName"
              ref={register({
                required: true,
              })}
            />
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
