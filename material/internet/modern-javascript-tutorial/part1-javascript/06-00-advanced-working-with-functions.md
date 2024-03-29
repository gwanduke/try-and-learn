# 6장. 함수 심화학습

- [6장. 함수 심화학습](#6%ec%9e%a5-%ed%95%a8%ec%88%98-%ec%8b%ac%ed%99%94%ed%95%99%ec%8a%b5)
  - [6.3 변수의 스코프](#63-%eb%b3%80%ec%88%98%ec%9d%98-%ec%8a%a4%ec%bd%94%ed%94%84)
    - [코드블록](#%ec%bd%94%eb%93%9c%eb%b8%94%eb%a1%9d)
    - [중첩 함수](#%ec%a4%91%ec%b2%a9-%ed%95%a8%ec%88%98)
    - [렉시컬 환경](#%eb%a0%89%ec%8b%9c%ec%bb%ac-%ed%99%98%ea%b2%bd)
  - [6.4 오래된 'var'](#64-%ec%98%a4%eb%9e%98%eb%90%9c-var)
    - ['var'는 블록 스코프가 없음](#var%eb%8a%94-%eb%b8%94%eb%a1%9d-%ec%8a%a4%ec%bd%94%ed%94%84%ea%b0%80-%ec%97%86%ec%9d%8c)
    - [함수 시작과 함께 처리되는 'var'](#%ed%95%a8%ec%88%98-%ec%8b%9c%ec%9e%91%ea%b3%bc-%ed%95%a8%ea%bb%98-%ec%b2%98%eb%a6%ac%eb%90%98%eb%8a%94-var)
    - [즉시 실행 함수 표현식](#%ec%a6%89%ec%8b%9c-%ec%8b%a4%ed%96%89-%ed%95%a8%ec%88%98-%ed%91%9c%ed%98%84%ec%8b%9d)
  - [6.5 전역 객체 `OK`](#65-%ec%a0%84%ec%97%ad-%ea%b0%9d%ec%b2%b4-ok)
    - [폴리필 사용](#%ed%8f%b4%eb%a6%ac%ed%95%84-%ec%82%ac%ec%9a%a9)
  - [6.6 객체로서의 함수와 기명 함수 표현식](#66-%ea%b0%9d%ec%b2%b4%eb%a1%9c%ec%84%9c%ec%9d%98-%ed%95%a8%ec%88%98%ec%99%80-%ea%b8%b0%eb%aa%85-%ed%95%a8%ec%88%98-%ed%91%9c%ed%98%84%ec%8b%9d)
    - [`name` 프로퍼티](#name-%ed%94%84%eb%a1%9c%ed%8d%bc%ed%8b%b0)
    - [`length` 프로퍼티](#length-%ed%94%84%eb%a1%9c%ed%8d%bc%ed%8b%b0)
    - [사용자 지정 프로퍼티](#%ec%82%ac%ec%9a%a9%ec%9e%90-%ec%a7%80%ec%a0%95-%ed%94%84%eb%a1%9c%ed%8d%bc%ed%8b%b0)
      - [underscore](#underscore)
    - [기명 함수 표현식 (Named Function Expression, NFE)](#%ea%b8%b0%eb%aa%85-%ed%95%a8%ec%88%98-%ed%91%9c%ed%98%84%ec%8b%9d-named-function-expression-nfe)
  - [6.7 'new Function' 문법](#67-new-function-%eb%ac%b8%eb%b2%95)
  - [6.8 스케줄링: setTimeout과 setInterval](#68-%ec%8a%a4%ec%bc%80%ec%a4%84%eb%a7%81-settimeout%ea%b3%bc-setinterval)
    - [SetTimeout](#settimeout)
  - [6.9 call/apply와 데코레이터, 포워딩](#69-callapply%ec%99%80-%eb%8d%b0%ec%bd%94%eb%a0%88%ec%9d%b4%ed%84%b0-%ed%8f%ac%ec%9b%8c%eb%94%a9)
  - [6.10 함수 바인딩](#610-%ed%95%a8%ec%88%98-%eb%b0%94%ec%9d%b8%eb%94%a9)
  - [6.11 화살표 함수에 대한 재고](#611-%ed%99%94%ec%82%b4%ed%91%9c-%ed%95%a8%ec%88%98%ec%97%90-%eb%8c%80%ed%95%9c-%ec%9e%ac%ea%b3%a0)

## 6.3 변수의 스코프

- 자바스크립트는 함수 지향 언어 === 함수는 1급 시민
  - 개발자에게 많은 자유도 선사 (함수의 동적 생성, 생성한 함수를 인자로 사용 가능, 생성된 곳이 아닌 곳에서 함수를 호출)

### 코드블록

- 코드블록 `{...}` 안에서 선언한 변수는 그 블록 안에서만 사용 가능
- 다만 for문에서 선언된 변수는 블록에 속하는 코드로 취급됨

### 중첩 함수

- 함수 내부에서 선언된 함수를 "중첩 함수" (nested function)이라고 부름
- 함수 지향언어의 특징으로 "중첩 함수"는 반환될 수 있음

```js
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter = makeCounter();

alert(counter()); // 0
alert(counter()); // 1
alert(counter()); // 2
```

### 렉시컬 환경

자바스크립트의 실행 중인 함수, 코드블록, 스크립트 전체는 렉시컬 환경(Lexical Environment)라 불리는 내부 숨김 연관 객체(internal hidden associated object)를 가짐

- 렉시컬 환경의 구성요소
  - 환경 레코드 (Environment Record) - 모든 지역 변수를 프로퍼티로 저장하고 있는 객체. `this` 값도 여기에 저장됨
  - 외부 렉시컬 환경 (Outer Lexical Enviornment)에 대한 참조 - 외부 코드와 연관됨

... (클로저, 호이스팅)

## 6.4 오래된 'var'

### 'var'는 블록 스코프가 없음

- var는 블록 스코프가 아니라 함수 스코프임 (그래서 블록 밖에서 접근 가능함)

```js
if (true) {
  var test = "Hi!";
}

alert(test); // Hi! - if 블록안에 있지만 접근 가능
```

```js
if (true) {
  let test = "Hi!";
}

alert(test); // Error: test is not defined
```

```js
function sayHi() {
  if (true) {
    var phrase = "Hello!";
  }

  alert(phrase); // OK
}

sayHi();
alert(phrase); // Error: phrase is not defined
```

```js
// 화살표 함수도 함수 스코프로 취급될까? yes
const sayHi = () => {
  if (true) {
    var phrase = "Hello!";
  }

  alert(phrase); // OK
};

sayHi();
alert(phrase); // Error: phrase is not defined
```

=> var가 코드 블록을 관통하는 것은 렉시컬 수준이 블록 단위가 아니라서 생기는 현상 (함수 단위임)

### 함수 시작과 함께 처리되는 'var'

- 함수가 시작될 때, var로 선언된 것들은 함수 처음으로 끌어올려진다. 심지어 실행 되지 않을 코드 블록 안에 있더라도 (hoisting)
- 하지만 선언만 끌어올려질 뿐, 할당은 해당 코드를 만나야 이루어짐

```js
function sayHi() {
  // var phrase;
  phrase = "Hello";

  if (false) {
    var phrase = "hi";
  }

  alert(phrase);
}
sayHi();
```

### 즉시 실행 함수 표현식

...

## 6.5 전역 객체 `OK`

- 브라우저: window
- Node.js: global
- 최근엔 이를 통합해 globalThis를 사용하자는 명세가 추가됨

```js
var gVar = 5;
alert(window.gVar); // 5
```

```js
var gLet = 5;
alert(window.gLet); // undefined
```

```js
// 전역변수를 최소화하는 것이 좋지만, 전역 변수를 추가하고자 한다면 이 방식을 권장
window.currentUser = { name: "Gwan" };

console.log(currentUser);
console.log(currentUser.name); // Gwan
```

### 폴리필 사용

다음과 같이 전역객체에 해당 기능이 존재하는지 확인하고 직접 기능 추가 가능

```js
if (!window.Promise) {
  window.Promise = ... // 모던 자바스크립트에서 지원하는 기능을 직접 구현함
}
```

## 6.6 객체로서의 함수와 기명 함수 표현식

- 함수의 자료형은 객체임

```js
function A() {}
console.log(typeof A); // "function" 이지만, 함수는 객체형에 속함. "함수"라는 형은 없음. 함수는 callable한 '행동 **객체**'.

/** JavaScript의 자료형 8가지
 * 1. 숫자형
 * 2. bigint
 * 3. 문자형
 * 4. 불린형
 * 5. null
 * 6. undefined
 * 7. 객체형
 * 8. 심볼형
 */
```

### `name` 프로퍼티

```js
// 1
function sayHi() {}
console.log(sayHi.name);

// 2
let sayHi = function () {};
let sayHi = () => {};
console.log(sayHi.name);

// 3. 이름이 없는 함수는 contextual name 이라는 것을 통해 이름을 가져오게됨 (컨텍스트에서 이름을 가져옴)
function f(sayHi = function () {}) {
  console.log(sayHi.name);
}
f();

// 이렇게 해도 예상한 결과를 가져옴
((sayHi = () => {}) => {
  console.log(sayHi.name); // sayHi
})();

// 4
let user = {
  sayHi() {},
  sayBye: function () {},
  saySomething: () => {},
};

console.log(user.sayHi.name);
console.log(user.sayBye.name);
console.log(user.saySomething.name);
```

```js
// 다음과 같은 경우에는 엔진이 이름을 추론할 수 없고, 이런 경우에는 빈문자열을 할당한다.
let arr = [function () {}];
alert(arr[0].name); // <빈 문자열>
```

### `length` 프로퍼티

내장 프로퍼티 'length'는 함수 매개변수의 개수를 반환

- 나머지 매개변수 (rest)는 개수에 포함되지 않음

> 함수의 length를 검사해서 다형성을 가지도록 하는 예제가 나오는데, 실용적으로는 underscore의 forEach가 인자인 obj의 종류에 따라 다형성을 취한 케이스라 볼 수 있음.
> [underscore - forEach](https://github.com/jashkenas/underscore/blob/master/modules/index.js#L172-L186)

### 사용자 지정 프로퍼티

- 함수 객체에 원하는 프로퍼티를 추가할 수 있음

```js
// 클로저는 아니지만 클로저 같은... 상황에 따라 더 유연하게 사용할 수도 있겠음. 닌자코드일까?
function makeCounter() {
  function counter() {
    return counter.count++;
  }

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

counter.count = 10;
alert(counter()); // 10
```

실제로 underscore는 함수 객체에 프로퍼티를 추가하는 식으로 구성되어있다.

#### underscore

- https://github.com/jashkenas/underscore/blob/c49312c32d50dfc0e01b7bf072bca6a77f9f1809/modules/index.js#L42-L46

  ```js
  // index.js

  // 전역객체
  export default function _(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }

  // 전역객체에 함수를 추가하는 함수
  export function mixin(obj) {
    each(functions(obj), function (name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  }

  // index-default.js
  import * as allExports from "./index";
  import { mixin } from "./index";

  // Add all of the Underscore functions to the wrapper object and return it.
  export default mixin(allExports);
  ```

### 기명 함수 표현식 (Named Function Expression, NFE)

함수 표현식으로 함수를 작성했는데, 그 함수에 이름이 있는 경우를 "기명 함수 표현식"이라 함.

```js
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // func를 사용해서 자신을 호출합니다.
  }
};

sayHi(); // Hello, Guest

// 아래와 같이 func를 호출하는 건 불가능합니다.
func(); // Error, func is not defined (함수 표현식 밖에서는 func을 사용할 수 없습니다.)
```

왜 사용할까?

```js
let sayHi = function (who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest"); // Error: sayHi is not a function
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // sayHi는 더 이상 호출할 수 없습니다!
```

- 내부 이름은 함수 표현식에서만 사용가능하다.

## 6.7 'new Function' 문법

```js
new Function('alert("Hello!")')(); // Hello
```

```js
// new Function은 (`[[Environment]]`가) 전역 렉시컬 환경을 참조함. 즉, 외부 변수에 접근이 불가능하다.
function getFunc() {
  let value = "test";

  let func = new Function("alert(value)");

  return func;
}

getFunc()(); // ReferenceError: value is not defined
```

## 6.8 스케줄링: setTimeout과 setInterval

- `setTimeout` - 특정 시간 이후 함수 실행
- `setInterval` - 지정한 시간 간격으로 함수 실행

이 메서드들은 JavaScript의 스펙이 아님.
하지만 대부분의 환경이 내부 스케줄러와 함께 이 메서드를 제공함. (Node.js, Browser 등...)

### SetTimeout

```js
const printName = (name) => {
  console.log(name);
};

let timerId = setTimeout(printName, 1000, "Gwan"); // 인자 전달이 가능하다!
let timerId = setTimeout('console.log("Gwan")', 1000);

let timerId = setTimeout(printName(), 1000, "Gwan");
// 예상한 대로 동작하지 않음. 함수의 레퍼런스를 넘겨야함
```

## 6.9 call/apply와 데코레이터, 포워딩

## 6.10 함수 바인딩

## 6.11 화살표 함수에 대한 재고
