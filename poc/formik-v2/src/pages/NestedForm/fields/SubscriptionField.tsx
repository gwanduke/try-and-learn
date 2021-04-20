import { Button } from "@chakra-ui/button";
import { Badge, Text } from "@chakra-ui/layout";
import { Subscription } from "../types";

interface Props {
  subscription: Subscription;
  onDelete: () => void;
}

export function SubscriptionField({ subscription, onDelete }: Props) {
  return (
    <div>
      <Text fontSize="xl" fontWeight="bold">
        {subscription.name}
        <Badge ml="1" fontSize="0.8em" colorScheme="green">
          {subscription.paymentType} | {subscription.paymentDayTerm}
        </Badge>
      </Text>
      <Button colorScheme="red" size="xs" onClick={onDelete}>
        삭제
      </Button>
    </div>
  );
}
