# React Hooks

## ❌ 복습 및 정리

## 서론

- [ ] making-sense-of-react-hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
- [ ] [GDG Salt Lake DevFest 2018: Why React Hooks](https://www.youtube.com/watch?v=zWsZcBiwgVE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

커스텀 리액트 컴포넌트 안에서 동작하는, 다음은 특별한 함수들이다.

- `React.useState` → returns pair of values
- `React.useEffect` → returns nothing
- `React.useContext` → returns value
- `React.useRef` → returns value
- `React.useReducer` → returns pair of values

## 02. useState:greeting

그냥 변수를 사용하면 할당에 따른 re-render가 일어나지 않는다.

## 03. useEffect:persistent state

→ render와 rerender 이후에 일어나는 `useEffect` hooks

https://github.com/donavon/hook-flow

- 부모가 리렌더되면 하위 컴포넌트도 리렌더링되는데, 이 경우 useEffect 내의 함수 실행이 불필요할 수 도 있다. 그래서 deps를 지정해주는게 좋음
- deps 비교에 shallow 컴패어를 한다. `===` or `Object.is`를 통해 비교함
- 커스텀 훅
  - 값을 함수로 받아 처리하는 등의 처리도 유용함
  - 커스텀 훅 작성시 options 파라미터(필수는 아님)을 줌으로서 여러 유연성을 첨가할 수 있음 (serialize, deserialize 함수를 받는 등...)

## 04. Hooks Flow

~~08:00 다시 보기 → 부모가 모두 렌더된 후에 하위 컴포넌트가 마운트 되는 부분~~

=>

- 아래와 같이 App이 렌더된 후에 Child 렌더가 시작됨을 인지해야함
- Child의 effect가 끝나고 부모의 effect가 시작됨

```plain
App: render start
App: render end
  Child: render start
  Child: useState(() => 0)
  Child: render end
  Child: useEffect()
  // ...
App: useEffect() cleanup
App: useEffect()
```

## 05. Lifting state

- [ ] 읽어보기 [state-colocation-will-make-your-react-app-faster](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)

## 06. useState: tic tac toe

- [ ] 읽어보기 [dont-sync-state-derive-it](https://kentcdodds.com/blog/dont-sync-state-derive-it)

## 07. useRef and useEffect: DOM interaction

> ref를 이용하는 방법만 숙지하면 된다.

- 항상 cleanup이 필요하진 않은지 확인하기

## 08. useEffect: HTTP requests

- [ ] 읽어보기 [stop-using-isloading-booleans/](https://kentcdodds.com/blog/stop-using-isloading-booleans/)
- useEffect는 비동기 async 함수를 받아선 안됨(Promise가 cleanup함수로 반환되므로). 필요한 경우 내부에 정의해서 사용
- [ ] setState 함수는 사용할 때마다 렌더링을 유발하므로, 순서가 중요하다.
  - 그래서 한번에 묶어서 설정해주는게 좋은데 이를 useReducer 또는 그냥 객체 상태로서 처리가 가능하다.
  - ⇒ 이는 나중에 concurrent 모드가 나오면 함께 처리될 수 있다. 하지만 지금은 지원 X
- ErrorBoundary
  - 클래스 컴포넌트 `static getDerivedStateFromError(error)` 사용
  - 앱전체에 감싸지 않고 특정 영역에 부분적으로 감싸 처리해주는것이 가장 좋다 (fallback으로 모든 화면이 변경되어 버릴 수 있으므로)
  - ErrorBoundary 사용시 key를 지정해 상황에 따라 내부 error가 초기화 되도록 할 수 있다. (대신 ErrorBoundary를 포함한 자식들이 re-mount 된다)
- react-error-boundary 사용한 경우
  - 또는 "try again" 버튼 같은게 뜨도록 하고 `onReset`으로 상태를 제어해 앱을 재개시킬 수 있다.
  - "try again" 버튼은 정상 동작하지만, 에러 상황에서 다른 state가 변경되면 정상 진행되지 않는데 `resetKeys`를 사용하면 해결할 수 있다. (내부적으로 render를 수행하도록 함)
