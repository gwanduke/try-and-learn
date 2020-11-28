# 고찰 - 어떻게 테스트를 작성해야할까?

> 작성자: 김관덕
>
> 작성일: 2020. 3. 3. Tue
>
> 작성목적: 팀 내부 공유

## 테스트의 목적

테스트의 목적은 테스트를 작성하는 것 그 자체가 아니다. 수정시 오류를 잡아낼 수 있어야하고, 테스트 그 자체로 테스트 대상에 대한 참고문서가 될 수 있어야한다.

테스트 작성은 실제 개발 시간과의 trade-off 이기 때문에 테스트 작성의 의미를 잊지 않도록 해야하고, 실수가 생길 수 있는 부분을 경험적으로 파악하여 꼭 붙여주는 것이 좋겠다. (답은 없다)

## 테스트 살펴보기

그래서 테스트는 가능하면 읽기 좋게 테스트되어야한다. 읽기 좋은 테스트란 설명이 되는 테스트이다. 다음과 같은 코드가 있다면 테스트는 어떻게 작성되어야할까?

```js
// car.js
export const buildCar = () => {
  let distance = 0;

  return {
    getDistance: () => distance,
    back: () => {
      if (distance <= 0) {
        return 0;
      }
      distance -= 1;

      return distance;
    },
    go: () => {
      if (distance >= 100) {
        return distance;
      }
      distance += 1;

      return distance;
    },
  };
};
```

### ❌ Bad Test

```js
// test1.test.js
import { buildCar } from "./car";

describe("#buildCar", () => {
  // <A>
  it("works correctly", () => {
    const car = buildCar();

    expect(car.back).toBeInstanceOf(Function);
    expect(car.go).toBeInstanceOf(Function);

    expect(car.getDistance()).toBe(0);
    expect(car.back()).toBe(0);
    expect(car.go()).toBe(1);

    // <B>
    for (let i = 0; i <= 100; i++) {
      car.go();
    }
    expect(car.getDistance()).toBe(100);
  });
});
```

코드 자체가 짧기 때문에 그리 나빠 보이진 않는다. 하지만 위 코드에 표시되어있는 드러나는 두가지 문제가 있다.

- `<A>` buildCar의 행동을 알 수 없다. 잘 작동한다는 것은 무엇을 의미할까?
- `<B>` 로직이 등장하는 이유를 파악하기 힘들고, 테스트를 작성하는 당사자는 `go()`를 호출하면 `distance`가 1씩 증가한다는 것을 알고 for문을 돌렸다. 이는 상세구현을 파악하고 이를 테스트 코드에 포함했다 뜻이고 굉장히 깨지기 쉽다.

`<A>`는 납득이 갈 수 있겠지만 `<B>`는 납득하기 어려울 수 있다. 상세구현은 무엇이고 깨지기 쉽다는 것은 무슨 의미일까?

이 두가지 문제를 파보도록 하자.

## 작성된 테스트 코드의 문제파악

`test1.test.js` 는 테스트를 나누어 구성하지 않았기 때문에 스파게티 테스트코드가 될 수 있는 여지가 있다. 자동차의 후진 기술이 좋아져서 `back()`의 동작이 다음과 같이 변경되었다고 가정하자

```js
  ...
    back: () => {
      distance -= 3000; // 후진왕

      return distance;
    },
  ...
```

코드가 변경되었기에 `test1.test.js`의 테스트 코드가 실패해야하는 것은 당연하다. 하지만 이를 바로잡기가 힘들다. 코드 수정은 한줄이지만 테스트 코드의 수정은 엄청나다.

```js
// test1.test.js
    ...
    expect(car.getDistance()).toBe(0);
    expect(car.back()).toBe(0); // => Fail, -3000
    expect(car.go()).toBe(1); // => Fail, -2999

    for (let i = 0; i <= 100; i++) {
      car.go();
    }
    expect(car.getDistance()).toBe(100); // Fail, -2899
  });
});
```

이를 다시 제대로 동작하도록 고치려면, 각 호출마다 `distance`가 어떻게 변하는지 추적하며 변경해야한다. 여러 분기조건과 상태가 있는 실제 어플리케이션을 테스트한다면 어떨까? 테스트는 수정을 용이하게 하는 도구가 아닌 고통이 될 것이다.

그래도 일단 테스트가 통과하도록 변경해보자.

```js
// test2.test.js
import { buildCar } from "./car";

describe("#buildCar", () => {
  // <A>
  it("works correctly", () => {
    const car = buildCar();

    expect(car.back).toBeInstanceOf(Function);
    expect(car.go).toBeInstanceOf(Function);

    expect(car.getDistance()).toBe(0);
    expect(car.back()).toBe(-3000);
    expect(car.go()).toBe(-2999); // -3000 + 1 = -2999

    // distance가 100이 되려면 몇번 루프 돌아야하지?
    for (let i = 0; i <= 2999 + 100; i++) {
      car.go(); // -2999 + 2999 + 100
    }
    expect(car.getDistance()).toBe(100);

    // 다른 메서드가 있어서 또 추가된다면?
    // 다른 메서드의 동작이 변경된다면?
    // => 영향을 받지 않는 모든 라인을 확인하고 수정해야함
  });
});
```

