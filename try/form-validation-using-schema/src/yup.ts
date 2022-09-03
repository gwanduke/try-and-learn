import { boolean, number, object, ObjectSchema, SchemaOf, string } from "yup";
import { invalidValues } from "./values";

type Values = {
  userName: string;
  age: number;
  agreeOfParent: boolean;
  hasCar: boolean;
  carNumber: string;
};

type PartialSchema<T extends keyof Values> = SchemaOf<Pick<Values, T>>;

const basicSchema: PartialSchema<"userName"> = object({
  userName: string().required(),
});

const ageSchema: PartialSchema<"age" | "agreeOfParent"> = object({
  age: number().required(),
  agreeOfParent: boolean().isTrue().defined(),
});

const carSchema: PartialSchema<"hasCar" | "carNumber"> = object({
  hasCar: boolean().defined(),
  carNumber: string()
    .defined()
    .when("hasCar" as keyof Values, {
      is: true,
      then: (schema) => schema.required(),
    }),
});

const finalSchema: SchemaOf<Values> = basicSchema
  .concat(ageSchema)
  .concat(carSchema);

const result = finalSchema.validateSync(invalidValues, {
  abortEarly: false,
});
