# 5. Advanced React Patterns

## ❌ 복습 및 정리

## 02. Context Module Functions

- Context를 모듈로서 취급하고, 관련 변경사항 뭉치를 해당 모듈(파일)에 묶는 방법

## 03. Compound Components

Children.map을 이용

## 04. Flexible Compound Components

Context를 이용 (children의 children으로 전달받는 경우가 있기 때문)

## 05. Prop Collections and Getters

prop collections

```jsx
// 특정 UI에 필요한 props를 하나의 prop 프로퍼티 뭉치로 제공하는 것
```

prop getters

```jsx
// onClick 같은 경우 사용자가 정의한 것도 호출되어야할 수 있는데 이를 전달하면 함께 사용되어질 수 있도록 처리하는 것

function getTogglerProps({ onClick, ...props } = {}) {
  return {
    "aria-pressed": on,
    onClick: callAll(onClick, toggle),
    ...props,
  };
}
```

## 06. State Reducer

- [ ] [the-state-reducer-pattern-with-react-hooks](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks)
  - reducer를 대체할 수 있도록 하는 기법 또는 reducer의 한 타입을 대체할 수 있도록 함
  - 이는 IOC를 이용한다. (파라미터를 통한 리듀서 주입)

## 07. Control Props
