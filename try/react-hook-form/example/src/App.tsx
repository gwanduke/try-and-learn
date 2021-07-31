import { useEffect } from "react";
import {
  useForm,
  FormProvider,
  useWatch,
  Control,
  useFormContext,
} from "react-hook-form";

export default function App() {
  const methods = useForm({
    defaultValues: {
      user: {},
    },
  });
  const { register, watch, handleSubmit } = methods;
  const { user } = useWatch({ control: methods.control }); // when pass nothing as argument, you are watching everything

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="checkbox" name="user.showAge" ref={register()} />

        {/* based on yes selection to display Age Input*/}
        {user.showAge && (
          <input type="number" name="user.age" ref={register()} />
        )}

        <input type="submit" />

        <Inner />
      </form>
    </FormProvider>
  );
}

function Inner() {
  const { register, watch, handleSubmit, control } = useForm({
    defaultValues: {
      user: {},
    },
  });
  const { user } = useWatch({ control: control }); // when pass nothing as argument, you are watching everything

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Show</h1>
        <input type="checkbox" name="user.showAge2" ref={register()} />
        <FormDevTool control={control} />

        {user.showAge2 && <input type="number" name="age2" ref={register()} />}

        <input type="submit" />
      </form>
    </>
  );
}

const FormDevTool = ({
  ui = false,
  control,
}: {
  ui?: boolean;
  control?: Control;
}) => {
  const all = useWatch({ control });

  useEffect(() => {
    console.log(JSON.stringify(all, null, 2));
  }, [all]);

  return ui ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 100,
        zIndex: 9999,
        fontSize: 10,
        backgroundColor: "rgba(255, 255,255, 0.8)",
      }}
    >
      <pre>{JSON.stringify(all, null, 2)}</pre>
    </div>
  ) : null;
};
