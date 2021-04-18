import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Wrapper } from "../../components";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";

interface User {
  userName: string;
  isAgreed: boolean;
}

export interface FormValues {
  users: User[];
}

export const TabForm = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      users: [
        {
          userName: "1번",
          isAgreed: false,
        },
        {
          userName: "2번이 될",
          isAgreed: false,
        },
        {
          userName: "4번 이었던",
          isAgreed: false,
        },
      ],
    },
  });
  const { register, control, getValues, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray<User>({
    control,
    name: "users",
  });

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      {/* <DevTool control={control} /> */}
      <FormProvider {...methods}>
        <Wrapper>
          <h2>TabForm 컴포넌트</h2>

          <button
            onClick={() => {
              append({
                userName: "",
                isAgreed: false,
              });
              setTabIndex(fields.length);
            }}
          >
            추가
          </button>

          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              {fields.map((field, index) => (
                <Tab>{field.userName || `사이트 ${index + 1}`}</Tab>
              ))}
            </TabList>

            <TabPanels>
              {fields.map((field, index) => (
                <TabPanel key={field.id}>
                  <h3>{`사이트 ${index}`}</h3>
                  <input
                    ref={register({
                      required: true,
                    })}
                    type="text"
                    name={`users[${index}].userName`}
                  />
                  <input
                    ref={register()}
                    type="checkbox"
                    name={`users[${index}].isAgreed`}
                  />
                  <span
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    삭제
                  </span>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>

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
        </Wrapper>
      </FormProvider>
    </>
  );
};
