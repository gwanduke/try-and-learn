# Fundamentals of Testing in JavaScript

> https://testingjavascript.com/lessons/javascript-throw-an-error-with-a-simple-test-in-javascript

- [x] 1. Intro to Fundamentals of Testing in JavaScript
- [x] 2. Throw an Error with a Simple Test in JavaScript
- [x] 3. Abstract Test Assertions into a JavaScript Assertion Library
- [x] 4. Encapsulate and Isolate Tests by building a JavaScript Testing
     Framework
- [x] 5. Support Async Tests with JavaScripts Promises through async await
- [x] 6. Provide Testing Helper Functions as Globals in JavaScript
- [x] 7. Verify Custom

- [Fundamentals of Testing in JavaScript](#fundamentals-of-testing-in-javascript)
  - [2. Throw an Error with a Simple Test in JavaScript](#2-throw-an-error-with-a-simple-test-in-javascript)
  - [3. Abstract Test Assertions into a JavaScript Assertion Library](#3-abstract-test-assertions-into-a-javascript-assertion-library)
  - [4. Encapsulate and Isolate Tests by building a JavaScript Testing Framework](#4-encapsulate-and-isolate-tests-by-building-a-javascript-testing-framework)
  - [5. Support Async Tests with JavaScripts Promises through async await](#5-support-async-tests-with-javascripts-promises-through-async-await)
  - [6. Provide Testing Helper Functions as Globals in JavaScript](#6-provide-testing-helper-functions-as-globals-in-javascript)
  - [7. Verify Custom](#7-verify-custom)

## 2. Throw an Error with a Simple Test in JavaScript

간단한 코드로 예상값과 틀린 경우 `throw Error`를 하는 코드를 작성해보았다. 아마
assertion 라이브러리들이 대략 이런 개념을 사용하지 싶다.

## 3. Abstract Test Assertions into a JavaScript Assertion Library

다음과 같이 간단한 assertion 라이브러리를 만들어 볼 수 있었다.

assertion 라이브러리는 반복적인 테스트를 읽기좋게, 손쉽게 작성하기 위해서 존재하
는 것이 맞는 것같다.

```js
function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
}
```

## 4. Encapsulate and Isolate Tests by building a JavaScript Testing Framework

이전에 작성한 코드는 테스트 실패시 에러가 나지만 에러가 왜 났는지, 어디서 났는지
는 명확하게 알기가 힘들다.

그래서 보통의 assertion 라이브러리에서는 `it`, `test` 같은 함수로 테스트에 대한
설명과 보조함수로 실제 테스트를 넘겨, 테스트가 실행될 때 어떤 것이 성공했고 어떤
것이 실패햇는지 보여주게 된다.

간단하게는 다음과 같이 구현할 수 있었다. 그리고 이렇게 함으로서 callback안에 테
스트 관련 내용들이 전역을 오염시키지 않고 묶여 좋았다.

```js
function test(description, callback) {
  try {
    callback();
    console.log(`✅ ${description}`);
  } catch (err) {
    console.error(`❌ ${description}`);
    console.error(err);
  }
}
```

## 5. Support Async Tests with JavaScripts Promises through async await

이전에 작성한 코드는 비동기 로직을 테스트하는 경우 문제가 생긴다. 이때는 test 함
수에 async, await 해주어 비동기 코드를 기다려줄 필요가 있다. 그렇지 않고
callback이 비동기적이라면 Pass로 수행되고, 조금 후에 callback Promise가 reject
됨에 의해 catch 구문으로 이동하여 정상 판단할 것이다.

```js
async function test(description, callback) {
  try {
    await callback();
    console.log(`✅ ${description}`);
  } catch (err) {
    console.error(`❌ ${description}`);
    console.error(err);
  }
}
```

## 6. Provide Testing Helper Functions as Globals in JavaScript

[Source](./06)

`setupTest.js`, `setup-globals` 같은 파일에 글로벌 변수에 테스트 관련 함수를 설
정해두자. 그리고 node 실행시 이를 포함하도록 하면 각 테스트에서 이 함수를 활용할
수 있다.

```bash
$ node --require ./setup-globals.js ./main.test.js
```

## 7. Verify Custom

```bash
$ npx jest ./06/main.test.js
```

를 해도 결과는 동일하다. jest는 결과를 더 예쁘게 보여주고 다양한 함수를 내장하고
있다는 정도의 차이.
