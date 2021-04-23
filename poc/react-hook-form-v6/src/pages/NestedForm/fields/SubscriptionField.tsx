import { Button } from "@chakra-ui/button";
import { Badge, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { buildSubscriptionFieldName } from "../helpers";
import { MainForm, Subscription, SubscriptionFieldArrayItem } from "../types";

interface Props {
  field: SubscriptionFieldArrayItem;
  userIndex: number;
  subscriptionIndex: number;
  onDelete: () => void;
}

export function SubscriptionField({
  field,
  userIndex,
  subscriptionIndex,
  onDelete,
}: Props) {
  const buildFieldName = (name: keyof Subscription) =>
    buildSubscriptionFieldName(userIndex, subscriptionIndex, name);
  const {
    field: { onChange: onChangeName, value: nameValue },
  } = useController({
    name: buildFieldName("name"),
  });
  const {
    field: { onChange: onChangePaymentType, value: paymentType },
  } = useController({
    name: buildFieldName("paymentType"),
  });
  const {
    field: { onChange: onChangePaymentDayTerm, value: paymentDayTerm },
  } = useController({
    name: buildFieldName("name"),
  });

  return (
    <div>
      {buildFieldName("name")}
      <Tag size="sm">{field.id}</Tag>
      <Text fontSize="xl" fontWeight="bold">
        {nameValue}
        <Badge ml="1" fontSize="0.8em" colorScheme="green">
          {paymentType} | {paymentDayTerm}
        </Badge>
      </Text>
      <Button colorScheme="red" size="xs" onClick={onDelete}>
        삭제
      </Button>
      <input
        value={nameValue}
        onChange={(e) => {
          onChangeName(e.target.value);
        }}
        type="hidden"
        name={buildFieldName("name")}
      />
      <input
        value={paymentType}
        onChange={(e) => {
          onChangePaymentType(e.target.value);
        }}
        type="hidden"
        name={buildFieldName("paymentType")} // subscription 으로 오타가 나지 않도록 주의하자!
      />
      <input
        value={paymentDayTerm}
        onChange={(e) => {
          onChangePaymentDayTerm(e.target.value);
        }}
        type="hidden"
        name={buildFieldName("paymentDayTerm")}
      />
    </div>
  );
}
