- [TypeScript Handbook](#typescript-handbook)
  - [The Basics](#the-basics)
  - [Everyday Types](#everyday-types)
    - [Type Aliases vs Interfaces](#type-aliases-vs-interfaces)
    - [Type Assertions](#type-assertions)
    - [Literal Types](#literal-types)
    - [`null` and `undefined`](#null-and-undefined)
    - [Enums](#enums)
    - [Less Common Primitives](#less-common-primitives)
  - [Narrowing](#narrowing)
  - [More on Functions](#more-on-functions)
    - [Rest Parameters and Arguments](#rest-parameters-and-arguments)
    - [Object Teyps](#object-teyps)
- [Creating Types from Types](#creating-types-from-types)
  - [Generics](#generics)
    - [Generic Constraints](#generic-constraints)
    - [Using Type Parameters in Generic Constraints](#using-type-parameters-in-generic-constraints)
    - [Using Class Types in Generics](#using-class-types-in-generics)
  - [Keyof Type Operator](#keyof-type-operator)
  - [Typeof Type Operator](#typeof-type-operator)
  - [Indexed Access Types](#indexed-access-types)
  - [Conditional Types](#conditional-types)
  - [Mapped Types](#mapped-types)
    - [Mapping Modifiers](#mapping-modifiers)
  - [Key Remapping via `as`](#key-remapping-via-as)
  - [Template Literal Types](#template-literal-types)
    - [String Unions in Types](#string-unions-in-types)
    - [Inference with Template Literals](#inference-with-template-literals)
  - [Intrinsic String Manipulation Types](#intrinsic-string-manipulation-types)
- [Classes](#classes)
  - [Class Heritage](#class-heritage)
  - [Static Members](#static-members)
  - [Generic Classes](#generic-classes)
  - [`this` at Runtime in Classes](#this-at-runtime-in-classes)
  - [`this` Types](#this-types)
    - [`this` -based type guards](#this--based-type-guards)
  - [Parameter Properties](#parameter-properties)
  - [클래스 표현식](#클래스-표현식)
  - [`abstract` Classes and Members](#abstract-classes-and-members)
  - [Relationships Between Classes](#relationships-between-classes)
- [Modules](#modules)
  - [JS 모듈의 특징](#js-모듈의-특징)
  - [TypeScript의 모듈](#typescript의-모듈)
    - [`import type`](#import-type)
    - [Inline type imports](#inline-type-imports)
  - [CommonJS Syntax](#commonjs-syntax)
    - [CommonJS and ES Modules interop](#commonjs-and-es-modules-interop)
  - [TypeScript’s Module Resolution Options](#typescripts-module-resolution-options)
  - [TypeScript’s Module Output Options](#typescripts-module-output-options)
  - [TypeScript namespaces](#typescript-namespaces)

# TypeScript Handbook

## The Basics

https://www.typescriptlang.org/docs/handbook/2/basic-types.html

- 정적 타입 체킹
  - 오타
  - 잘못된 프로퍼티 접근
  - 잘못된 호출
  - 도달불가한 조건
  - 등... 확인 가능
- Auto Complete (for IDE)
- tsc
  - `--noEmitOnError`를 통해 에러가 있는 경우 emit 하지 않도록 설정 가능
  - 타입은 지워진다
  - target 에 따라 ES3, ES5 등으로 down leveling이 가능하다.
  - 엄격한 정도를 조절할 수 있다. (tsconfig, 대표적으로 `strict`, `noImplicitAny`, `strictNullChecks` 등...)

## Everyday Types

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

- 원시타입: string, number, boolean (`typeof`로 체크한 결과와 동일)
- 배열: `number[]`, `Array<number>`
- any: 타입체크 패스
- contextual typing: 추론 가능한 경우 자동 타입핑
- optional type
- union type
  - 타입별로 동작을 구분하려면, `typeof`, `Array.isArray(?)` 등으로 브랜칭 필요 (type narrowing)
- type aliases (`type Some = ...`)
- object type을 위한 `interface` 정의

타입스크립트는 structure 를 관심사로 둔다. 즉, 동일 구조를 가지면 같은 타입으로 취급한다.

### Type Aliases vs Interfaces

- type: 새로운 프로퍼티를 추가하지 못함 (타입 확장시: `|`)
- interface: 새로운 프로퍼티 추가 가능 (타입 확장시: `extends`)
  - object 모양을 정의할때만 사용 가능
  - object 에 타입 지정 후, 에러시 interface 이름이 노출됨

```ts
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

// type은 재정의 불가
```

type, interface 중 하나를 일관되게 사용하면 되며, 학습중이라면 일단 interface를 사용하고 type이 필요해지면 사용하라.

### Type Assertions

타입스크립트가 타입을 추론할 정보가 부족한 경우가 있다. 이럴 때 사용하되, 타입 단언은 개발자가 조심히 사용해야하겠다.

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

단언은 기본적으로 "더 상세하거나", "덜 상세한" 타입으로 변환되어야한다. 예를들어 다음은 불가하다.

```ts
const x = "hello" as number;
const x = "hello" as any as number; // 는 가능하다. (덜 상세하게 갔다가, 더 상세하게)
```

### Literal Types

리터럴 타입

```ts
const options: Options | "auto" = "auto";
```

리터럴 추론

- 기본적으로 객체는 변할것으로 예상한다.

```ts
const obj = { counter: 0 }; // counter는 0이 아닌, number로 추론된다!
```

```ts
// Change 1: method를 "GET" 리터럴 타입으로 의도할게요.
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2: 제가 여러 이유를 고려해보았을 때, req.method는 "GET"임을 알고있습니다.
handleRequest(req.url, req.method as "GET");
```

```ts
// 객체 생성시 const를 해주면 리터럴 타입으로 정의됨
const req = { url: "https://example.com", method: "GET" } as const; // 이 const는 타입을 위한것!
handleRequest(req.url, req.method);
```

### `null` and `undefined`

- Non-null assertion operator (postfix !) : null or undefined가 아니에요!

### Enums

> Enums are a feature added to JavaScript by TypeScript which allows for describing a value which could be one of a set of possible named constants

Enum은 타입레벨 추가가 아닙니다! [자세히](https://www.typescriptlang.org/docs/handbook/enums.html)

### Less Common Primitives

- `bigint` - `BigInt()` [자세히](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html#bigint)
- `symbol` - `Symbol()` [자세히](https://www.typescriptlang.org/docs/handbook/symbols.html)

## Narrowing

`typeof padding === "number"` 같은 구문을 "type guard"라 부르며, 타입을 좁힐 수 있다.

- `typeof` type guards
- `!` or `!!` 등을 이용해 Truthiness narrowing할 수 있다.
- Equality narrowing: `switch` 또는 if 문으로 narrowing
- The `in` operator narrowing
- `instanceof` narrowing (prototype chain 체크 - `x instanceof Foo`는 x의 프로토타입 체인이 Foo.prototype을 가지는가를 확인)
- Assignments: 할당값을 보고 추론함
- Control flow analysis: 여러 if문을 걸쳐 다양한 타입이 할당되면 union type으로 올바르게 추론한다.
- Using "type predicates" [자세히](https://www.typescriptlang.org/docs/handbook/2/classes.html#this-based-type-guards)

  ```ts
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }

  // Both calls to 'swim' and 'fly' are now okay.
  let pet = getSmallPet();

  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
  ```

- Discriminated unions : can narrow out the members of the union

  ```ts
  //interface Shape {
  //  kind: "circle" | "square";
  //  radius?: number;
  //  sideLength?: number;
  //}

  interface Circle {
    kind: "circle";
    radius: number;
  }

  interface Square {
    kind: "square";
    sideLength: number;
  }

  type Shape = Circle | Square;

  function getArea(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.sideLength ** 2;
    }
  }
  ```

- Exhaustiveness checking

  - The `never` type: 모든 가능한 케이스가 narrowing 되고 나면, 이 타입으로 지정된다. (도달 불가)
  - never 타입은 모든 타입에 할당 가능한 반면, 그 어떤타입도 never에 할당될 순 없다.
  - 이 특징을 활용해 모든 케이스가 처리되었는지 확인이 가능하다.

    ```ts
    interface Triangle {
      kind: "triangle";
      sideLength: number;
    }

    type Shape = Circle | Square | Triangle;

    function getArea(shape: Shape) {
      switch (shape.kind) {
        case "circle":
          return Math.PI * shape.radius ** 2;
        case "square":
          return shape.sideLength ** 2;
        default:
          const _exhaustiveCheck: never = shape; // Type 'Triangle' is not assignable to type 'never'.
          return _exhaustiveCheck;
      }
    }
    ```

## More on Functions

- Call Signatures

  - JS에서 함수는 프로퍼티도 가질 수 있다. 이경우 다음과 같이 정의 가능하다.

    ```ts
    type DescribableFunction = {
      description: string;
      (someArg: number): boolean;
    };
    function doSomething(fn: DescribableFunction) {
      console.log(fn.description + " returned " + fn(6));
    }
    ```

- Construct Signatures

  - JS 함수는 `new` 연산자로 호출이 가능한데, 이는 다음과 같이 타입핑한다.

    ```ts
    type SomeConstructor = {
      new (s: string): SomeObject;
    };
    function fn(ctor: SomeConstructor) {
      return new ctor("hello");
    }
    ```

- Generic Functions

  - 제너릭을 지정해 추론하도록 할 수 있다.
  - 제너릭은 추론될 수도 있지만, 함수 호출시 지정할 수도 있다. `longest<string>(...)`
  - `extends`를 이용해 제약을 걸수 있다. (Rule: 하지만 제약보다는 가능하면 타입 그 자체를 사용하자. [참고](https://www.typescriptlang.org/docs/handbook/2/functions.html#push-type-parameters-down))

    ```ts
    // 만약 :Type 으로 반환 타입까지 지정한다면, return되는 값은 { length: number } 같은 제약조건에
    // 부합하는 값이 아니라, 호출시 전달되는 Type 그 자체가 되어야한다.
    function longest<Type extends { length: number }>(a: Type, b: Type) {
      if (a.length >= b.length) {
        return a;
      } else {
        return b;
      }
    }

    // longerArray is of type 'number[]'
    const longerArray = longest([1, 2], [1, 2, 3]);
    // longerString is of type 'alice' | 'bob'
    const longerString = longest("alice", "bob");

    // Error! Numbers don't have a 'length' property
    const notOK = longest(10, 100);
    ```

- Optional Parameters : When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument

- Function Overloads

  - 리턴타입이 동일해야하며, 구현 파라미터는 오버로드 타입 파라미터 정의와 호환되어야한다.

    ```ts
    // 다음은 두개의 오버로드 시그니쳐를 가짐

    function makeDate(timestamp: number): Date; // 오버로드1
    function makeDate(m: number, d: number, y: number): Date; // 오버로드2
    //function makeDate(mOrTimestamp: number | boolean `불가`, d?: number, y?: number): Date {
    function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
      // 함수 구현 정의, 밖에서 (타입이) 보이지 않는다. 내부 구현을 위한 용도
      if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
      } else {
        return new Date(mOrTimestamp);
      }
    }
    const d1 = makeDate(12345678);
    const d2 = makeDate(5, 5, 5);
    const d3 = makeDate(1, 3); // Error!
    ```

  - Best Practice
    - 가능한 경우 파라미터 오버로드 보다는 "유니언타입"을 이용해 함수를 정의하자

- Declaring `this` in a Function

  ```ts
  interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
  }

  const db = getDB();
  const admins = db.filterUsers(function (this: User) {
    return this.admin;
  });
  ```

- Other Types to Know About

  - void - `return;` 이나 리턴이 없다면 해당 함수는 void 리턴으로 평가되며, JS에서는 암시적으로 undefined를 의미하지만 TS에서 void와 undefined는 그 의미가 다르다.
  - object - primitive가 아닌 타입 `object is not Object. Always use object!`
  - unkown - any와 닮아있지만, unkown 값으로 뭔가 하는 것은 더 안전하다고 여겨진다.

    ```ts
    function safeParse(s: string): unknown {
      return JSON.parse(s);
    }

    // Need to be careful with 'obj'!
    const obj = safeParse(someRandomString);
    obj.something; // Error!
    ```

  - never - 함수가 예외를 던지거나, 프로그램 종료 등으로 값이 관찰되지 않음 (or narrowing 으로 인해 도달 불가)
  - Function - JS 함수를 의미하며 any를 리턴하기 때문에 가능하면 피하자

### Rest Parameters and Arguments

- Rest Parameters `function fn(...m: number[])`
- Rest Arguments

  ```ts
  // Inferred as 2-length tuple
  const args = [8, 5] as const;
  // OK
  const angle = Math.atan2(...args);
  ```

- Parameter Destructuring
- Assignability of Functions [자세히](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void)
  - void는 반환하지 않음이 아니라, 어떤 것도 반환할 수 있음을 나타낸다. (하지만 무시한다) (`type voidFunc = () => void;` 식으로 정의한 경우)
  - 예외적으로 `function f2(): void` 처럼 반환타입으로 명시한 경우에는 반환을 하면 안된다.

### Object Teyps

- interface or type alias로 정의 가능
- Property Modifiers
  - optional properties (?)
  - `readonly` properties (이 지정이 모든 하위 내용이 immutable 하다는 뜻은 아니다)
  - [mapping modifiers - 자세히](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers)
- Index Signatures
  - index signature property type must be either ‘string’ or ‘number’
  ```ts
  interface NumberOrStringDictionary {
    [index: string]: number | string; // 만약 number 만 있다면, 아래에서 에러가 날것이다.
    length: number; // ok, length is a number
    name: string; // ok, name is a string
  }
  ```
- Extending Types
  - `extends` 또는 intersection Types(`|`)를 이용할 수 있다.
- Generic Object Types - 제너릭을 사용해 정의할 수 있다.
- `Array` Type, []와 동일하다. (단축형이다.)
  - `ReadonlyArray` === `readonly Type[]`
- Tuple Types

  - Array인데 개수를 명시하며, 각 포지션에 특정 타입을 가진다.

    ```js
    // 다음과 같이 정의 될 수도 있다.
    interface StringNumberPair {
      // specialized properties
      length: 2;
      0: string;
      1: number;

      // Other 'Array<string | number>' members...
      slice(start?: number, end?: number): Array<string | number>;
    }
    ```

  - 마지막 요소는 optional일 수 있다.
  - rest elements를 가질 수 있다.
  - `readonly` 키워드를 사용할 수 있다. `as const`를 사용하는경우 readonly로 추론된다.

---

# Creating Types from Types

## Generics

- "type argument inference" 를 통해 제너릭을 명시하지 않더라도, 파라미터 타입을 추론할 수 있다.
- Generic Types

  ```ts
  function identity<Type>(arg: Type): Type {
    return arg;
  }

  let myIdentity: <Input>(arg: Input) => Input = identity;

  // as a call signature of an object literal type
  let myIdentity: { <Type>(arg: Type): Type } = identity;

  // use interface
  interface GenericIdentityFn<Type> {
    (arg: Type): Type;
  }
  ```

- Generic Classes
  - 클래스는 static, instance 두개의 부분으로 나눌 수 있을텐데 Generic class는 instance의 타입만 제너릭 적용이 가능하다. 그래서 static members는 class의 타입 파라미터로 사용 불가하다.

### Generic Constraints

`extends` 키워드를 이용해 제약을 걸 수 있다. 이는 타입이 특정 형태를 만족해야할 때 유용하다.

### Using Type Parameters in Generic Constraints

제너릭으로 정의한 타입을 활용해 추가적인 제약을 걸수도있다.

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m"); // Error!
```

### Using Class Types in Generics

팩토리를 만들 때에 유용하다.

```ts
// Type은 클래스
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

```ts
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

## Keyof Type Operator

```ts
type Point = { x: number; y: number };
type P = keyof Point; // === "x" | "y"
```

> JavaScript object keys are always coerced to a string, so obj[0] is always the same as obj["0"].

```ts
type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // stirng | number
```

## Typeof Type Operator

types 과 values는 다르다. 어떤 함수f의 value f 의 타입을 참조하려면 `typeof f`를 사용할 수 있다.

- Limitations - [자세히](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html#limitations)

## Indexed Access Types

"indexed access type" 을 상요해 어떤 타입의 특정 프로퍼티를 찾아볼 수 있다.

- `number` 를 사용해 배열 요소의 타입을 추출 할 수 있다.

  ```ts
  const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
  ];

  type Person = typeof MyArray[number]; // { name: string, age: number }
  ```

- indexing에는 타입만 사용가능하며, 값은 사용불가하다.

  ```ts
  // Wrong
  const key = "age";
  type Age = Person[key]; // Error!

  // Ok
  type key = "age";
  type Age = Person[key];
  ```

## Conditional Types

다음과 같이 정의 가능하다.

```text
SomeType extends OtherType ? TrueType : FalseType;
```

입력값에 의해 리턴타입이 결정되어야할 때 등에 유용하다.

- Conditional Type Constraints

  ```ts
  type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

  interface Email {
    message: string;
  }

  interface Dog {
    bark(): void;
  }

  type EmailMessageContents = MessageOf<Email>; // string
  type DogMessageContents = MessageOf<Dog>; // never
  ```

- Inferring Within Conditional Types [자세히](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)

  ```ts
  // Item은 전달된 값의 타입에서 추론
  type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
  ```

- Distributive Conditional Types

  - When conditional types act on a generic type, they become "distributive" when given a union type

    ```ts
    type ToArray<Type> = Type extends any ? Type[] : never;

    // 제너릭으로 전달된 각 타입에 적용된다! (string, number 로 distribute 된다.)
    type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]
    // 즉 ToArray<string> | ToArray<number> 와 같다!
    ```

  - distribution 피하기

    ```ts
    // `[` 과 `]`으로 extends 키워드 앞, 뒤 요소를 감싸주면 된다.
    type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

    // 'StrArrOrNumArr' is no longer a union.
    type StrArrOrNumArr = ToArrayNonDist<string | number>; // (string | number)[]
    ```

## Mapped Types

keyof 같은 연산을 통해 프로퍼티키들의 union을 만들어 사용해 이를 돌면서 타입을 만드는 제너릭 타입이다.

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// };
```

### Mapping Modifiers

`readonly`, `?`에 대해서 mapping 중에 적용 가능한 modifiers가 있다.

- `-` (-?, -readonly 형태로 사용)
- `+` (default)

```ts
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
```

## Key Remapping via `as`

> TS4.1 이상

```ts
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as NewKeyType]: Type[Properties];
};
```

```ts
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
```

```ts
// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// =>
// type KindlessCircle = {
//   radius: number;
// };
```

any 타입이 아닌 어떤 임의의 유니온 타입이든지 map over가 가능하다.

???궁금타 - `in` 오퍼레이터

```ts
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;
// =>
// type Config = {
//   square: (event: SquareEvent) => void;
//   circle: (event: CircleEvent) => void;
// };
```

## Template Literal Types

[자세히 - string literal types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)

큰 string union에서 사용되기를 추천하지만, 작은 케이스에서도 좋다.

- JS의 템플릿 스트링과 동일한 문법이지만, type 포지션에서 쓰임
- interpolated 위치에 union이 쓰이면, 각 union 멤버가 반복적으로 적용된다. `${EmailLocaleIDs | FooterLocaleIDs}_id`;

  ```ts
  type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
  type Lang = "en" | "ja" | "pt";
  type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
  ```

### String Unions in Types

```ts
type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void // any 를 Type[Key] 로 수정하면 더 완벽하다.
  ): void;
};

/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(
  obj: Type
): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", () => {});
```

### Inference with Template Literals

위 예제에서 callback의 newValue는 any로 평가받는데, 다음과 같이 작성하면 객체의 명확한 값을 반환받을 수 있따.

```ts
type PropEventSource<Key extends string & keyof Type> = {
  on(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void // any 를 Type[Key] 로 수정하면 더 완벽하다.
  ): void;
};
```

## Intrinsic String Manipulation Types

> 내장 함수이며, locale은 고려되어 있지 않다.

- Uppercase<...>
- Lowercase<...>
- Capitalize<...> : 첫 글자만 upper
- Uncapitalize<...> : 첫 글자만 lower

---

# Classes

- class members
  - `readonly` 가 붙은 멤버는 constructor 외에서 수정이 불가하다.
- constructors
  - Constructors can’t have type parameters - these belong on the outer class declaration, which we’ll learn about later ??? 타입 파라미터가 뭘 뜻하나
  - Constructors는 return 타입 어노테이션을 가질 수 없다. 항상 클래스 인스턴스 타입이 리턴된다.
- Super Calls
- Methods - 특이사항 없다
- Getters / Setters
  - `get` 만 있고 `set`이 없는 경우, 이 프로퍼티는 `readonly`로 추론된다.
  - setter 파라미터의 타입이 명시되지 않으면, getter의 리턴타입으로 추론된다.
  - getter와 setter는 동일한 Member Visibility를 가진다.
- Index Signatures

  ```ts
  // object의 index signature 처럼 멤버 정의 가능하다.
  // 하지만 이를 다루기는 쉽지 않기 때문에, indexed data를 다른곳에 배치하는 것을 추천한다.

  class MyClass {
    [s: string]: boolean | ((s: string) => boolean);

    check(s: string) {
      return this[s] as boolean;
    }
  }
  ```

## Class Heritage

- implements [주의사항](https://www.typescriptlang.org/docs/handbook/2/classes.html#cautions)
- extends
  - 메서드 오버라이드: 시그니쳐가 항상 상위 호환되게 작성하여야한다. 즉, 반드시 Base 클래스의 계약을 따라야한다. (TypeScript enforces that a derived class is always a subtype of its base class)
- 초기화 순서
  - The base class fields are initialized
  - The base class constructor runs
  - The derived class fields are initialized
  - The derived class constructor runs
- Inheriting Built-in Types
  - ES2015 이전 타겟일 때, subclassing에 조심해야하는 부분이 있음 [자세히](https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types)
- 접근 지정자
  - public
  - protected - 상속시 재노출이 필요한 경우, 재정의 하면 되며 이 또한 protected가 되어야하는 경우 꼭 `protected`를 붙여주어야함
    - Cross-hierarchy `protected` access [자세히](https://www.typescriptlang.org/docs/handbook/2/classes.html#cross-hierarchy-protected-access)
  - private
    - Cross-instance `private` access [자세히](https://www.typescriptlang.org/docs/handbook/2/classes.html#cross-instance-private-access)
    - 주의사항
      - 트랜스파일된 JS에서는 private가 소용없다 (soft `private`)
        - typing 시점에 s.p 는 불가능하지만 s['p']는 가능하다. 이는 테스트 등에서 편리함을 주기위해 그렇다.
      - ES2021 의 private인 `#`은 컴파일 후에도 남아있으며 예외방법은 없다. (hard `private`)
        - ES2021 이하로 컴파일 되는 경우, `WeakMap`을 이용해 처리된다. 이런 방법들은 런타임에 접근을 제어하므로 성능적인 면에서 떨어질 수 있다.
        -

## Static Members

- 접근 지정자를 가질 수 있다.
- 동일하게 상속된다.
- `Function` prototype의 프로퍼티들은 오버라이팅하는 것이 불가능하거나 안전하지 않다. 클래스 또한 `new`로 실행되는 `함수` 이므로, 특정 static 이름은 사용불가하다.
  - `name`, `length`, `call` 등이 이에 해당한다.
- static class는 없다. Java같은 언어는 클래스 안에 모든 함수와 데이터가 있도록 강제하기 때문에 필요하지만, JS에서는 최상위 파일에 함수, 객체, 클래스 static 멤버 등으로 정의할 수 있어 언어레벨에서 지원할 필요가 없다.
- `static` block in classes

  ```ts
  class Foo {
    static #count = 0;

    get count() {
      return Foo.#count;
    }

    static {
      // static 멤버 등을 초기화할 때 유용하다. (private에 접근 가능하다.)
      try {
        const lastInstances = loadLastInstances();
        Foo.#count += lastInstances.length;
      } catch {}
    }
  }
  ```

## Generic Classes

```ts
class Box<Type> {
  // static defaultValue: Type; => 에러!, 컴파일되고나면 Box.defaultValue는 단 하나이다. 그런데 제너릭이 적용되면 말이 안되기 때문에서라도 합당하다.

  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

const b = new Box("hello!");
```

## `this` at Runtime in Classes

js `this`의 이상한 동작(호출 객체 기준) 때문에,

(1) Arrow function을 사용하면 class 내부의 this를 보장받을 수 있다. 하지만 다음과 같은 trade-off가 존재한다.

- The this value is guaranteed to be correct at runtime, even for code not checked with TypeScript
- This will use more memory, because each class instance will have its own copy of each function defined this way
- You can’t use super.getName in a derived class, because there’s no entry in the prototype chain to fetch the base class method from

(2) 또는 다음과 같이 this의 타입을 지정해 다른 객체에서 호출되지 않도록 만들 수 있다.

```ts
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// OK
c.getName();

// Error, would crash
const g = c.getName;
console.log(g());
```

이는 (1)의 trade-off와 반대되는 성격을 지닌다.

- JavaScript callers might still use the class method incorrectly without realizing it
- Only one function per class definition gets allocated, rather than one per class instance
- Base method definitions can still be called via super.

## `this` Types

this는 "dynamically" to the type of the current class를 가리킨다.

```ts
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class DerivedBox extends Box {
  otherContent: string = "?";
}

const base = new Box();
const derived = new DerivedBox();
derived.sameAs(base); // Error!, this가 DerivedBox라 DerivedBox like 클래스만 전달가능!
```

### `this` -based type guards

이를 잘 활용하면 narrowing 할 수 있다. [자세히](https://www.typescriptlang.org/docs/handbook/2/classes.html#cross-instance-private-access)

## Parameter Properties

constructor의 파라미터에 접근 지정자를 지정하면, 클래스 멤버로 자동으로 정의된다.

```ts
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);

console.log(a.z);
```

## 클래스 표현식

```ts
const someClass = class<Type> {
  // class 이름을 지정하지 않는다!
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

const m = new someClass("Hello, world");
```

## `abstract` Classes and Members

> `concrete`(구체적인) 클래스와 반대되는 개념.

- abstract class
  - 인스턴스화 불가능하다.
- Abstract Construct Signatures

  ```ts
  // Base class는 abstract 클래스
  // Derived는 concrete 클래스

  // Bad
  function greet(ctor: typeof Base) {
    const instance = new ctor();
    instance.printName(); // Error!
  }
  greet(Base); // 만약 위 구문이 가능하다면, NOT Error! 그래서 나쁘다.

  // Good
  function greet(ctor: new () => Base) {
    const instance = new ctor();
    instance.printName();
  }
  greet(Derived);
  greet(Base); // Error!
  ```

## Relationships Between Classes

> classes in TypeScript are compared structurally

이름이 달라도 구조가 같으면 동일하게 취급된다. 그래서 empty class를 작성하는 경우 모든 object가 들어갈 수 있게 될 것이다.

```ts
class Empty {}

function fn(x: Empty) {
  // can't do anything with 'x', so I won't
}

// All OK!
fn(window);
fn({});
fn(fn);
```

---

# Modules

## JS 모듈의 특징

- import, export를 가진 파일은 모듈로 취급된다. 반대로 이들이 없으면 스크립트로 취급되며 global scope에서 이용가능하다. (ts에서도 동일하며, 사용자(or compiiler)가 하나의 파일로 합치거나 HTML에서 올바른 순서로 사용할 것이다 가정한다.)
- 모듈은 글로벌 스코프가 아니라 각 스코프가 존재한다. 즉, 모듈내에서 정의된 무언가는 바깥 모듈에서는 사용불가이다. (exprt 하지 않는 이상)

## TypeScript의 모듈

모듈 베이스의 코드를 작성할 떄에는 다음 세가지를 고려해야한다.

- Syntax: What syntax do I want to use to import and export things?
- Module Resolution: What is the relationship between module names (or paths) and files on disk?
- Module Output Target: What should my emitted JavaScript module look like?

### `import type`

type만 import가 가능하다.

`import type { ... } from '..'`

### Inline type imports

> TS4.5 이상

type 으로 명시된 녀석은 babel, swc, esbuild 등의 트랜스파일러에서도 안전하게 삭제된다.

```ts
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";

export type Animals = Cat | Dog;
const name = createCatName();
```

## CommonJS Syntax

> 아는 내용들임

### CommonJS and ES Modules interop

[자세히](https://www.typescriptlang.org/docs/handbook/2/modules.html#commonjs-and-es-modules-interop)

## TypeScript’s Module Resolution Options

module resolution은 `import` 또는 `require`에서 string을 받고 어떤 파일을 참조하는지 결정하는 프로세스이다.

타입스크립트는 두가지 전략을 가지고 있따.

- Classic
  - 컴파일러의 `module` 옵션이 `commonjs`가 아닐 때 default 옵션이다. 하위 호환성을 가진다.
- Node
  - commonjs 모드에서 노트가 동작하는 것을 모사한다. 추가로 `.ts`, `.d.ts`를 체크한다.

[자세히, 여기적힌 링크들을 참고를 하자](https://www.typescriptlang.org/docs/handbook/2/modules.html#typescripts-module-resolution-options)

## TypeScript’s Module Output Options

emit된 자바스크린트에 영향을 미치는 두가지 옵션이 있다.

- target: JS feature 타겟 (ES5, ES2015 등...)
- module: what code is used for modules to interact with each other (ES2020, CommonJS, UMD 등)
  - 모든 커뮤니케이션은 모듈로더를 통하는데, 어떤 모듈 로더를 사용할지 선택하는 것이다.
  - 런타임에 모듈로더는 모듈 실행전, 모듈의 모든 의존성을 배치하고 실행하는 역할을 한다.

## TypeScript namespaces

ES module이 소개되기 이전에 `namespace`라 불리는 자체 모듈 포맷이 있었다. This syntax has a lot of useful features for creating complex definition files.

deprecated 되지 않았고, 여전히 https://www.typescriptlang.org/dt 에서 사용중이다. [Reference 페이지](https://www.typescriptlang.org/docs/handbook/namespaces.html)에서 더 알아볼 것이다.
