# 06 - Type Level Programming Part 1

```ts
/**
 * Read Only
 */
type User = {
  readonly id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "김관덕"
};

// user.id = 2;
// => WRONG!

type MakeReadOnly<T> = {
  readonly [key in keyof T]: T[key];
};
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };

type ReadOnlyUser = MakeReadOnly<User>;
type OfficialReadOnlyUser = Readonly<User>;

/**
 * Partial / Required
 */
type MakePartial<T> = {
  [key in keyof T]?: T[key];
};

type MakeRequired<T> = {
  [key in keyof T]-?: T[key];
};

type BlogPost = {
  id: number;
  title: string;
  description?: string;
};

type PartialBlogPost = MakePartial<BlogPost>;
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

type RequiredBlogPost = MakeRequired<BlogPost>;
// type Required<T> = {
//   [P in keyof T]-?: T[P];
// };

type OfficialPartialBlogPost = Partial<BlogPost>;
type OfficialRequiredBlogPost = Required<BlogPost>;

/**
 * Pick, Exclude and Omit
 */
type MakeIntersect<T, U> = T extends U ? T : never;

type User2 = {
  id: number;
  name: string;
  title: string;
};

type Profile = {
  id: number;
  title: string;
  url: string;
};

type User2Profile = MakeIntersect<keyof User2, keyof Profile>;

type MakePick<T, Keys extends keyof T> = {
  [Key in Keys]: T[Key];
};
type NewProfile = MakePick<Profile, "id" | "title">;
type OfficialNewProfile = Pick<Profile, "id" | "title">;
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

type MakeExclude<T, U> = T extends U ? never : T;
type NonExistentKeys = MakeExclude<keyof User2, keyof Profile>;
type OfficialNonExistentKeys = Exclude<keyof User2, keyof Profile>;
// type Exclude<T, U> = T extends U ? never : T;

type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>;
type NewProfile2 = MyOmit<Profile, "title">;
type OfficialNewProfile2 = Omit<Profile, "title">;
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```
