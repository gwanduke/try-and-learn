import { Formik } from "formik";
import { Wrapper } from "../../components";
import { Input } from "@chakra-ui/input";

export interface FormValues {
  userName: string;
  nickName: string;
  isAgreed: boolean;
}

export const ConditionalForm = () => {
  // const methods = useForm<FormValues>({
  //   shouldUnregister: true,
  //   defaultValues: {
  //     userName: "",
  //   },
  // });
  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   getValues,
  //   watch,
  //   setValue,
  // } = methods;

  return (
    <>
      <Wrapper>
        <h2>ConditionalForm 컴포넌트</h2>
        <p>
          shouldUnregister가 false이고 defaultValues가 제공되어야만 unregister
          되지 않습니다. 화면에 보이지 않는 컴포넌트는 register되지 않습니다.
        </p>
        <Formik
          initialValues={{
            name: "jared",
            isAgreed: false,
            userName: "",
            nickName: "",
          }}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values, handleChange, handleSubmit, submitForm }) => (
            <>
              <div>
                <Input
                  type="checkbox"
                  name="isAgreed"
                  onChange={handleChange}
                />
                {values.isAgreed && (
                  <Input
                    type="text"
                    name="userName"
                    onChange={handleChange}
                    // ref={register({
                    //   required: true,
                    // })}
                  />
                )}
                <Input
                  style={{ display: values.isAgreed ? "block" : "none" }}
                  type="text"
                  name="nickName"
                  onChange={handleChange}
                  // ref={register({
                  //   required: true,
                  // })}
                />
              </div>

              <div>
                <button
                  onClick={() => {
                    submitForm();
                  }}
                >
                  전송
                </button>
              </div>
            </>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};