실제 동작하는 코드를 짜는 것 만큼이나 많은 생각을 하게 하는 테스트코드다. 왜 고통스러울까?

- 변화하는 `distance`의 값에 각 테스트(expect)가 의존적이다.
  (한 동작이 변화면 모든 테스트가 영향 받는다.)
- 수정시 마다 각 함수들이 무슨 값을 내는지 실제 구현된 코드의 조건을 확인해야한다.
  - 그러면서도 테스트가 모든 경우를 커버하는지도 의심스럽다.
  - 테스트 코드를 왜 짜는 것인지 본분을 잃어버리게 한다. (개발자는 테스트 코드를 테스트하는 역할?)

문제를 해결하려면 다음 두가지를 기억해야한다.

- 테스트는 **독립적**으로 동작해야한다.
- 테스트를 **구조화**해야한다.

그리고 다음도 고려해야한다. 위 두가지를 만족하면 아래 내용은 대개 해결된다.

- 테스트는 수정시 문제를 파악할 수 있어야한다.
  - 코드를 수정하고 테스트 코드를 맞추든
  - 테스트 코드를 수정하고 코드를 수정(TDD)하든 괜찮다. 어쨋거나 이해야 쉬워야한다.

독립적으로 동작해야한다는 것은 앞, 뒤 테스트가 다음 테스트에 영향을 끼쳐서는 안된다는 것이다. 환경은 각 테스트가 이루어지기 전에 세팅되어야하고 가능하면 테스트 이후에는 모든 설정을 리셋시켜 다음 테스트는 항상 멱등하게 이루어질 수 있도록 해야한다. 혹 다른 테스트의 변경이 있더라도 말이다. 테스트가 독립적이려면 구조화가 필수적이다.

구조화가 먼저이기 때문에 구조화를 어떻게 할 것인지 알아보자.

### 테스트 구조화 `<A> 문제 해결`

구조화를 하려면 우선 내가 테스트하려는 것이 무엇인지 부터 파악해야한다. 설명(describe)해보면 `buildCar()`는 `getDistance`, `back()`, `go()` 세개의 함수를 객체 프로퍼티로서 반환하며 각 함수는 distance를 클로저로서 가지고 있다. `back()`, `go()` 는 distance를 클로저로서 조작하며 1씩 증감을 가하며 더 이상 변화를 일으키지 않는 경계값(`back()`은 0, `go()`는 100)이 있다.

테스트 구조를 짠다면 다음과 같을 것이다.

```js
// test2.test.js
describe("#buildCar", () => {
  describe("#getDistance", () => {
    it("should return current distance", () => {});
  });

  describe("#back", () => {
    it("should decrease distance", () => {});

    // 경계값 테스트
    it("should not decrease distance when distance is 0", () => {});
  });

  describe("#go", () => {
    it("should increase distance", () => {});

    // 경계값 테스트
    it("should not increase distance when distance is 100", () => {});
  });
});
```

즉, 테스트는 읽어서 행동을 파악할 수 있도록 구성해야한다. 잘 작동한다는 것은 위 사항들이 문제없이 돌아간다는 것을 의미한다.

### 테스트를 코딩하지 말자 `<B> 문제 해결`

distance를 직접적으로 조작할 수 있는 방법이 없기 때문에 처음 `test1.test.js`에서는 distance를 100으로 만들기위해 100번 루프를 돌며 `go()`를 호출했다. 단점을 나열해보면

- 작성자가 `go()`가 1씩 distance를 증가시킴을 알고 루프를 구현해 읽는 사람이 파악하기 힘든 코드가 되었음
  (for문에서 100번 `go()`를 호출하면 무슨일이 벌어지는거지?)
- 불필요한 루프로 테스트 수행시간이 늘어남

이를 해결하려면 애초에 코드를 짤 때 부터 테스트를 고려해야한다. 그래서 보통은 의존성 주입(DI)를 활용한다. (예제는 딱히 객체가 아니라 DI라고 하긴 좀 그렇지만)

```js
// car.js
export const buildCar = ({ distance } = {}) => {
  let distance = distance || 0;

  return {
    getDistance: () => distance,
    back: () => {
      if (distance <= 0) {
        return 0;
      }
      distance -= 1;

      return distance;
    },
    go: () => {
      if (distance >= 100) {
        return distance;
      }
      distance += 1;

      return distance;
    },
  };
};
```

이제 테스트는 어떻게 변할 수 있을까?

```js
// test1.test.js
describe("#buildCar", () => {
  // <A>
  it("works correctly", () => {
    const car = buildCar();

    expect(car.back).toBeInstanceOf(Function);
    expect(car.go).toBeInstanceOf(Function);

    expect(car.getDistance()).toBe(0);
    expect(car.back()).toBe(0);
    expect(car.go()).toBe(1);

    const car2 = buildCar({ distance: 100 }); // 100인 경우를 테스트하고 싶어
    car2.go();
    expect(car2.getDistance()).toBe(100);
  });
});
```

