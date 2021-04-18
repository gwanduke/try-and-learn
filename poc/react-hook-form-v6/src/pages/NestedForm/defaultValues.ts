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
      name: "sdfsdfsdfds",
      subscriptions: [
        {
          name: "asdfsadf",
          paymentType: "MANY",
          paymentDayTerm: "1년",
        },
        {
          name: "asdfasdf",
          paymentType: "MANY",
          paymentDayTerm: "1달",
        },
      ],
    },
    {
      name: "",
    },
    {
      name: "sdfdsfsdfsdfsdf",
    },
    {
      name: "",
    },
    {
      name: "추가",
      subscriptions: [
        {
          name: "dsafsdf",
          paymentType: "MANY",
          paymentDayTerm: "1달",
        },
      ],
    },
    {
      name: "sfsdfsdf",
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
