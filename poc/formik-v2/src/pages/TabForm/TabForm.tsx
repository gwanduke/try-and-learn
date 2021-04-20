import { Wrapper } from "../../components";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldArray, Formik } from "formik";

interface User {
  userName: string;
  isAgreed: boolean;
}

export interface FormValues {
  users: User[];
}

export const TabForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Formik
        initialValues={{
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
        }}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, handleChange, submitForm }) => (
          <FieldArray
            name="users"
            render={(arrayHelpers) => (
              <Wrapper>
                <h2>TabForm 컴포넌트</h2>

                <button
                  onClick={() => {
                    arrayHelpers.push({
                      userName: "",
                      isAgreed: false,
                    });
                    setTabIndex(values.users.length);
                  }}
                >
                  추가
                </button>

                <Tabs index={tabIndex} onChange={handleTabsChange}>
                  <TabList>
                    {values.users.map((field, index) => (
                      <Tab>{field.userName || `사이트 ${index + 1}`}</Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    {values.users.map((user, index) => (
                      <TabPanel>
                        <h3>{`사이트 ${index}`}</h3>
                        <Input
                          onChange={handleChange}
                          type="text"
                          name={`${arrayHelpers.name}[${index}].userName`}
                        />
                        <Checkbox
                          onChange={handleChange}
                          type="checkbox"
                          name={`users[${index}].isAgreed`}
                        />
                        <span
                          onClick={() => {
                            arrayHelpers.remove(index);
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
                    onClick={() => {
                      submitForm();
                    }}
                  >
                    전송
                  </button>
                </div>
              </Wrapper>
            )}
          />
        )}
      </Formik>
    </>
  );
};
