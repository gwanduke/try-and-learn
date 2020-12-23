# 5. Advanced React Patterns

## 목차

- [5. Advanced React Patterns](#5-advanced-react-patterns)
  - [목차](#목차)
  - [❌ 복습 및 정리](#-복습-및-정리)
  - [들어가며](#들어가며)
  - [02. Context Module Functions](#02-context-module-functions)
  - [03. Compound Components](#03-compound-components)
  - [04. Flexible Compound Components](#04-flexible-compound-components)
  - [05. Prop Collections and Getters](#05-prop-collections-and-getters)
    - [prop collections](#prop-collections)
    - [prop getters](#prop-getters)
  - [06. State Reducer](#06-state-reducer)
  - [07. Control Props](#07-control-props)
    - [돌아보기](#돌아보기)

## ❌ 복습 및 정리

## 들어가며

- [ ] [Inversion of Control](https://kentcdodds.com/blog/inversion-of-control/)
- [ ] [Implement Inversion of Control](https://egghead.io/lessons/egghead-implement-inversion-of-control?pl=kent-s-blog-posts-as-screencasts-eefa540c&af=5236ad)

## 02. Context Module Functions

Context를 모듈로서 취급하고, 관련 변경사항 뭉치를 해당 모듈(파일)에 묶는 방법

- `useCallback`으로 custom hook내에 `increment` 같은 헬퍼를 정의해도 될 것같지만, `dispatch`를 전달해야하는 함수를 만드는 이유는 custom hook내에 함수를 정의하는 경우 dependency list를 매번 관리해야하는 불편함이 생기기 때문이다.
- 또한 복잡성을 줄이려면 조금 귀찮지만 아래 방법이 더 낫다고 판단된다.

취향차이라고 봐도 무방하기에 편리한 방법을 선택하면 되겠다.

```js
const CounterContext = React.createContext();

function CounterProvider(props) {
  const [state, dispatch] = React.useReducer(someReducer, someInit);

  return <CounterContext.Provider value={[state, dispatch]} {...props} />;
}

function useCounter() {
  const context = React.useContext(CounterContext);
  if (context === undefined) {
    throw new Error(`useCounter must be used within a CounterProvider`);
  }
  return context;
}

// 이 헬퍼 함수 내에서는 side effect가 있는 작업을 진행해도 무방하다.
// 함수 내에 필요한 인자는 파라미터를 통해 받자
// Promise를 반환하도록 구성해도 좋다. 그럼 사용하는 입장에서 편리하게 then/catch 할 수 있다.
const increment = (dispatch) => dispatch({ type: "increment" });
const decrement = (dispatch) => dispatch({ type: "decrement" });

export { CounterProvider, useCounter, increment, decrement };
```

## 03. Compound Components

`Compound Components`는 UI를 완성하기 위해 폼에 함께 쓰이는 컴포넌트를 말한다. HTML을 예로 들면 다음과 같다.

```html
<!-- select, option 함께 쓰여야 의미가 있다. -->
<select>
  <option value="1">1</option>
  <option value="2">2</option>
</select>
```

위 HTML을 제어하려면 보통 다음과 같이 코딩하는데 유연성과 확장성이 부족해보인다.

```js
<CustomSelect
  options={[
    { value: "1", display: "Option 1" },
    { value: "2", display: "Option 2" },
  ]}
/>
```

실에제로 [@reach/tooltip](https://reacttraining.com/reach-ui/tooltip)을 참고하자.

- [React.Children](https://reactjs.org/docs/react-api.html#reactchildren): 복잡한 `props.children`을 다루기위한 유용한 유틸리티 제공
  - `React.Children.map`: children이 배열인 경우 각 요소를 순회하며 콜백을 호출, null/undefined라면 null/undefeind 반환
- [cloneElement](https://reactjs.org/docs/react-api.html#cloneelement)

  - `key`와 `ref`는 유지하고 전달한 props를 머지한 새로운 엘리먼트 반환

  ```js
  // 시그니쳐
  React.cloneElement(element, [props], [...children]);

  // 다음과 비슷하게 생각할 수 있다.
  <element.type {...element.props} {...props}>
    {children}
  </element.type>;
  ```

결론: props를 암시적으로 전달해야할 때 유용하다.

```js
// Toggle로 부터 children에 설정된 props가 하위 children에 암시적으로 전달된다.
<Toggle>
  <ToggleOn>The button is on</ToggleOn>
  <ToggleOff>The button is off</ToggleOff>
  <ToggleButton />
</Toggle>
```

## 04. Flexible Compound Components

Context를 이용해 트리내부 아주 아래 컴포넌트까지 전달 (children의 children으로 전달받는 경우가 있기 때문)

- 실세계 예제: [@reach/accordion](https://reacttraining.com/reach-ui/accordion)
- TIP: 컨텍스트를 사용하는 컴포넌트가 Provider 컴포넌트를 빼먹는 경우가 있을 수 있기에 useContext를 감싸 적절한 오류를 보여주는 것이 좋다.

## 05. Prop Collections and Getters

- 실예제
  - [downshift](https://github.com/downshift-js/downshift) (uses prop getters)
  - [react-table](https://github.com/tannerlinsley/react-table) (uses prop getters)
  - [@reach/tooltip](https://reacttraining.com/reach-ui/tooltip) (uses prop collections)

### prop collections

공통으로 사용할 수 있는 prop을 하나의 컬렉션으로서 제공하는 방법

```jsx
function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return {
    on,
    toggle,

    // prop collections
    togglerProps: { "aria-pressed": on, onClick: toggle },
  };
}
```

### prop getters

onClick에 추가적인 동작이 필요한 경우 사용자가 onClick을 덮어씌워버리면 동작하지 않는데, 다음과 같이 처리해주면 안전하게 props를 합칠 수 있다.

```js
// onClick 같은 경우 사용자가 정의한 것도 호출되어야할 수 있는데 이를 전달하면 함께 사용되어질 수 있도록 처리하는 것

function getTogglerProps({ onClick, ...props } = {}) {
  return {
    "aria-pressed": on,
    onClick: callAll(onClick, toggle),
    ...props,
  };
}
```

```js
// 이런 함수를 정의해두면 주어진 모든 함수가 호출되도록 하는데 편리함
// callAll(onClick, toggle);
function callAll(...fns) {
  return (...args) => {
    fns.forEach((fn) => {
      fn && fn(...args);
    });
  };
}
```

## 06. State Reducer

- [ ] 읽어보기 [the-state-reducer-pattern-with-react-hooks](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks)
  - reducer를 대체할 수 있도록 하는 기법 또는 reducer의 한 타입을 대체할 수 있도록 함
  - 이는 IOC를 이용한다. (파라미터를 통한 리듀서 주입)

```js
// custom hooks: reducer를 받을 수 있도록 함
function useToggle({ initialOn = false, reducer = toggleReducer } = {}) {
  // ...
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // ...
}

// 사용시에는 전체 리듀서를 다시 만드는 것보다 필요한 부분만 만들고 나머지는 원래 리듀서에 넘기는 편이 좋다.
function toggleStateReducer(state, action) {
  if (action.type === "toggle" && timesClicked >= 4) {
    return { on: state.on };
  }
  return toggleReducer(state, action);
}
```

## 07. Control Props

떄때로 사용자가 내부 상태를 제어하기를 원할 수도 있는데, state reducer가 이를 가능케한다.

예를 들어 `<input />`은 그 자체로 상태를 가지고 제어되는데, `value`를 넘기는 순간 `onChange`를 통해 개발자에게 상태 제어를 맡긴다.

```js
// Make
function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  onChange,
  on: controlledOn = null,
} = {}) {
  const { current: initialState } = React.useRef({ on: initialOn });
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const onIsControlled = controlledOn !== null;
  const on = onIsControlled ? controlledOn : state.on;

  const dispatchWithOnChange = (action) => {
    if (!onIsControlled) {
      dispatch(action);
    }
    onChange?.(reducer({ ...state, on }, action), action);
  };
  const toggle = () => dispatchWithOnChange({ type: actionTypes.toggle });
  const reset = () =>
    dispatchWithOnChange({ type: actionTypes.reset, initialState });

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      "aria-pressed": on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  function getResetterProps({ onClick, ...props } = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
}

// Use
const { on, getTogglerProps } = useToggle({ on: controlledOn, onChange });
```

### 돌아보기

- [ ] 에러 처리하는 부분 필요할 때 참고해볼 필요있음 <!-- TODO: -->
