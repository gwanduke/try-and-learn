import { MainForm, PaymentType, Subscription, User } from "./types";

export const defaultFormValues: MainForm = {
  users: [
    {
      age: 11,
      name: "sfdsdfsf",
      subscriptions: [
        {
          name: "넷플릭스",
          paymentType: "ONCE",
          paymentDayTerm: "1년",
        },
      ],
    },
    {
      age: 12,
      name: "",
    },
  ],
};

export const defaultUserValues: User = {
  age: 0,
  name: "",
  subscriptions: [],
};

export const defaultSubscriptionValues: Subscription = {
  name: "",
  paymentType: PaymentType.NOT_SELECTED,
  paymentDayTerm: "",
};
