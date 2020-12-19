# 07 - Conditional Types

```ts
/**
 * Conditional Types
 */

// T extends U ? X : Y
// => type T가 U를 가지는 경우 X, 아니라면 Y

type MyExclude<T, U> = T extends U ? never : T;
type MyInclude<T, U> = T extends U ? T : never;

type MyNonNullable<T> = Exclude<T, null | undefined>;
type TestNonNullable = MyNonNullable<string | null | number | undefined>;

type MyNonNullable2<T> = T extends null | undefined ? never : T;
type TestNonNullable2 = MyNonNullable2<string | null | number | undefined>;

type TestNonNullable3 =
  | NonNullable<string>
  | NonNullable<null>
  | NonNullable<number>
  | NonNullable<undefined>;

type RemoveUndefinable<T> = {
  [K in keyof T]: undefined extends T[K] ? never : K;
}[keyof T];
type RemoveNullableProperties<T> = {
  [K in RemoveUndefinable<T>]: T[K];
};

type TestRemoveNullableProperties = RemoveNullableProperties<{
  id: number;
  name: string;
  property?: string;
}>;

/**
 * Infer and Type Interference
 */

// 타입스크립트에서 type을 추론을 시도하도록 지시할 수 있다.

type GetFunctionArgumentTypes<T> = T extends (a: infer U) => void ? U : never;

type TestGetFunctionArgumentTypesA = GetFunctionArgumentTypes<
  (a: number) => void
>;

type GetFunctionArgumentTypes2<T> = T extends (a: infer U) => infer K
  ? U | K
  : never;
type TestGetFunctionArgumentTypesA2 = GetFunctionArgumentTypes2<
  (a: string) => void
>;
// => 추론한 타입을 타입 연산시 동적으로 사용할 수 있다고 생각하면 쉽다.

type GetPropertyTypes<T> = T extends { a: infer U; b: infer U } ? U : never;
type TestGetPropertyTypes = GetPropertyTypes<{
  a: number;
  b: string[];
  c: number;
}>;

// 응용해보면 다음과 같이 구성할 수 있다. object의 모든 타입을 반환값으로 가질 수 있는 타입이다.
type GetPropertyTypes2<T> = T extends { [K in keyof T]: infer U } ? U : never;
type TestGetPropertyTypes2 = GetPropertyTypes2<{
  a: number;
  b: string[];
  c: boolean;
}>;

// official: ReturnType
type GetReturnType<T> = T extends (b: number) => infer R ? R : any;
type GetReturnType2<T> = T extends (b: string) => infer R ? R : any;
type TestGetReturnType = GetReturnType<(a: number) => number[]>; // number[] --> 파라미터의 형태가 일치 하므로, 함수의 리턴값을 추론해 그 값을 type으로 갖게 함
type TestGetReturnType2 = GetReturnType2<(a: number) => number[]>; // any --> 파라미터의 형태가 불일치 하므로, 컨디션에서 false 처리되어 any

// official: InstanceType
type GetInstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
type TestGetInstanceType = GetInstanceType<
  new (a: number) => number | string | undefined
>;
```
