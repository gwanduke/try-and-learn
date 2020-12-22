# JavaScript Patterns

> 자바스크립트 코딩 기법과 핵심 패턴

이 책은 ES5 기반으로 작성되었기 때문에, 어느정도는 필터링할 필요가 있었다.

## 목차

- [JavaScript Patterns](#javascript-patterns)
  - [목차](#목차)
  - [❌ 복습 및 정리](#-복습-및-정리)
  - [1장. 개요](#1장-개요)
  - [2장. 기초](#2장-기초)
  - [3장. 리터럴과 생성자](#3장-리터럴과-생성자)
  - [4장. 함수](#4장-함수)
    - [콜백](#콜백)
    - [초기화 시점의 분기](#초기화-시점의-분기)
    - [설정 객체 패턴](#설정-객체-패턴)
    - [커리](#커리)
  - [5장. 객체 생성 패턴](#5장-객체-생성-패턴)
    - [네임스페이스 패턴](#네임스페이스-패턴)
    - [의존 관계 선언](#의존-관계-선언)
    - [비공개 프로퍼티와 메서드](#비공개-프로퍼티와-메서드)
    - [모듈 패턴](#모듈-패턴)
    - [샌드박스 패턴](#샌드박스-패턴)
    - [스태틱 멤버](#스태틱-멤버)
      - [공개 스태틱 멤버](#공개-스태틱-멤버)
      - [비공개 스태틱 멤버](#비공개-스태틱-멤버)
    - [객체 상수](#객체-상수)
    - [체이닝 패턴](#체이닝-패턴)
    - [method() 메서드](#method-메서드)
  - [6장. 코드 재사용 패턴](#6장-코드-재사용-패턴)
    - [클래스](#클래스)
    - [그 외 새로운 방법](#그-외-새로운-방법)
  - [7장. 디자인 패턴](#7장-디자인-패턴)
    - [싱글톤 (Singleton)](#싱글톤-singleton)
    - [팩토리 (Factory)](#팩토리-factory)
    - [반복자 (Iterator)](#반복자-iterator)
    - [장식자 (Decorator)](#장식자-decorator)
    - [전략 (Strategy)](#전략-strategy)
    - [파사드 (Facade)](#파사드-facade)
    - [프록시 (Proxy)](#프록시-proxy)
    - [중재자 (Mediator)](#중재자-mediator)
    - [감시자 (Observer), Pub/Sub Pattern](#감시자-observer-pubsub-pattern)
  - [8장. DOM과 브라우저 패턴](#8장-dom과-브라우저-패턴)

## ❌ 복습 및 정리

책이 다루는 자바스크립트가 매우 옛날 버전이라 자바스크립트에 대한 충분한 이해가 없으면 따라가기 버거울 것 같았다. 예전의 나였다면 금새 책을 접었겠지만 지금와서 읽어보니 나름 아는 내용도 많고 중간 중간 알지 못했던 내용도 있어서 도움이 되었다.

얘기 했듯이 Old JS에 대한 내용이 많이 때문에 실무적으로는 크게 도움이 안될 수도 있겠다. 어느정도 필터링 해서 활용해야할 부분이 있음을 알고 있도록 하자.

한번더 볼만한 내용은 책에 flag 해두었으나, 복습은 아래 정리한 내용만 여러번 읽어보면 되겠다.

- [ ] 1회독
- [ ] 2회독
- [ ] 3회독

## 1장. 개요

- 자바스크립트는 사실 객체지향언어이다. (대부분이 객체로 취급되어서, 변수 선언 또한 활성객체에 할당되기 때문에)

## 2장. 기초

- 코드를 이해하는데 걸리는 시간을 줄이는 것이 중요
- 코드를 작성하는 것 보다 읽는데 더 많은 시간이 소요됨
- 유지보수 가능한 코드란?
  - 읽기 쉽다
  - 일관적이다
  - 예측 가능하다
  - 한 사람이 작성한 것 처럼 보인다
  - 문서화 되어있다.
- 지켜주면 좋을 것
  - 전역객체 접근/수정 최소화
  - var 사용시에는 함수 상단에 한번에 선언 (용도확인, 호이스팅 이상동작 최소화)
  - for문 사용시 length를 캐싱하고 이용 (`var len = arr.length`, 성능적인 이유로)
  - (배열도 가능하지만 열거 순서가 정해져 있지 않으므로 권장하진 않음) `for ~ in`은 객체에 대해서만 사용하고, hasOwnProperty로 꼭 확인
  - (폴리필을 제외하고) 내장 생성자/프로토타입 확장하지 않기
  - eval 절대 금지, new Function 도 사용금지 하지만 (지역변수로서 취급되므로) eval보단 낫다.
  - parseInt를 통한 숫자변환시 기수를 명시 (`parseInt(month, 10)`). `+"08"`, `Number("08")`이 더 빠르지만 "08하이"같은 문자열은 처리하지 못함.

그 외 내용은 명명규칙, JSDoc 에 대한 내용인데 자세히 알 필요는 없다.

코드 포맷팅 문제는 근래 Prettier가 등장하면서 거의 해결된 것같아 신경쓰지 않아도 되겠다.

## 3장. 리터럴과 생성자

- 생성자 사용보다는 리터럴 표기법을 사용하라
  - 안좋은 예) `(new Object(1)).constructor === Number`
- 배열인지 아닌지 판단: `Array.isArray` 사용
- 동적인 정규표현식이 아니라면 리터렬 표현식을 사용하자
- 에러는 반드시 `Error`를 사용해야하는 것은 아니다. 객체로서 보통 name, message가 공통이므로 이를 사용하되 앱 내에서 일관되게 커스터마이징해 사용하면 된다.

## 4장. 함수

함수는 객체이며, 지역 유효범위를 제공한다.

- 함수는 실행 가능한 객체로 이해하는 것이 좋다 (ex. `var add = new Function('a, b', 'return a + b')`)
- 함수에는 `name` 프로퍼티가 존재하며, 표준은 아니다.
- 호이스팅이라는 용어는 ECMAScript에 정의되지는 않았지만 현상을 설명하기엔 적절하다.

### 콜백

- 브라우저 프로그래밍은 대개 event driven 방식이기 떄문에, 콜백 패턴 사용이 적절하다.
- 라이브러리에서 콜백 형태로 "연결고리(hook)"을 제공함으로서 라이브러리 메서드를 확장 가능하게 할 수 있다. 그래서 복잡한 사용자 구현은 콜백으로 제공하고, 라이브러리는 핵심 기능에만 집중하는 형태로 개발하는 것이 가능하다.

### 초기화 시점의 분기

```js
// utils의 메서드로서 판별하는게 아니라, 초기화 시점에 할당해 분기 처리를 줄임
var utils = {
  addListener: null,
  removeListener: null
}

if (typeof window.addEventListener === 'function') {
  utils.addListenr = ...;
  utils.removeListener = ...;
} else if (...) {
  utils.addListenr = ...;
  utils.removeListener = ...;
}
```

### 설정 객체 패턴

함수의 파라미터가 많을 때, 설정 객체를 이용할 수 있다.

```js
func(a, b, c, d);
func({ a, b, c, d }); // 설정 객체 패턴
```

- 장점
  - 매개변수 순서 기억할 필요 없음
  - 선택적인 매개변수 안전하게 생략
  - 읽고 유지보수 하기 쉬움
  - 매개변수 추가/제거 편리
- 단점
  - 매개변수 이름을 기억해야음
  - 프로퍼티 이름은 압축되지 않음

### 커리

```js
// 다음 형태로 동작했으면 하지만,
// 유효한 자바스크립트 코드는 아니다.
var add = function (a, b) {
  return a + b;
};
var newAdd = add.apply(null, [5]);
```

```js
function curry(fn) {
  var slice = Array.prototype.slice,
    stored_args = slice.call(arguments, 1); // 인덱스 1~end의 새로운 배열

  return function () {
    var new_args = slice.call(arguments),
      args = stored_args.concat(new_args);

    return fn.apply(null, args);
  };
}

function add(a, b, c) {
  return a + b + c;
}

var addOne = curry(add, 1);
console.log(addOne(3, 3)); // 7;
console.log(curry(curry(add, 1), 2)(3)); // 6;
```

## 5장. 객체 생성 패턴

자바스크립트에서는 네임스페이스, 모듈 패키지, 비공개 프로퍼티, 스태틱 멤버 등의 기능이 별도로 지원되지 않아 다음 범용 패턴을 사용해 구현할 수 있다.

코드를 정리하고 구조화하게 도와주며, 암묵적인 전역의 영향력을 약화시킨다.

### 네임스페이스 패턴

모든 함수와 프로퍼티를 한개의 전역 변수에 대한 프로퍼티로 취급하는 방법

- 장점
  - 이름 충돌 방지
- 단점
  - 코드량 증가 (파일용량 증가)
  - 전역 인스턴스가 1개 이므로, 코드 어느 부분이 수정된다는 것은 이 전역 변수의 수정을 의미함
  - 이름이 중첩되고 길어짐

```js
const MY_NAMESPACE = {};

MY_NAMESPACE.Parent = function () {};
MY_NAMESPACE.Child = function () {};
MY_NAMESPACE.some_var = 1;
MY_NAMESPACE.modules = {};
MY_NAMESPACE.modules.module1 = {};
MY_NAMESPACE.modules.module1.data = { foo: "bar" };
```

### 의존 관계 선언

전역의 모듈을 사용할 때 매번 직접 사용하는게 아니라, 함수 상단부에 명시해 사용함이 다음과 같은 이점을 가짐

- 의존 관계가 명시되어 파악하기 좋음
- 코드 압축의 도움을 받을 수 있음

```js
// DONT
function test() {
  alert(MY_NAMESPACE.modules.m1);
  alert(MY_NAMESPACE.modules.m2);
}

// DO
function test() {
  var modules = MY_NAMESPACE.modules; // 의존 관계 선언
  alert(modules.m1);
  alert(modules.m2);
}
```

### 비공개 프로퍼티와 메서드

자바스크립트에는 `private`, `protected`, `public` 프로퍼티와 메서드를 나타낼 수 없기 때문에 다음과 같은 패턴 사용

- 비공개 멤버: 클로저를 이용
- 특권 메서드: `getName()` 같은 자유변수를 참조하는 메서드

### 모듈 패턴

- 모듈 노출 패턴: 즉시 실행 함수에서 공개하고 싶은 API만 노출

  ```js
  MY_NAMESPACE.util.array = (function () {
    return {
      isArray: isArray,
      indexOf: isArray,
    };
  })();
  ```

- 생성자를 생성하는 모듈

  ```js
  MY_NAMESPACE.util.Array = (function () {
    // ...

    Constructor = function (o) {
      this.elements = this.toArray(o);
    };
    Constructor.prototype = {
      // ...
    };

    return Constructor;
  })();
  ```

### 샌드박스 패턴

네임스페이스 패턴의 다음 단점을 해결해줌

- 전역 객체가 단 하나의 전역 변수에 의존하는 점 (그래서 동일 라이브러리의 두 버전을 한페이지에서 실행 불가)
- 이름이 비교적 길어지는 점 (런타임에 탐색 작업이 늘어나는 점)

callback 함수에 새로 생성된 instance(네임스페이스 모듈)가 전달되어 모듈을 사용할 수 있게 됨. 구현은 다음 특징을 이용해 구현하면 된다. (p124 참고)

- new를 강제하도록 하는 패턴
- 생성자 내부에 this에 프로퍼티 추가
- 객체 생성시 필요한 모듈을 배열로서 전달 받아 필요한 모듈만 초기화
- 초기화한 모듈들을 포함하는 객체를 callback에 전달

### 스태틱 멤버

#### 공개 스태틱 멤버

생성자 함수의 프로퍼티로 함수를 추가함으로서 구현할 수 있다.

```js
function Func() {}
Func.staticFunc = function () {};
```

인스턴스의 메서드로도 등록할 수 있으며, 이 때 this를 주의해 사용하자.

```js
Func.prototype.staticFunc = Func.staticFunc;
```

추가로, `this instanceof Func` 를 이용하면 인스턴스 내에서 staticFunc가 쓰였는지 판별할 수 있으므로 유용하게 사용할 수 있다.

#### 비공개 스태틱 멤버

```js
var Gadget = function () {
  var counter = 0,
    NewGadget;

  // 실제 생성자 내용
  NewGadget = function () {
    counter += 1;
  };

  // 비공개 스태틱 멤버 counter에 대한 특권 메서드
  NewGadget.prototype.getLastId = function () {
    return counter;
  };

  return NewGadget;
};
```

### 객체 상수

> `const`를 이용하거나, 대문자로 명명하고 상수로 간주하면 된다.
>
> 또는 상수를 정의하고, 가져오는 앱 전역 함수를 만들면 되겠는데 내 생각에 현대 자바스크립트에서는 굳이 필요없겠다.

### 체이닝 패턴

메서드를 가진 객체. 예를 들면 `this`를 다시 반환함으로서 체이닝 시킬 수 있다.

- 장점
  - 하나의 문장처럼 읽을 수 있음
- 단점
  - 디버깅이 어려움 (한라인에 다 있으므로)

### method() 메서드

> 클래스 구현을 어떻게 편리하게 할까? 에서 출발된 방법인데, 내 생각엔 현대 자바스크립트에서는 굳이 알고 있지 않아도 되겠다. (134p 참고)

## 6장. 코드 재사용 패턴

> 코드 재사용이 클래스와 상속만을 떠올리기 쉽지만, 이는 코드 재사용의 한가지 방법이라는 것만 기억하자.
>
> 읽어보니 그 내용을 세세히 알 필요는 없고 기본적인 방법, 프로토타입 기본만 이해하고 있으면 되겠다.

### 클래스

클래스의 구현 방법은 다양하다. 그 예제를 다루고 있는데, 각 방법이 완벽한 클래스 구현은 아니었으며 장/단점이 있었다. 기본적인 프로토타입에 대한 이해만 있으면 어렵지 않게 이해할 수 있었다. 흥미로웠던 주제/방법을 뽑으면 다음과 같다.

- 생성자 빌려쓰기 -> 생성자 함수 내부에서 다른 생성자 함수를 호출 (`Parent.call(this)`)
- `klass` 같은 함수를 구성해서 클래스를 흉내낼 수 있는데, 언어에서 지원되지 않는 새로운 개념을 도입하므로 추천되지 않음

### 그 외 새로운 방법

- 프로토타입을 활용한 상속 (부모를 프로토타입으로 지정해 생성)
- 프로퍼티 복사를 통한 상속 (단순 기능 복사)
  - 믹스인 (여러 객체를 받아 복사)
- 메서드 빌려쓰기 (call, apply, bind)
  - bind를 사용하면 인자를 미리 지정해둘 수 있음

## 7장. 디자인 패턴

### 싱글톤 (Singleton)

- 스태틱 프로퍼티 이용

  ```js
  function Example() {
    if (typeof Example.inst === "object") {
      return Example.inst;
    }
    Example.inst = this;
  }
  ```

- 클로저 이용

  ```js
  function Example() {
    var inst = this;

    // 생성자 재작성 (첫 실행 이후 덮어씌움)
    Example = function () {
      return inst;
    };
  }
  ```

### 팩토리 (Factory)

> 런타임에 객체타입을 "문자열"로 지정해 객체들을 생성하는 메서드

```js
function CarMaker() {}

CarMaker.prototype.drive = function () {
  return "I have " + this.doors + " doors";
};

CarMaker.factory = function (type) {
  var newcar;

  if (typeof CarMaker[type] !== "function") {
    throw new Error();
  }

  // 생성자 존재를 확인했으므로, 부모 상속 (단 한번만)
  if (typeof CarMaker[type].prototype.drive !== "function") {
    CarMaker[type].prototype = new CarMaker();
  }

  newcar = new CarMaker[type]();

  return newcar;
};

CarMaker.Compact = function () {
  this.doors = 4;
};
CarMaker.Sport = function () {
  this.doors = 2;
};

const sport = CarMaker.factory("Sport");
console.log(sport.drive());
```

이와 비슷하게 `Object()`가 팩토리 처럼 동작한다.

### 반복자 (Iterator)

현대 자바스크립트에서는 iterator가 언어차원에서 제공되는데 이를 이용하면 편리하겠다.

> 복잡한 데이터 구조를 순회하거나 순차적으로 이동하는 API를 제공

직접 구현한 예제

```js
var agg = function () {
  var index = 0,
    data = [1, 2, 3, 4, 5],
    length = data.length;

  return {
    next: function () {
      var element;
      if (!this.hasNext()) {
        return null;
      }
      element = data[index];
      index = index + 2;
      return element;
    },
    hasNext: function () {
      return index < length;
    },
  };
};

// Usage
while (agg.hasNext()) {
  console.log(agg.next());
}
```

### 장식자 (Decorator)

개인적인 경험으로 장식 패턴은 아래 설명된 방법보다 더 많다. 기본적인 내용만 이해하고 팀에서 편리한 방법으로 진행하면 되겠다.

> 런타임에 객체에 기능 추가

```js
function Sale(price) {
  this.price = price || 100;
}
Sale.prototype.getPrice = function () {
  return this.price;
};
Sale.decorators = {};

Sale.decorators.money = {
  getPrice: function () {
    return "$" + this.uber.getPrice().toFixed(2);
  },
};
Sale.decorators.cdn = {
  getPrice: function () {
    return "CDN$" + this.uber.getPrice().toFixed(2);
  },
};
Sale.prototype.decorate = function (decorator) {
  var F = function () {},
    overrides = this.constructor.decorators[decorator],
    i,
    newObj;
  F.prototype = this;
  newobj = new F();
  newobj.uber = F.prototype;
  for (i in overrides) {
    if (overrides.hasOwnProperty(i)) {
      newobj[i] = overrides[i];
    }
  }
  return newobj;
};
```

### 전략 (Strategy)

> 인터페이스를 동일하게 유지하면서, 지정된 작업(컨텍스트)을 처리하기 위한 최선의 전략 선택 (런타임에 알고리즘을 선택할 수 있도록 해줌)

다음과 같은 때에 사용한다.

```js
const data = {
  firstName: "Gwanduk",
  age: "99999",
};

const validator = {
  config: {},
  validate: function () {},
};

validator.config = {
  firstName: "not_empty",
  age: "kid",
};
validator.validate(data); // !
```

### 파사드 (Facade)

> 자주 사용되는 (또는 설계가 미흡한) 메서드들을 감싸 새로운 메서드를 만들어 더 편리한 API 제공

반복되는 작업을 하나로 묶어 동일 API로 관리하는 것을 뜻하는데, DRY하게 코드를 관리하기 위해서 그리고 추상화된 API를 제공하기 위해서, 버전에 따른 세부 구현을 반복하지 않기 위해서 하나의 API로 감싸 제공하는 것을 말한다.

예를 들면,

```js
var myevent = {
  // ...
  stop: function (e) {
    e.preventDefault();
    e.stopPropagation();
  },
  // ...
};
```

### 프록시 (Proxy)

> 객체를 감싸 객체에 대한 접근 통제 (큰 비용이 드는 작업을 하나를 묶거나, 필요할 때 실행하도록 처리 가능)

- 하나의 객체가 다른 객체에 대한 인터페이스로서 동작
- lazy 처리에 사용할 수 있다. (proxy로 감싸, 실제 사용시 초기화를 진행하도록 하여서)
- 라운드 트립을 줄이거나, 캐싱 처리를 할 수 있다.

대충 다음과 같이 작성 가능하겠다.

```js
var proxy = {
  ids: [],
  delay: 50,
  timeout: null,
  callback: null,
  context: null,

  // 원래 호출해야하는 다른 객체의 makeRequest 대신 이 proxy의 makeRequest를 호출
  makeRequest: function (id, callback) {
    this.ids.push(id);
    this.callback = callback;

    if (!this.timeout) {
      this.timeout = setTimeout(function () {
        proxy.flush(); // flush에서 실제 makeRquest 수행
      }, this.delay);
    }
  },
};
```

### 중재자 (Mediator)

> 객체들이 직접 통신하지 않고, 중재자를 통해서만 통신하도록 함으로서 객체간 결합도를 낮춤

어플리케이션이 커지면서 객체간에 서로 너무 많은 정보를 알게되면 결합도가 높아져 간단한 변경도 어렵게 된다.

**중재자 패턴**을 사용하면 결합도를 낮춰 유지보수성을 높일 수 있는데, 객체간에 직접 통신하지 않고 중재자를 거쳐 통신하도록 하는 패턴이다. 즉, 서로간에 아는 정보를 최소화 함으로서 달성한다.

실제로 구현을 해보면 MVC에서 Controller 같은 역할을 Mediator가 수행하는데, 각 객체는 본인이 할일을 하고 Mediator가 각 객체의 public method를 통해 조작을 수행하는 식이다.

개인적인 의견으로는 딱히 정해진 패턴이라기 보다는 설계 방법의 하나라고 볼 수 있겠다. 그래서 예제는 생략하도록 하겠다.

### 감시자 (Observer), Pub/Sub Pattern

> 감시가능한 객체(observable)들을 만들어 결합도를 낮춤
>
> 특정 이벤트를 감시하고 모든 감시자들에게 그 이벤트가 발생했을 때 알려줌

- 결합도를 낮추는 것이 주요 목적
- 어떤 객체가 특정 메서드를 호출하는 대신, 객체의 특별한 행동(event)를 구독해 알림을 받음
- 구독자(Subscriber) == 감시자(Observer)
- 발행자(Publisher) == 감시대상(Subject/Observable)
- 발행자의 구성요소
  - subscribers 배열 (콜백 또는 객체 등록)
  - subscribe(type)
  - unsubscribe(type)
  - publish(type)

```js
var publisher = {
  subscribers: {},
  subscribe: function (fn, type) {
    type = type || "any";
    if (typeof this.subscribers[type] === "undefined") {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },
  unsubscribe: function (fn, type) {
    // ...
  },
  publish: function (type) {
    // ...
  },
};

function makePublisher(obj) {
  var i;
  for (i in publisher) {
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
      obj[i] = publisher[i];
    }
  }
  obj.subscribers = {};
}

var paper = {
  daily: function () {
    this.publish("daily");
  },
  monthly: function () {
    this.publish("monthly");
  },
};

makePublisher(paper);
paper.subscribe(joe.drinkCoffe, "daily");
paper.subscribe(joe.preNap, "monthly");

paper.daily();
paper.monthly();
```

중재자가 모든 객체에 대한 정보를 아는 반면, 감시자 패턴은 그다지 아는게 없다는게 특징이다.

## 8장. DOM과 브라우저 패턴

- 브라우저 환경을 확인하기 보다는 해당 환경에 사용하려는 메서드를 가지고 있는지 확인하고 polyfill해주자

  ```js
  // DONT
  if (navigator.userAgent.indexOf("MSIE") !== 0.1) {
    // ...
  }

  // DO
  if (typeof document.attachEvent !== "undefined") {
    // ...
  }
  ```

- DOM 접근은 비교적 비용이 많이 들기 때문에
  - 루프내 DOM 접근을 피하자
  - 지역변수에 할당하자
  - 셀렉터 API를 사용하자
  - length를 캐시하자
- 브라우저는 화면을 다시 그리는 repaint, 엘리먼트를 재구조화하는 reflow 하는데 비용이 많이 든다. 그래서 DOM 업데이트를 최소화하는 것이 좋다.
  - 즉시 문서에 반영하지 않고, fragment를 사용함이 좋다.
  - 필요하다면 `.cloneNode()`를 이용해 복제본으로 작업하고 교체하자
- 이벤트 위임
  - 단점
    - 불필요한 이벤트를 걸러내는 코드가 약간 추가됨
  - 장점
    - 성능상 이점
    - 코드의 간결성
- 웹워커
  - 웹워커는 백그라운드 스레드에서 수행됨
  - `postMessage()`로 스레드간 메시지 전달
  - `onmessage` 콜백 구현
- 배포
  - 스크립트 병합
    - 빠르게 로딩(HTTP부하 줄이기)하기 위해서는 외부 자원을 줄이는 것이 중요
    - 하지만 브라우저 캐싱의 이점을 가지지 못할 수 있으므로 core와 그 외로 파일을 전략적으로 나누는 것이 좋음 (수정 가능성이 있는 것과 없는 것을 구분)
  - 코드압축(minify), gzip
  - Expires 헤더로 캐싱 시간 조율
  - CDN 사용
  - 스크립트
    - script 태그의 위치
    - [ ] HTTP chunked 인코딩 사용 => 잘 모르는 내용이라 자세히 찾아봐야하겠다.
    - script가 로딩되는데에는 시간이 걸리기 때문에 script 태그를 동적으로 생성하고 비동기 로딩을 시도하는 것도 나쁘지 않은 방법이다.
    - window.onload 이벤트 이후에 로딩하도록 처리
    - 특정 액션(클릭) 후 로딩하도록 처리
    - 마우스 오버나 폼 입력시 다음 페이지에 필요한 파일 로딩

그 외 xhr, SOP를 피하기 위한 JSONP 등의 내용이 등장하는데 중요하진 않았다.
