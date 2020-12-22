# 4. Advanced React Hooks

## ❌ 복습 및 정리

## 더 읽어보기

- https://developers.google.com/web/updates/2017/09/abortable-fetch

## 02. useReducer: simple counter

- [ ] [should-i-usestate-or-usereducer](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)
- [ ] [how-to-implement-usestate-with-usereducer](https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer)
- [ ] [usetypescript-a-complete-guide-to-react-hooks-and-typescript](https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c)

## 03. useCallback: custom hooks

- 문제: `useEffect` 내부에 쓰이는 함수가 어떤 값에 의존적이라면, 해당 함수의 deps를 `useEffect`에 적어주어야 하는데 이러면 deps를 추적하기가 쉽지가 않다.
- 해결: 그보다 `useEffect`의 deps로서 **함수 그 자체**를 전달하고, `useCallback`을 이용해 동일 함수가 반환됨을 보장해주는 것이 더 낫다. (즉, deps의 명시는 관련된 함수 가까이에 배치된다)

```js
const updateLocalStorage = React.useCallback(
  () => window.localStorage.setItem("count", count),
  [count] // <-- yup! That's a dependency list!
);
React.useEffect(() => {
  updateLocalStorage();
}, [updateLocalStorage]);
```

- [ ] 항상 useCallback을 사용하는 것이 나을까? [usememo-and-usecallback](https://kentcdodds.com/blog/usememo-and-usecallback) 읽어보기
  - 코드베이스가 지저분해지고 deps를 계속 관리해야 하므로, 필요한 곳에만 적용

```js
function useSafeDispatch(dispatch) {
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    },
    [dispatch]
  );
}
```

## 04. useContext: simple counter

- [ ] [React Composition Model](https://twitter.com/mjackson/status/1195495535483817984)

컴포넌트간에 상태를 공유하는 데에는 여러 바법이 있지만, state lifting이 가장 대표적이며 좋은 솔루션이다. 하지만 이는 [prop drilling](https://kentcdodds.com/blog/prop-drilling)을 유발하는데, 특별히 문제는 되지 않지만 고통스럽다.

context는 리액트 트리내에 정의하여 그 트리내의 어떤 컴포넌트에서든 접근이 가능하도록 할 수 있다.

전역 변수와 비슷하지만, 유지보수성을 해치지는 않는다. (API가 명시적으로 관계를 만들기 때문에)

context를 생성할 때 기본값을 주지 않는게 추천되는 방법인데, 기본값을 주면 이게 트리내에서 Provider로 부터 값을 제대로 받았는지 판단하기 힘들기 때문이다.

## 05. useLayoutEffect

> [hook-flow](https://github.com/donavon/hook-flow)

- [ ] [useeffect-vs-uselayouteffect](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect)
- 실제 브라우저에 반영되기 전에 수행된다.

DOM에서 관찰가능한 변화를 만드는 것이라면 useLayoutEffect에서 일어나는것이, 아니라면 대부분 useEffect로 충분하다.

## 06. useImperativeHandle

- 내부 ref를 핸들링하는 것을 부모에 적절히 공개할 수 있다.
- 하지만 가능하면 Prop을 사용할 수 있는 경우 props를 사용하기르 바람
- 모듈이나 라이브러리를 만드는 경우에 사용하면 좋겠다.

```js
// React.forwardRef(Example) 하면.. ref를 그대로 전달받음
function Example(props, ref) {
  React.useImperativeHandle(ref, () => ({
    scrollToTop,
    scrollToBottom,
  }));

  return <div>...</div>;
}

// Usage
ref.current.scrollToTop();
```

## 07. useDebugValue: useMedia

`useDebugValue`를 사용하면 React devTool에서 각 **custom hook**에 대한 라벨링을 수행할 수 있다.

아래와 같이 함수를 넘길 수도 있는데, production에서 함수 호출이 수행되지 않기 때문에 리소스 낭비를 줄일 수 있다.

```js
const formatDebugValue = ({ query, state }) => `...`;

function useMedia() {
  React.useDebugValue({ query, state }, formatDebugValue);
}
```
