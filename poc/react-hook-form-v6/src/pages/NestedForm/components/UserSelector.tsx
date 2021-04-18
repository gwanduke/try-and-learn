import { ArrayField, useFormContext, useWatch } from "react-hook-form";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { MainForm, User } from "../types";

interface Props {
  fields: Partial<ArrayField<User, "id">>[];
  currentIndex: number;
  onClick: (index: number) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
  onLoad: (index: number) => void;
}

export function UserSelector({
  fields,
  currentIndex,
  onClick,
  onAdd,
  onDelete,
  onLoad,
}: Props) {
  const { control } = useFormContext<MainForm>();
  const { users } = useWatch<MainForm>({ control });

  return (
    <div>
      <Wrap spacing="24px">
        {fields.map((field, index) => (
          <WrapItem key={field.id}>
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
                {users?.[index]?.name || ""}
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