또는 setDistance() 메서드를 만들어두면 되겠다.

```js
  ...
  setDistance: (distance) => { distance = distance; return distance; }
  ...
```

### 테스트는 독립적이어야 한다. `<A> 문제 해결`

다시 테스트는 독립적이어야 한다는 것에 초점을 맞춰보자. 설명을 위해 코드를 조금 추가하자.

```js
// car.js
export const buildCar = ({ distance } = {}) => {
  let distance = distance || 0;
  let overheat = false; // 과열 Flag

  return {
    getOverheated: () => overheat, // get
    getDistance: () => distance,
    back: () => {
      if (distance <= 0) {
        return 0;
      }
      distance -= 1;

      return distance;
    },
    go: () => {
      if (distance >= 100) {
        overheat = true;
        return distance;
      }
      distance += 1;

      return distance;
    },
    fullAccel: () => {
      // 풀악셀은 과열을 유발
      overheat = true;
    },
  };
};
```

```js
// test3.test.js
  ...

  describe('#go', () => {
    it('should increase distance', () => {
      expect(car.go()).toBe(1);
    })

    // 경계값 테스트
    it('should not increase distance when distance is 100', () => {
      car.setDistance(100);
      expect(car.go()).toBe(100);
    })
  })

  describe('#fullAccel', () => {
    it('should make engine overheat', () => {
      // car.fullAccel()
      expect(car.getOverheated()).toBe(true);
    })
  })
```

car가 상태를 테스트(it)간에 공유하기 때문에 fullAccel을 호출하지 않았음에도 테스트는 통과한다. 정말 어이없는 실수이고 설명을 위해 끼워넣은 억지스러운 면도 있지만, 상태를 공유하는 것이 결코 좋은 생각은 아니라는 것은 알 수 있다. 보통 이런 경우를 마주하면 다른 모든 테스트를 바꿔보며 문제를 찾아야하는 경우가 많다. 실제 개발을 진행하며 생각보다 많이 일어난다.

수정의 갈피를 못잡는 것은 약간의 테스트 성능 저하보다 비용이 크다. 그래서 다음과 같이 해주는 편이 낫다. (만약 `buildCar`가 데이터베이스 접근 같은 것을 행한다면, 대체로 시간이 꽤나 소요되기 때문에 다른 방법을 고려해볼 필요가 있다.)

```js
describe('#buildCar', () => {
  let car = null;

  // 초기화
  beforeEach(() => {
    car = buildCar();
  })

  // 정리
  afterEach(() => {
    car = null;
  })

  describe('#getDistance', () => {
    it('should return current distance', () => {
      expect(car.getDistance()).toBe(0);
    })
  })

  describe('#back', () => {
    it('should decrease distance', () => {
      car.setDistance(1);
      expect(car.back()).toBe(0);
    })
    ...
  })

  ...
})
```

## 정리

코드 작성도 미리 안해놓고 쓰다보니까 문서가 두서없이 엉망이 된 것같은데 테스트 작성 요령을 요약하면 다음과 같다.

- 테스트는 테스트 대상의 행동, 상황, 목적에 기반해 구조화. 가능하면 describe, it을 남기고 모두 접었을 때 의미를 가지도록 구성하는 것이 좋다.
  - `describe`는 테스트 대상이나 주어진 상황 또는 조건을 설명해야한다.
  - `it`은 상황이 아니라 테스트의 결과를 가능한 구체적으로 설명해야한다.
- 각 테스트는 독립적이어야 한다.
  - 이를 달성하기 위해서 beforeEach 등의 훅을 이용해 초기화 해주어야한다.
  - 다른 테스트에 영향을 미칠만한 (전역, 스코프) 변수를 가능한 만들지 않는다.
- 테이블 테스트가 가능한 경우 적극 활용한다.

  - Jest 최신버전에는 `describe.each(table)`, `test.each(table)`같은 메서드가 준비되어있지만 현재 우리 버전에서는 사용할 수 없다.
  - 대략 다음과 같이 하면 된다. (설명문은 알아서 잘...)

  ```js
  const table = [
    [{ name: "A" }, "a"],
    [{ name: "B" }, "b"],
    [{ name: "C" }, "c"],
  ];

  table.forEach((row) => {
    const [input, expected] = row;

    it(`should return ${expected} if input is ${JSON.stringify(input)}`, () => {
      expect(extractName(input)).toBe(expected);
    });
  });
  ```

- 경계값을 꼭 테스트한다.
  (대부분의 예상못한 로직상 버그는 여기서 나온다. 2000년도 윈도우의 밀레니엄 버그가 두려웠던 것도 그 이유)
- 테스트코드에 상세구현을 코딩하게되면 문제가 있다는 신호다. 이런 상황을 피한다.
- 코드 작성시 부터 DI를 적극 활용한다.
- 복잡성 피하기
  - 복잡한 로직은 가능한 나누어 순수함수로 구성한다. (상태를 갖지 않도록)
  - 로직(if문이 많아 단번에 이해하기 힘든 예술적인 무언가)가 포함되면 가능한 추출해 해당 로직을 테스트하도록 한다.
