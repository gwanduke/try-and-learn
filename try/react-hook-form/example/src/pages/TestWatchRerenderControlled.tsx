import {
  Controller,
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";

let lv1Count = 0;
let lv2Count = 0;
let lv3Count = 0;

export default function TestWatchRerenderControlled() {
  const methods = useForm({});
  lv1Count += 1;

  return (
    <FormProvider {...methods}>
      <h1>Controlled를 사용했을 때 특성을 보자</h1>
      <div>
        <label htmlFor="d1">Controller, 1 Level - {lv1Count}</label>
        <Controller
          name="name1"
          render={({ name, onChange, ref, value }) => {
            return (
              <input
                id="d1"
                name={name}
                type="text"
                ref={ref}
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            );
          }}
        />
      </div>
      <Level2 />
    </FormProvider>
  );
}

function Level2() {
  const { field, meta } = useController({ name: "name2", defaultValue: "" });
  lv2Count += 1;

  return (
    <div>
      <label htmlFor="d2">useController, 2 Level - {lv2Count}</label>
      <input
        id="d2"
        name={field.name}
        type="text"
        ref={field.ref}
        onChange={(e) => field.onChange(e.target.value)}
        value={field.value}
      />
      <Level3 />
    </div>
  );
}

function Level3() {
  const { field, meta } = useController({ name: "name3", defaultValue: "" });
  lv3Count += 1;

  return (
    <div>
      <label htmlFor="d3">useController, 3 Level - {lv3Count}</label>
      <input
        id="d3"
        name={field.name}
        type="text"
        ref={field.ref}
        onChange={(e) => field.onChange(e.target.value)}
        value={field.value}
      />
    </div>
  );
}
