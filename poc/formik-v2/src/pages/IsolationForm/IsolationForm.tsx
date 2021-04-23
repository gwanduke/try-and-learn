import { Form, Formik, useField, useFormikContext } from "formik";
import { memo } from "react";
import { Wrapper } from "../../components";

export interface FormValues {
  name: string;
  age: number;
  address: string;
}

export const IsolationForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          age: 0,
          address: "",
        }}
        onSubmit={(values, err) => {
          console.log(err);
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Wrapper>
            <h2>IsolationForm 컴포넌트</h2>
            <A />
            <B />
            <C />
          </Wrapper>
          <button type="submit">값 확인</button>
        </Form>
      </Formik>
    </>
  );
};

function NameFieldControl() {
  const [{ onChange, value, name }, {}, {}] = useField({
    name: "name",
  });

  return <input name={name} onChange={onChange} type="text" value={value} />;
}
const A = memo(NameFieldControl);

function AgeFieldControl() {
  const [{ onChange, value, name }, {}, {}] = useField({
    name: "age",
  });

  return <input name={name} onChange={onChange} type="text" value={value} />;
}
const B = memo(AgeFieldControl);

function AddressFieldControl() {
  const { values } = useFormikContext<FormValues>();
  const [{ onChange, value, name }, {}, {}] = useField({
    name: "address",
  });

  return (
    <div>
      {values.name}

      <input name={name} onChange={onChange} type="text" value={value} />
    </div>
  );
}
const C = memo(AddressFieldControl);
