import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";

let lv1Count = 0;
let lv2Count = 0;

export default function TestWatchRerenderUncontrolled() {
  return (
    <div>
      <pre style={{ padding: 10, backgroundColor: "#ccc" }}>안녕하세요~!</pre>
      <UpperForm />
    </div>
  );
}

function UpperForm() {
  const { register, watch } = useForm({});

  const up = watch("up");

  return (
    <div>
      <h1>UpperForm</h1>
      <div style={{ padding: 10 }}>UpperForm</div>
      {up}
      <input
        id="d1"
        name="up"
        type="text"
        ref={register({
          required: "필수입니다",
          minLength: {
            value: 10,
            message: "10자리 이상을 입력하세요",
          },
        })}
      />
      <Form />
    </div>
  );
}

function Form() {
  const methods = useForm({});
  const { register, errors, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Watcher />
      <div
        style={{
          padding: 20,
        }}
      >
        <div>
          <label htmlFor="d1">1 Level - {lv1Count++}</label>
          <input
            id="d1"
            name="name1"
            type="text"
            ref={register({
              required: "필수입니다",
              minLength: {
                value: 10,
                message: "10자리 이상을 입력하세요",
              },
            })}
          />
          {errors.name1?.message}
        </div>
        <Level2 />
        <button
          onClick={handleSubmit((values) => {
            alert(values);
          })}
        >
          전송
        </button>
      </div>
    </FormProvider>
  );
}

function Level2() {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor="d2">2 Level - {lv2Count++}</label>
      <input id="d2" name="name2" type="text" ref={register} />
    </div>
  );
}

// 이름 지정에 따라 다르게 반응
function Watcher() {
  // const { name1 } = useWatch({});
  const name1 = useWatch({ name: "name1" });

  // const { watch } = useFormContext();
  // const { name1 } = watch();

  // const { watch } = useFormContext();
  // const name1 = watch("name1");

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <div>NAME1: {name1 as string}</div>
    </div>
  );
}
