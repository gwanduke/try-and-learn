import { Button } from "@chakra-ui/button";

import { useDisclosure } from "@chakra-ui/hooks";
import { useFieldArray, useFormContext } from "react-hook-form";
import { NewSubscriptionModalForm } from "../NewSubscriptionModalForm";
import { MainForm, Subscription, UserFieldArrayItem } from "../types";
import { UserNameField } from "./user/UserNameField";
import { buildUserFieldName } from "../helpers";
import { SubscriptionField } from "./SubscriptionField";

interface Props {
  field: UserFieldArrayItem;
  index: number;
}

export function UserField({ field, index }: Props) {
  const { control } = useFormContext<MainForm>();
  const { append, fields, remove } = useFieldArray<Subscription>({
    control,
    name: buildUserFieldName(index, "subscriptions"),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <UserNameField userField={field} userIndex={index} />

      {fields.map((field, subIndex) => (
        // key를 꼭 명시해주어야한다.
        <SubscriptionField
          key={field.id}
          field={field}
          userIndex={index}
          subscriptionIndex={subIndex}
          onDelete={() => {
            remove(subIndex);
          }}
        />
      ))}

      <Button colorScheme="facebook" onClick={onOpen}>
        내 구독 상품 정보 추가
      </Button>
      <NewSubscriptionModalForm
        isOpen={isOpen}
        onClose={onClose}
        onOk={(values) => {
          append(values);
          onClose();
        }}
      />
    </div>
  );
}
