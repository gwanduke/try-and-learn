# React V-DOM에 대한 고찰

Virtual DOM을 알고 있지만 정확하게 설명하진 못했다. Virtual DOM은 어떤 특징이 있으며 이로인해 개발자가 신경써야하는 부분은 무엇일까? 먼저 키워드를 나열하고 하나씩 알아보자

👉 Keywords

- v-dom의 정의
- Reconciliation
- v-dom과 React Fiber
- 이를 고려한 컴포넌트 설계 방법 / 고려 사항

## Virtual DOM이란 무엇인가?

Virtual DOM (이하 v-dom)은 UI의 표현(DOM)을 메모리에 저장하고 실제 DOM과 동기화하는 개념이다. 이 과정을 reconiliation 이라고 한다.

## Reconciliation

리액트 앱이 업데이트(setState 등으로)되면 새로운 트리가 생성되는데, 새로운 트리와 이전 트리를 비교해 어떤 부분이 변경되었는지 결정하는 알고리즘을 뜻한다.

## V-DOM 과 React Fiber

[React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)를 읽어보면 된다.

[Andrew Clark: What's Next for React — ReactNext 2016](https://youtu.be/aV1271hd9ew)를 한번 보면 좋다.

## 그럼 컴포넌트는 어떻게 설계되어야할까?

## 참고자료

- https://ko.reactjs.org/docs/faq-internals.html
- [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
