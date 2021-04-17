import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { ArrayField, useFieldArray, useFormContext } from "react-hook-form";
import { NewSubscriptionFormModal } from "./NewSubscriptionFormModal";
import { SubscriptionField } from "./SubscriptionField";
import { MainForm, Subscription, User } from "./type";

interface Props {
  field: Partial<ArrayField<User, "id">>;
  index: number;
}

export function UserField({ field, index }: Props) {
  const { control, register, errors } = useFormContext<MainForm>();
  const { append, fields, remove } = useFieldArray<Subscription>({
    control,
    name: `users[${index}].subscriptions`,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const buildFieldName = (name: keyof User) => `users[${index}].${name}`;

  return (
    <div>
      <FormControl isInvalid={!!errors.users?.[index]?.name?.message}>
        <FormLabel htmlFor="name">이름</FormLabel>{" "}
        <Input
          colorScheme="teal"
          ref={register({
            required: "필수입니다.",
          })}
          name={buildFieldName("name")}
          id={buildFieldName("name")}
          type="text"
          defaultValue={field.name}
        />
        <FormErrorMessage>
          {errors.users?.[index]?.name?.message}
        </FormErrorMessage>
      </FormControl>

      {fields.map((field, subIndex) => (
        // key를 꼭 명시해주어야한다.
        <SubscriptionField
          key={field.id}
          field={field}
          namePrefix={buildFieldName("subscriptions")}
          index={subIndex}
          onDelete={() => {
            remove(subIndex);
          }}
        />
      ))}

      <Button colorScheme="facebook" onClick={onOpen}>
        내 구독 상품 정보 추가
      </Button>
      <NewSubscriptionFormModal
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
