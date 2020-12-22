# Node.js 디자인 패턴

> 🤮 책이 굉장히 읽기 힘들다. 심심할 때 읽어나가자.

## 1장. Node.js 플랫폼에 오신 것을 환영합니다

- `const` 로는 객체 내부 까지 변경되지 않도록 할 수 없는데, `Object.freeze`를 사용하면 가능하다.
- 화살표 함수의 this는 어휘범위(lexical scope)에 bind된다. (부모 블록의 값과 같다)
- `Map`
  - 일반 객체로도 해시 맵을 만들 수 있지만, ES2015에서는 `Map` 프로토타입을 제공
  - Map은 키로 함수 또는 객체를 사용할 수 있음 (일반 객체는 string)
  - 일반 객체는 순서가 보장되지 않지만, Map은 삽입순서대로 순회함이 보장됨
- `Set`: 유일한 고유값을 가지는 콜렉션
- `WeakMap`
  - 요소 전체를 순회할 수 있는 방법이 제공되지 않음
  - 객체만 키로 가질 수 있음
- `WeakSet`

### 알아보기

- [ ] Node.js Reactor 패턴과 이벤트 디멀티플렉서

## 2장. Node.js 필수 패턴

callback과 event emitter를 상황에 따라 적절히 사용하면 유연한 프로그램을 만들 수 있다.

### 콜백 패턴

- 콜백을 어떤 조건에 따라 어떨 땐 동기적으로, 어떨 땐 비동기적으로 호출 시키는 것은 위험하다 (예측할 수 없다)
- Node.js 콜백 규칙

  - 콜백은 가장 마지막에
  - 콜백의 에러는 맨 앞에

  ```js
  fs.readFile("foo.text", "utf8", (err, data) => {});
  ```

- 비동기 내부 오류를 `try ~ catch`를 통해 callback으로 전달하여 처리

### 모듈 시스템

**CommonJS 모듈** 시스템위에 사용자 정의 확장을 추가한 모듈 시스템을 사용

- `require()`는 동기적
- 모듈은 캐시되어 단 한번만 평가됨
- 순환의존이 허용되며, 이 때 불완전 로드 될 수 있다. 이는 순서가 중요함
- 모듈은 가능한 하나의 책임을 지는 것이 좋으며 모듈에 의해 캡슐화 되어야함

### 관찰자 패턴

- `EventEmitter`를 사용하면 달성할 수 있다.