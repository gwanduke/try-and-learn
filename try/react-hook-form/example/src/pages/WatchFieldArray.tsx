import { useEffect } from "react";
import {
  useForm,
  FormProvider,
  useWatch,
  Control,
  useFormContext,
  useFieldArray,
} from "react-hook-form";

export default function WatchFieldArray() {
  const methods = useForm({
    defaultValues: {
      user: {},
      items: [],
    },
  });
  const { register, watch, handleSubmit } = methods;

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ItemsField />
        <div>
          <Reflect />
        </div>
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

function ItemsField() {
  const { fields, append, remove } = useFieldArray({
    name: "items",
  });
  const { items } = useWatch({});

  return (
    <div>
      <h1>ItemsField</h1>- Len: {items.length}... {fields.length}
      {fields.map(({ id, name }, i) => {
        return (
          <div key={id}>
            name: {name}
            <span onClick={() => remove(i)}>X</span>
          </div>
        );
      })}
      <button onClick={() => append({ name: "a" })}>추가</button>
    </div>
  );
}

function Reflect() {
  const { watch } = useFormContext();
  const { items } = watch();

  console.log(watch());
  // const { items } = useWatch({});
  // const items = useWatch({ name: "items" });

  return <div>{(items as any).length}</div>;
}
