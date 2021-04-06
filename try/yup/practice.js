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
