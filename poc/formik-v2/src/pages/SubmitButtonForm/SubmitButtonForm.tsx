import { FastField, Field, Formik, useField, useFormikContext } from "formik";
import { memo } from "react";
import { Wrapper } from "../../components";

export interface FormValues {
  userName: string;
  isAgreed: boolean;
}

export const SubmitButtonForm = () => {
  // const methods = useForm<FormValues>();
  // const { register, control } = methods;

  return (
    <>
      <Wrapper>
        <h2>SubmitButtonForm 컴포넌트</h2>
        <Formik
          initialValues={{ name: "jared", isAgreed: false }}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {() => (
            <>
              <div>
                <FastField name="userName" />
              </div>
              <Checkbox />

              <div>
                <SubmitButton />
              </div>
            </>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export function SubmitButton() {
  const { values, submitForm } = useFormikContext<FormValues>();
  const { isAgreed, userName } = values;
  const enabled = !!isAgreed && !!userName;

  console.log(values);

  return (
    <button disabled={!enabled} onClick={() => submitForm()}>
      전송
    </button>
  );
}

function Checkbox() {
  const [field] = useField({ name: "isAgreed" });
  return <input name={field.name} type="checkbox" onChange={field.onChange} />;
}
