import { ArrayField, useFormContext, useWatch } from "react-hook-form";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { MainForm, User } from "./types";

interface Props {
  fields: Partial<ArrayField<User, "id">>[];
  onClick: (index: number) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
}

export function UserSelector({ fields, onClick, onAdd, onDelete }: Props) {
  const { control } = useFormContext<MainForm>();
  const { users } = useWatch<MainForm>({ control });

  return (
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
  );
}
