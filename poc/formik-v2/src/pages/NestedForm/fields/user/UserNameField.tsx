import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useFormikContext } from "formik";
import { buildUserFieldName } from "../../helpers";

import { MainForm } from "../../types";

interface Props {
  userIndex: number;
}

export const UserNameField = ({ userIndex }: Props) => {
  return (
    <Field name={buildUserFieldName(userIndex, "name")}>
      {({
        field: { name, value, onChange },
        form: { touched, errors },
        meta: { setValue },
      }: any) => (
        <FormControl isInvalid={!!false}>
          <FormLabel htmlFor="name">이름</FormLabel>{" "}
          <Input
            colorScheme="teal"
            value={value}
            onChange={onChange}
            name={name}
            id={name}
            type="text"
          />
          {/* <span
            onClick={() => {
              setValue("");
            }}
          >
            XXX
          </span> */}
          {/* {(nameError as any)?.name} */}
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
