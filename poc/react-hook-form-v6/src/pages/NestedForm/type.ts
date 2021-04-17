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
