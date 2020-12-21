# JavaScript Patterns

> 자바스크립트 코딩 기법과 핵심 패턴

이 책은 ES5 기반으로 작성되었기 때문에, 어느정도는 필터링할 필요가 있었다.

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

### 비공개 프로퍼티와 메서드

### 모듈 패턴

### 샌드박스 패턴

### 스태틱 멤버

### 객체 상수

### 체이닝 패턴

### method() 메서드

## 6장. 코드 재사용 패턴

## 7장. 디자인 패턴

## 8장. DOM과 브라우저 패턴
