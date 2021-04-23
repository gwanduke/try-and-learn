import { Button } from "@chakra-ui/button";

import { useDisclosure } from "@chakra-ui/hooks";
import {
  Controller,
  useController,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { NewSubscriptionModalForm } from "../forms/NewSubscriptionModalForm";
import { MainForm, Subscription, UserFieldArrayItem } from "../types";
import { UserNameField } from "./user/UserNameField";
import { buildSubscriptionFieldName, buildUserFieldName } from "../helpers";
import { SubscriptionField } from "./SubscriptionField";
import { Tag } from "@chakra-ui/tag";
import { Badge, Text } from "@chakra-ui/layout";
import { useEffect, useRef } from "react";

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
  const { users } = useWatch<MainForm>({
    control,
  });
  const count = useRef(fields.length);

  console.log(JSON.stringify(users, null, 2));

  useEffect(() => {}, [fields.length]);

  return (
    <div>
      <UserNameField userField={field} userIndex={index} />

      {fields.map((field, subIndex) => (
        // key를 꼭 명시해주어야한다.
        <div key={field.id}>
          <Tag size="sm">{field.id}</Tag>
          <Text fontSize="xl" fontWeight="bold">
            {users?.[index].subscriptions?.[subIndex]?.name}
            <Badge ml="1" fontSize="0.8em" colorScheme="green">
              {users?.[index].subscriptions?.[subIndex]?.paymentType} |
              {users?.[index].subscriptions?.[subIndex]?.paymentDayTerm}
            </Badge>
          </Text>
          <Button
            colorScheme="red"
            size="xs"
            onClick={() => {
              remove(subIndex);
            }}
          >
            삭제
          </Button>

          {/* NOTE: fieldArray를 다룰때에는 컨트롤러에서 defaultValue를 빼먹으면 안된다!!!! */}
          <Controller
            name={buildSubscriptionFieldName(index, subIndex, "name")}
            defaultValue={field.name}
            render={({ name, value, onChange }) => (
              <input
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                type="hidden"
              />
            )}
          />
          <Controller
            defaultValue={field.paymentType}
            name={buildSubscriptionFieldName(index, subIndex, "paymentType")}
            render={({ name, value, onChange }) => (
              <input
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                type="hidden"
                name={buildSubscriptionFieldName(
                  index,
                  subIndex,
                  "paymentType"
                )} // subscription 으로 오타가 나지 않도록 주의하자!
              />
            )}
          />
          <Controller
            defaultValue={field.paymentDayTerm}
            name={buildSubscriptionFieldName(index, subIndex, "paymentDayTerm")}
            render={({ name, value, onChange }) => (
              <input
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                type="hidden"
                name={buildSubscriptionFieldName(
                  index,
                  subIndex,
                  "paymentDayTerm"
                )}
              />
            )}
          />
        </div>
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
