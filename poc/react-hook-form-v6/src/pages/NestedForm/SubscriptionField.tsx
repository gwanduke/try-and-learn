import { Button } from "@chakra-ui/button";
import { Badge, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { useFormContext } from "react-hook-form";
import { Subscription } from "./type";

export function SubscriptionField({ field, index, namePrefix, onDelete }: any) {
  const { register } = useFormContext();
  const buildFieldName = (name: keyof Subscription) =>
    `${namePrefix}[${index}].${name}`;

  return (
    <div key={field.id}>
      <Tag size="sm">{field.id}</Tag>
      <Text fontSize="xl" fontWeight="bold">
        {field.name}
        <Badge ml="1" fontSize="0.8em" colorScheme="green">
          {field.paymentType} | {field.paymentDayTerm}
        </Badge>
      </Text>
      <Button colorScheme="red" size="xs" onClick={onDelete}>
        삭제
      </Button>
      <input
        ref={register()}
        type="hidden"
        name={buildFieldName("name")}
        defaultValue={field.name}
      />
      <input
        ref={register()}
        type="hidden"
        name={buildFieldName("paymentType")} // subscription 으로 오타가 나지 않도록 주의하자!
        defaultValue={field.paymentType}
      />
      <input
        ref={register()} // register가 아니라 register()로 해주어야 삭제후에도 오류가 없다. map 중에 register가 호출되도록 처리해주어야한다.
        type="hidden"
        name={buildFieldName("paymentDayTerm")}
        defaultValue={field.paymentDayTerm} // defaultValue를 꼭 명시해주어야한다.
      />
    </div>
  );
}
