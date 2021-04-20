import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { User } from "../types";

interface Props {
  users: User[];
  currentIndex: number;
  onClick: (index: number) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
  onLoad: (index: number) => void;
}

export function UserSelector({
  users,
  currentIndex,
  onClick,
  onAdd,
  onDelete,
  onLoad,
}: Props) {
  return (
    <div>
      <Wrap spacing="24px">
        {users.map((user, index) => (
          <WrapItem>
            <ButtonGroup
              size="sm"
              colorScheme="teal"
              isAttached
              variant="outline"
            >
              <Button
                variant={currentIndex === index ? "solid" : "outline"}
                onClick={() => {
                  onClick(index);
                }}
              >
                {user.name || ""}
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
      <div>
        <input
          type="checkbox"
          onClick={() => {
            onLoad(currentIndex);
          }}
        />
      </div>
    </div>
  );
}
