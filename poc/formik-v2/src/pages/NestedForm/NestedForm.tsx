import { Wrapper } from "../../components";
import { Button } from "@chakra-ui/button";
import { TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { memo, useState } from "react";
import { defaultFormValues, defaultUserValues } from "./defaultValues";
import { UserSelector } from "./components/UserSelector";
import { FieldArray, Form, Formik, useField, useFormikContext } from "formik";
import { UserField } from "./fields/UserField";
import * as yup from "yup";
import { MainForm, User } from "./types";

const schema = yup.object({
  users: yup.array(
    yup.object({
      name: yup.string().required("이름은 필수입니데이"),
      subscriptions: yup.array(),
    })
  ),
});

const UserName = ({ index }: any) => {
  const [{ value }] = useField<User["name"]>({
    name: "users[0].name",
  });

  return <div>{value}</div>;
};
const MemoizedUserName = memo(UserName);

const UserList = () => {
  const { values } = useFormikContext<MainForm>();
  return (
    <TabPanels>
      {values.users.map((user, index) => (
        <TabPanel>
          <MemoizedUserName index={index} />

          <UserField index={index} />
        </TabPanel>
      ))}
    </TabPanels>
  );
};

export const NestedForm = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Formik
      initialValues={defaultFormValues}
      onSubmit={(values, err) => {
        console.log(err);
        console.log(JSON.stringify(values, null, 2));
      }}
      validationSchema={schema}
    >
      <Wrapper>
        {/* {JSON.stringify(errors)} */}
        <Form>
          <h2>NestedForm 컴포넌트</h2>
          <FieldArray name="users">
            {(usersHelper) => (
              <>
                <UserSelector
                  currentIndex={tabIndex}
                  onClick={(index: number) => {
                    setTabIndex(index);
                  }}
                  onAdd={() => {
                    usersHelper.push(defaultUserValues);
                  }}
                  onDelete={(index) => {
                    usersHelper.remove(index);
                  }}
                  onLoad={(index) => {
                    // console.log(buildUserFieldName(index, "name"));
                    // console.log(getValues().users[0].name);
                    // console.log(buildUserFieldName(index, "subscriptions"));
                    // console.log(getValues().users[0].subscriptions);
                    // reset(getValues());
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
                  <UserList />
                </Tabs>
                <button type="submit">전송</button>
              </>
            )}
          </FieldArray>
        </Form>
      </Wrapper>
    </Formik>
  );
};
