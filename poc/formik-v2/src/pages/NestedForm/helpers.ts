import { Subscription, User } from "./types";

export const buildUserFieldName = (userIndex: number, name: keyof User) =>
  `users[${userIndex}].${name}`;
export const buildSubscriptionFieldName = (
  userIndex: number,
  subscriptionIndex: number,
  name: keyof Subscription
) =>
  `${buildUserFieldName(
    userIndex,
    "subscriptions"
  )}[${subscriptionIndex}].${name}`;
