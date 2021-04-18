import { ArrayField } from "react-hook-form";

export enum PaymentType {
  NOT_SELECTED = "",
  ONCE = "ONCE",
  MANY = "MANY",
}

export interface Subscription {
  name: string;
  paymentType: PaymentType | keyof typeof PaymentType;
  paymentDayTerm: "" | "1주" | "1달" | "1년";
}

export interface User {
  name: string;
  subscriptions?: Subscription[];
}

export interface MainForm {
  users: User[];
}

export type UserFieldArrayItem = Partial<ArrayField<User, "id">>;
export type SubscriptionFieldArrayItem = Partial<
  ArrayField<Subscription, "id">
>;
