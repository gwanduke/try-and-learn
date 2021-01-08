# Modern React with Redux [2020 Update]

## 섹션 1:Let's Dive In!

> Skip

## 섹션 2:Building Content with JSX

> Skip

## 섹션 3:Communicating with Props

> Skip

## 섹션 4:Structuring Apps with Class-Based Components

### Tip

- 크롬 디버거에 Sensors 라는게 있어서, Geolocation 제어가 가능함

## 섹션 5:State in React Components

> Skip

## 섹션 6:Understanding Lifecycle Methods

> Skip

## 섹션 7:Handling User Input with Forms and Events

> Skip

- Controlled라는 것은 HTML이 아닌 리액트가 HTML 컴포넌트에 대한 상태(value)를 제어한다는 것

## 섹션 8:Making API Requests with React

> Skip

## 섹션 9:Building Lists of Records

> Skip

### Key

- [ ] key

```plain
-----Withpit Key-----
 New      Current
  1          1 -> Re
  2          2 -> Re
  3          3 -> Re
  4        (Create!)

-----With Key-----
 New      Current
key=1      key=1
key=2      key=2
key=3      key=3
key=4 -> (Create!)
```

## 섹션 10:Using Ref's for DOM Access

> Skip

## 섹션 11:Let's Test Your React Mastery!

> Skip

## 섹션 12:Understanding Hooks in React

> Skip

### Hooks

- useState
- useEffect
- useContext
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue

### XSS

- [ ] XSS: dangerouslySetInnerHTML로 받는 값에 script가 있는 경우 클라이언트 동작을 변경할 수 있으므로 위협적일 수 있다.

### Trick

- search시 timeout을 활용해 한번에 마지막 요청만 동작하도록 할 수있음 (debounce)
- Event Bubbling 활용

  ```js
  // dropdown 바깥 클릭시 닫히게
  document.body.addEventListener("click", () => {
    setOpen(false);
  });
  ```

  ```js
  // full
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);
  ```

  - 이벤트 우선순위: React에서 바인딩한 이벤트보다 DOM에서 직접 추가된 이벤트가 먼저 발생하고 리액트의 이벤트가 처리됨. 그래서 버블링 순서를 잘 파악해야함

## 섹션 13:Navigation From Scratch

> Skip

react-router를 쓰지 않고, window.location.pathname에 따라 라우팅 처리

@in Link

- `window.history.pushState({}, '' , path);`
- `window.dispatchEvent(new PopStateEvent('popstate'))`

popstate 이벤트를 직접 발생시키는게 특이한데, 다음을 참고하면 왜그런지 알 수 있다.

https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate

> Note that just calling history.pushState() or history.replaceState() won't trigger a popstate event. The popstate event is only triggered by doing a browser action such as a clicking on the back button (or calling history.back() in JavaScript). And the event is only triggered when the user navigates between two history entries for the same document.

@in Route

```js
useEffect(() => {
  // todo; state change...
  const onLocationChange = () => {};

  window.addEventListener("popstate", onLocationChange);
  return () => window.removeEventListener("popstate", onLocationChange);
}, []);
```

cmd와 함꼐 동작하게 하려면 -> metaKey, ctrlKey가 감지되면 pushState하지 않고 return;

## 섹션 14:Hooks in Practice

> Absoultely Skip

## 섹션 15:Deploying a React App

> Skip

- Vercel
- Netlify

## 섹션 16:On We Go...To Redux!

변경과정

(Action Creator) -> Action -> dispatch! -> Reducers -> State

## 섹션 17:Integrating React with Redux

> Skip

connect에 대한 내용

## 섹션 18:Async Actions with Redux Thunk

### 리덕스 미들웨어

- dispatch되는 액션을 받아 호출하는 함수
- 액션을 중단하거나 수정하거나 하는 작업들이 가능함

### Redux-Thunk 미들웨어

- action creator의 기본 원칙은 type 프로퍼티를 가지는 plain object를 만드는 것임 (Promise도 X)
- 만약 promise를 payload로 넘긴다한들, 대개 비동기 요청이 완료되지 않은 상태이기에 액션을 동기적으로 즉시 받은 reducer에서는 데이터를 조회할 수 없을 것임
- 하지만 thunk는, (async) action creator가 함수를 만들고, 그 함수내에서 필요한 작업(fetch 등)이 끝나면 액션을 추가로 dispatch!
- action creator가 함수를 반환하는 경우, (dispatch, getState) 를 인자로 호출함. 그 안에서 액션을 매뉴얼로 호출하면 됨

```js
// https://github.com/reduxjs/redux-thunk/blob/master/src/index.js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

```js
const fetchPosts = () => async dispatch => {
  const response = await ...;

  dispatch({ type: 'GET_LIST', payload: response })
}
```

## 섹션 19:Redux Store Design

## 섹션 20:Navigation with React Router

## 섹션 21:Handling Authentication with React

## 섹션 22:Redux Dev Tools

## 섹션 23:Handling Forms with Redux Form

## 섹션 24:REST-Based React Apps

## 섹션 25:Using React Portals

## 섹션 26:Implementing Streaming Video

## 섹션 27:The Context System with React

## 섹션 28:Replacing Redux with Context

## 섹션 29:Working with Older Versions of React

## 섹션 30:Ajax Requests with React

## 섹션 31:Modeling Application State

## 섹션 32:Managing App State with Redux

## 섹션 33:Intermediate Redux: Middleware

## 섹션 34:React Router + Redux Form v6

## 섹션 35:Bonus Topics

## 섹션 36:React Router + Redux Form v4

## 섹션 37:Extras
