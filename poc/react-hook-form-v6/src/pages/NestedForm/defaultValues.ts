import { MainForm, PaymentType, Subscription, User } from "./types";

export const defaultFormValues: MainForm = {
  users: [
    {
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
      name: "",
    },
  ],
};

export const defaultUserValues: User = {
  name: "",
  subscriptions: [],
};

export const defaultSubscriptionValues: Subscription = {
  name: "",
  paymentType: PaymentType.NOT_SELECTED,
  paymentDayTerm: "",
};
