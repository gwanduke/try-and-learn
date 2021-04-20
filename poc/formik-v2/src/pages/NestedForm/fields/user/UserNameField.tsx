import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useFormikContext } from "formik";
import { buildUserFieldName } from "../../helpers";

import { MainForm } from "../../types";

interface Props {
  userIndex: number;
}

export const UserNameField = ({ userIndex }: Props) => {
  const {
    values,
    errors,

    setFieldValue,
    handleChange,
  } = useFormikContext<MainForm>();

  const nameError = errors.users?.[userIndex];

  return (
    <FormControl isInvalid={!!false}>
      <FormLabel htmlFor="name">이름</FormLabel>{" "}
      <Input
        colorScheme="teal"
        value={values.users[userIndex].name}
        onChange={handleChange}
        name={buildUserFieldName(userIndex, "name")}
        id={buildUserFieldName(userIndex, "name")}
        type="text"
      />
      <span
        onClick={() => {
          setFieldValue(buildUserFieldName(userIndex, "name"), "");
        }}
      >
        XXX
      </span>
      {(nameError as any)?.name}
      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  );
};
