import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FastField, useField } from "formik";
import { memo } from "react";
import { buildUserFieldName } from "../../helpers";

interface Props {
  userIndex: number;
}

const UserAgeField = ({ userIndex }: Props) => {
  const [{ value, onChange, name }, {}, { setValue }] = useField({
    name: buildUserFieldName(userIndex, "age"),
  });

  return (
    <FormControl isInvalid={!!false}>
      <FormLabel htmlFor="name">나이</FormLabel>{" "}
      <Input
        colorScheme="teal"
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
      />
      <span
        onClick={() => {
          setValue("");
        }}
      >
        XXX
      </span>
      {/* {(nameError as any)?.name} */}
      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  );
};

export default memo(UserAgeField);
