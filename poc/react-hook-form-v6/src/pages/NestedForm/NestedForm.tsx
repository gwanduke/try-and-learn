import {
  ArrayField,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Wrapper } from "../../components";
import { MainForm, User } from "./type";
import { UserField } from "./UserField";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useState } from "react";

const defaultFormValues: MainForm = {
  users: [
    {
      name: "sfdsdfsf",
      subscriptions: [
        {
          name: "넷플릭스",
          paymentType: "ONCE",
          paymentDayTerm: "1년",
        },
      ],
    },
    {
      name: "sdfsdfsdfds",
      subscriptions: [
        {
          name: "asdfsadf",
          paymentType: "MANY",
          paymentDayTerm: "1년",
        },
        {
          name: "asdfasdf",
          paymentType: "MANY",
          paymentDayTerm: "1달",
        },
      ],
    },
    {
      name: "",
    },
    {
      name: "sdfdsfsdfsdfsdf",
    },
    {
      name: "",
    },
    {
      name: "추가",
      subscriptions: [
        {
          name: "dsafsdf",
          paymentType: "MANY",
          paymentDayTerm: "1달",
        },
      ],
    },
    {
      name: "sfsdfsdf",
    },
  ],
};

const defaultUserFormValues: User = {
  name: "",
  subscriptions: [],
};

export const NestedForm = () => {
  const methods = useForm<MainForm>({
    defaultValues: defaultFormValues,
  });
  const { control, handleSubmit, getValues, formState } = methods;
  const { fields, append, remove } = useFieldArray<User>({
    name: "users",
    control,
  });

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
        <FormProvider {...methods}>
          <UserList
            fields={fields}
            onClick={(index: number) => {
              setTabIndex(index);
            }}
            onAdd={() => {
              append(defaultUserFormValues);
            }}
            onDelete={(index) => {
              remove(index);
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

function UserList({
  fields,
  onClick,
  onAdd,
  onDelete,
}: {
  fields: Partial<ArrayField<User, "id">>[];
  onClick: (index: number) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
}) {
  const { control } = useFormContext<MainForm>();
  const { users } = useWatch<MainForm>({ control });

  return (
    <Wrap spacing="24px">
      {fields.map((field, index) => (
        <WrapItem key={field.id}>
          <ButtonGroup
            size="sm"
            colorScheme="teal"
            isAttached
            variant="outline"
          >
            <Button
              onClick={() => {
                onClick(index);
              }}
            >
              {users?.[index]?.name || ""}
            </Button>
            <IconButton
              aria-label="Remove"
              icon={<MinusIcon />}
              onClick={() => {
                onDelete(index);
              }}
            />
          </ButtonGroup>
        </WrapItem>
      ))}
      <WrapItem>
        <Button
          colorScheme="teal"
          variant="solid"
          leftIcon={<AddIcon />}
          onClick={onAdd}
        >
          추가
        </Button>
      </WrapItem>
    </Wrap>
  );
}
