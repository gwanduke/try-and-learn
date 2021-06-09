import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(),
  hasCar: yup.boolean(),
  hasHouse: yup.boolean(),
  isRich: yup.boolean().when(["hasCar", "hasHouse"], {
    is: true,
    then: yup.boolean().isTrue(),
    otherwise: yup.boolean().isFalse(),
  }),

  city: yup.mixed().oneOf(["서울", "울산", "기타"]),
  isLiveDifferentPlace: yup.boolean(),
  cityEtc: yup.string().when(["isLiveDifferentPlace", "city"], {
    is: (isLiveDifferentPlace, city) => {
      return isLiveDifferentPlace && city === "기타";
    },
    then: yup.string().required(),
  }),
});

export const schema2 = yup.object().shape({
  name: yup.string().required(),
  items: yup
    .array()
    .min(1)
    .required()
    .of(
      yup.object().shape({
        product: yup.string().when("count", {
          is: 0,
          then: yup.string().required(),
        }),
        count: yup.number().defined(),
        aliasName: yup.string().when("name", {
          is: "alias",
          then: yup.string().required(),
        }),
      })
    ),
});
