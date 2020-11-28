# Generator

- [Generator](#generator)
  - [내 생각](#내-생각)
  - [요약 정리](#요약-정리)
  - [References](#references)
    - [봤어요](#봤어요)
    - [아직 안봤어요](#아직-안봤어요)

## 내 생각

MobX, MST에서 flow 유틸리티 안의 함수를 제너레이터로 작성해야한다. 예전에 정말 아주 대충 이해하고 있었는데, 제대로 알 필요가 있을 것같아서 쓱 찾아보니 일단 이터레이터(iterator)에 대한 깊은 이해가 우선일 것같다.

## 요약 정리

- function, iterator를 다루는 새로운 방법인 Generators는 ES6에서 소개됨
- 도중에 중단 가능하며, 중단되었던 곳에서 다시 재개할 수 있다. 즉, 함수처럼 생겼지만 iterator처럼 행동한다.

## References

### 봤어요

- https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5

### 아직 안봤어요

- https://tc39.es/ecmascript-asyncawait/
- https://javascript.info/generators
- https://livecodestream.dev/post/2020-06-17-how-to-use-generator-and-yield-in-javascript/
