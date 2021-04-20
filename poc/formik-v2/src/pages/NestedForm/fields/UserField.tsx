import { Button } from "@chakra-ui/button";

import { useDisclosure } from "@chakra-ui/hooks";
import { FieldArray, useFormikContext } from "formik";
import { NewSubscriptionModalForm } from "../forms/NewSubscriptionModalForm";
import { MainForm } from "../types";
import { SubscriptionField } from "./SubscriptionField";
import { UserNameField } from "./user/UserNameField";

interface Props {
  index: number;
}

export function UserField({ index }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values } = useFormikContext<MainForm>();

  return (
    <div>
      <UserNameField userIndex={index} />

      <FieldArray name={`users[${index}].subscriptions`}>
        {({ push, remove }) => (
          <>
            {(values.users[index].subscriptions || []).map(
              (subscription, subIndex) => (
                <SubscriptionField
                  subscription={subscription}
                  onDelete={() => {
                    remove(subIndex);
                  }}
                />
              )
            )}

            <Button colorScheme="facebook" onClick={onOpen}>
              내 구독 상품 정보 추가
            </Button>
            <NewSubscriptionModalForm
              isOpen={isOpen}
              onClose={onClose}
              onOk={(values) => {
                push(values);
                onClose();
              }}
            />
          </>
        )}
      </FieldArray>
    </div>
  );
}
