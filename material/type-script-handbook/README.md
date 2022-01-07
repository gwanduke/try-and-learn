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
  - TODO:
