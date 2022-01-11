- [Release Note](#release-note)
  - [TypeScript 3.5](#typescript-35)
    - [Speed improvements](#speed-improvements)
    - [The `Omit` helper type](#the-omit-helper-type)
    - [The `--allowUmdGlobalAccess` flag](#the---allowumdglobalaccess-flag)
    - [Smater union type checking](#smater-union-type-checking)
    - [Higher order type inference from generic constructors](#higher-order-type-inference-from-generic-constructors)
  - [TypeScript 3.4](#typescript-34)
    - [Higher order type inference from generic functions](#higher-order-type-inference-from-generic-functions)
    - [Improvements for `ReadonlyArray` and `readonly` tuples](#improvements-for-readonlyarray-and-readonly-tuples)
    - [`const` assertions](#const-assertions)
      - [주의사항](#주의사항)
    - [Type-checking for `globalThis`](#type-checking-for-globalthis)
  - [TypeScript 3.3](#typescript-33)
    - [Faster subsequent builds with the `--incremental` flag](#faster-subsequent-builds-with-the---incremental-flag)
    - [Improved behavior for calling union types](#improved-behavior-for-calling-union-types)
    - [Incremental file watching for composite projects in `--build --watch`](#incremental-file-watching-for-composite-projects-in---build---watch)
  - [TypeScript 3.2](#typescript-32)
    - [tsconfig - `strictBindCallApply` 옵션](#tsconfig---strictbindcallapply-옵션)
    - [Generic spread expressions in object literals](#generic-spread-expressions-in-object-literals)
    - [제너릭 객체의 rest 변수와 파라미터](#제너릭-객체의-rest-변수와-파라미터)
    - [BigInt](#bigint)
    - [Non-unit types as union discriminants](#non-unit-types-as-union-discriminants)
    - [`tsconfig.json` inheritance via Node.js packages](#tsconfigjson-inheritance-via-nodejs-packages)
    - [`--showConfig` flag](#--showconfig-flag)
    - [`Object.defineProperty` declarations in JavaScript](#objectdefineproperty-declarations-in-javascript)
  - [TypeScript 3.1](#typescript-31)
    - [튜플과 배열에서의 Mapped types](#튜플과-배열에서의-mapped-types)
    - [함수에 대한 프로퍼티 정의](#함수에-대한-프로퍼티-정의)
    - [`typesVersions`](#typesversions)

# Release Note

## TypeScript 3.5

### Speed improvements

### The `Omit` helper type

### [The `--allowUmdGlobalAccess` flag](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#the---allowumdglobalaccess-flag)

you can now reference UMD global declarations like

```ts
export as namespace foo;
```

### Smater union type checking

[자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#smarter-union-type-checking)

### Higher order type inference from generic constructors

[자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#higher-order-type-inference-from-generic-constructors)

## TypeScript 3.4

### Higher order type inference from generic functions

HOF 에서 제너릭 사용시 더 나은 타입 추론 [자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#higher-order-type-inference-from-generic-functions)

### [Improvements for `ReadonlyArray` and `readonly` tuples](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#improvements-for-readonlyarray-and-readonly-tuples)

<!-- TODO: -->

### `const` assertions

새로운 리터럴 표현식을 만들 때 `const`를 사용해주면

- `"hello"`가 `string`으로 넓혀 추론되지 않는다.
- object literal은 `readonly` 프로퍼티를 갖게 된다.
- array literal은 `readonly` 튜플이된다.

```ts
// Type '"hello"'
let x = "hello" as const;

// Type 'readonly [10, 20]'
let y = [10, 20] as const;

// Type '{ readonly text: "hello" }'
let z = <const>{ text: "hello" }; // 브라켓 형태도 가능
```

컴파일러에 불변임을 힌트주는 것이라 볼 수 있다.

```ts
// Works with no types referenced or declared.
// We only needed a single const assertion.
function getShapes() {
  let result = [
    { kind: "circle", radius: 100 },
    { kind: "square", sideLength: 50 },
  ] as const;
  return result;
}
for (const shape of getShapes()) {
  // Narrows perfectly!
  if (shape.kind === "circle") {
    console.log("Circle radius", shape.radius);
  } else {
    console.log("Square side length", shape.sideLength);
  }
}
```

Enum을 사용하지 않기로 했다면, 대신할 수 있다.

```ts
export const Colors = {
  red: "RED",
  blue: "BLUE",
  green: "GREEN",
} as const;
```

#### 주의사항

다음과 같이 계산식에는 사용될 수 없다. 간단한 리터럴 표현식에만 가능하다.

```ts
// All Error!
let a = (Math.random() < 0.5 ? 0 : 1) as const;
let b = (60 * 60 * 1000) as const;
```

### Type-checking for `globalThis`

[자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#type-checking-for-globalthis)

## TypeScript 3.3

### Faster subsequent builds with the `--incremental` flag

[자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#faster-subsequent-builds-with-the---incremental-flag)

### Improved behavior for calling union types

union types에 대한 유연함이 강화되었다.

[자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-3.html#improved-behavior-for-calling-union-types)

### Incremental file watching for composite projects in `--build --watch`

[자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-3.html#incremental-file-watching-for-composite-projects-in---build---watch)

## TypeScript 3.2

### tsconfig - `strictBindCallApply` 옵션

> 함수 오버로딩 된 경우 완전하지 않다. 마지막 오버로드가 모델링된다.

함수 객체에 대한 `bind`, `call`, `apply` 메서드가 강하게 타입핑되고, 엄격하게 체크된다.

```ts
// strictBindCallApply: true
function foo(a: number, b: string): string {
  return a + b;
}

let a = foo.apply(undefined, [10]); // error: too few argumnts
let b = foo.apply(undefined, [10, 20]); // error: 2nd argument is a number
let c = foo.apply(undefined, [10, "hello", 30]); // error: too many arguments
let d = foo.apply(undefined, [10, "hello"]); // okay! returns a string
```

### Generic spread expressions in object literals

- 제너릭 타입: object literal에 스프레드가 사용되는 경우 이를 intersection types로 처리한다.
- non-제너릭 타입: object literal에 스프레드 되는 경우, 최우측 스프레드된 값을 살린다. (JS와 동일)

```ts
function spread<T, U>(t: T, u: U) {
  return { ...t, ...u }; // T & U
}
declare let x: { a: string; b: number };
declare let y: { b: string; c: boolean };
let s1 = { ...x, ...y }; // { a: string, b: string, c: boolean }
let s2 = spread(x, y); // { a: string, b: number } & { b: string, c: boolean }
let b1 = s1.b; // string
let b2 = s2.b; // number & string
```

### 제너릭 객체의 rest 변수와 파라미터

제너릭 변수에 대한 ...rest 를 허용하며 `Pick`, `Exclude` 그리고 ...rest 외의 다른 키 이름을 이용해 처리한다.

```ts
function excludeTag<T extends { tag: string }>(obj: T) {
  let { tag, ...rest } = obj;
  return rest; // Pick<T, Exclude<keyof T, "tag">>
}
const taggedPoint = { x: 10, y: 20, tag: "point" };
const point = excludeTag(taggedPoint); // { x: number, y: number }
```

### BigInt

[자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html#bigint)

### Non-unit types as union discriminants

같은 프로퍼티를 가지는 union은 그게 어떤 singleton type을 따르는 경우 프로퍼티를 판별 수단으로서 타입을 좁힐 수 있다. (singleton type: string literal, null, undefined 그리고 제너릭이 아닌 것들과 같은 타입 등)

```ts
type Result<T> = { error: Error; data: null } | { error: null; data: T };
function unwrap<T>(result: Result<T>) {
  if (result.error) {
    // Here 'error' is non-null
    throw result.error;
  }
  // Now 'data' is non-null
  return result.data;
}
```

### `tsconfig.json` inheritance via Node.js packages

`tsconfig.json`의 `extends` 필드에 bare path를 사용하는 경우, `tsconfig.json`을 `node_modules`에서 검색한다.

```json
{
  "extends": "@my-team/tsconfig-base",
  "include": ["./**/*"],
  "compilerOptions": {
    // Override certain options on a project-by-project basis.
    "strictBindCallApply": false
  }
}
```

### `--showConfig` flag

`tsc --showConfig` tsconfig.json의 최종본을 표시해준다.

### `Object.defineProperty` declarations in JavaScript

[자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html#objectdefineproperty-declarations-in-javascript)

## TypeScript 3.1

### 튜플과 배열에서의 Mapped types

mapped object와 같이 tuple과 array를 다룰 수 있으며, 새로운 tuple이나 array를 소개한다.

```ts
type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> };
type Coordinate = [number, number]; // <-- tuple
type PromiseCoordinate = MapToPromise<Coordinate>; // [Promise<number>, Promise<number>]
```

### 함수에 대한 프로퍼티 정의

ts3.0 에서는 다음과 같은 코드가 작성 불가했지만 이제 가능하다.

```ts
function readImage(path: string, callback: (err: any) => void) {
  // ...
}

// Error!
// Property 'sync' does not exist on type '(path: string, callback: (err: any) => void) => void'
readImage.sync = (path: string) => {
  // ...
};
```

### `typesVersions`

[참고](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection-with-typesversions)

package.json에 `typesVersions`를 명시해 타입스크립트 버전에 따라 어떤 타입을 참조할지 지정할 수 있다.
