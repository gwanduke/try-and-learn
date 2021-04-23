import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Wrapper } from "../../components";
import { MainForm, PaymentType, User } from "./types";
import { Button } from "@chakra-ui/button";
import { TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useState } from "react";
import { defaultFormValues, defaultUserValues } from "./defaultValues";
import { UserSelector } from "./components/UserSelector";
import { UserField } from "./fields/UserField";

export const NestedForm = () => {
  const methods = useForm<MainForm>({
    defaultValues: defaultFormValues,
  });
  const {
    control,
    handleSubmit,
    getValues,
    formState,
    setValue,
    reset,
  } = methods;
  const { fields, append, remove } = useFieldArray<User>({
    name: "users",
    control,
  });
  const { users } = useWatch<MainForm>({ control });

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <DevTool control={control} />
      <Wrapper>
        <h2>NestedForm 컴포넌트</h2>
        <p>
          index 설정에 주의해야한다. 오타가 나지 않도록 조심하자. 타입을 줄
          방법이 있을까? 하위 필드를 사용할 때는 key를 꼭 전달하자. useForm에서
          전달한 기본값이 있더라도, 각 인풋에 defaultValue가 전달되지 않으면
          값이 올바르게 표시되지 않는다.
        </p>
        <p>
          defaultValues를 지정한들, register 되어있지 않으면 폼값으로 가지지
          않는다.
        </p>
        <span
          onClick={() => {
            setValue("users", [
              {
                name: "김관덕",
                subscriptions: [
                  {
                    name: "내 값1",
                    paymentType: PaymentType.MANY,
                    paymentDayTerm: "1달",
                  },
                  {
                    name: "내 값2",
                    paymentType: PaymentType.ONCE,
                    paymentDayTerm: "1달",
                  },
                  {
                    name: "내 값3",
                    paymentType: PaymentType.MANY,
                    paymentDayTerm: "1달",
                  },
                ],
              },
              {
                name: "김관덕2",
              },
              {
                name: "김관덕3",
              },
            ]);
          }}
        >
          hihhihihi
        </span>
        <FormProvider {...methods}>
          <UserSelector
            currentIndex={tabIndex}
            fields={fields}
            onClick={(index: number) => {
              setTabIndex(index);
            }}
            onAdd={() => {
              append(defaultUserValues);
            }}
            onDelete={(index) => {
              remove(index);
            }}
            onLoad={(index) => {
              // console.log(buildUserFieldName(index, "name"));
              // console.log(getValues().users[0].name);

              // console.log(buildUserFieldName(index, "subscriptions"));
              // console.log(getValues().users[0].subscriptions);

              console.log(getValues());

              reset(getValues());
              // setValue("users[0].subscriptions", [
              //   ...(getValues().users[0].subscriptions || []),
              // ]);
              // setValue("users[0].subscriptions[0]", {
              //   name: "hi",
              // });
              // console.log(JSON.stringify(getValues(), null, 2));
            }}
          />
          <Tabs index={tabIndex}>
            <TabPanels>
              {fields.map((field, index) => (
                <TabPanel key={field.id}>
                  <UserField field={field} index={index} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          <Button
            onClick={() => {
              console.log("폼값", JSON.stringify(getValues(), null, 2));

              handleSubmit(
                () => {
                  console.log("---------성공-----------");
                  console.log(formState);
                },
                (error) => {
                  console.log("---------에러-----------");

                  const tabIndex = (error.users || []).findIndex(Boolean);
                  if (tabIndex !== -1) {
                    setTabIndex(tabIndex);
                  }
                }
              )();
            }}
          >
            전송
          </Button>
        </FormProvider>
      </Wrapper>
    </>
  );
};
