import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useFormContext } from "react-hook-form";
import { buildUserFieldName } from "../../helpers";

import { MainForm, UserFieldArrayItem } from "../../types";

interface Props {
  userField: UserFieldArrayItem;
  userIndex: number;
}

export const UserNameField = ({ userField, userIndex }: Props) => {
  const { register, errors, setValue } = useFormContext<MainForm>();

  return (
    <FormControl isInvalid={!!errors.users?.[userIndex]?.name?.message}>
      <FormLabel htmlFor="name">이름</FormLabel>{" "}
      <Input
        colorScheme="teal"
        ref={register({
          required: "필수입니다.",
        })}
        name={buildUserFieldName(userIndex, "name")}
        id={buildUserFieldName(userIndex, "name")}
        type="text"
        defaultValue={userField.name}
      />
      <span
        onClick={() => {
          setValue(buildUserFieldName(userIndex, "name"), "");
        }}
      >
        XXX
      </span>
      <FormErrorMessage>
        {errors.users?.[userIndex]?.name?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
