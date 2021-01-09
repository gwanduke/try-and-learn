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

아래 `hasChanged`를 판단하는 이유로, redux 상태는 불변적으로 변경되어야함

```js
// https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts#L192
    let hasChanged = false // !
    const nextState: StateFromReducersMapObject<typeof reducers> = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey

      // 동일한 객체인지 판별 (shallow compare)
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
```

### mapStateToProps

ownProps

```js
// 이렇게 하면, 컴포넌트 내에서 단일 user를 취급하는 컴포넌트에서 user`s`에 접근하지 않아도 된다.
const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};
```

## 섹션 20:Navigation with React Router

### 라우터 종류

- BrowserRouter - /page
- HashRouter - /#/page
- MemoryRouter - URL이 트랙되지 않음

## 섹션 21:Handling Authentication with React

> Skip

구글로그인

- OAuth for Servers
  - token으로 유저로서 요청할 수 있음
  - 대개 로그인 되지 않은 사용자에 대한 정보가 필요한 경우 사용
  - 사용자에 대한 정보를 저장하고 있어야하므로 셋업이 어려움
- OAuth for JS Browser Apps
  - token으로 유저로서 요청할 수 있음
  - 대개 로그인한 동안에 유저데이터에 엑세스하기 위해 사용
  - SDK 이용해 간편함

## 섹션 22:Redux Dev Tools

`localhost:3000?debug_session=<some_string>`으로 새로고침간에 리덕스 상태를 유지할 수 있음

## 섹션 23:Handling Forms with Redux Form

> Skip

## 섹션 24:REST-Based React Apps

> Skip

### Browser History

- Redux Action Creator에서 REST 요청 후, programatic하게 경로를 변경하려면 history가 필요한데 이를 매번 action creator에 주입받기엔 너무 이상하다. 그래서 Router를 만들 때 제공되는 history.createBrowserHisstory() 로 history를 직접 만들고, 이를 export해서 공통으로 사용하면 가능하다.

### 수정시 ID 판단

두가지 방법이 있겠다.

1. 어떤 리소스가 수정중인지 ID를 스토어에 기록
2. URL로 부터 판단

## 섹션 25:Using React Portals

> Skip

### Why?

다음과 같은 경우에 Modal이 화면 최상단에 위치하지 못할 수 있다. (Stacking Context 고려)

```plain
      body
        |
    -----------------
    |               |
  positioned      sidebar (z-index: 0)
  (z-index: 0, relative)
    |
  Modal (z-index: 10)
```

## 섹션 26:Implementing Streaming Video

TODO: RTMP 비디오 송출 (중요하지 않음)

## 섹션 27:The Context System with React

> Skip

- Context: 새로운 Provider를 만들 때 마다 새로운 pipe이다.

## 섹션 28:Replacing Redux with Context

> Skip

## 섹션 29:Working with Older Versions of React

> Skip

```js
// Function (React Class)
const App = function () {
  return <div>Hi!</div>
}

// Instance
<App></App> // React.createElement(...)
```

## 섹션 30:Ajax Requests with React

> Skip completely

## 섹션 31:Modeling Application State

> Skip completely

## 섹션 32:Managing App State with Redux

> Skip completely

## 섹션 33:Intermediate Redux: Middleware

> Skip completely

## 섹션 34:React Router + Redux Form v6

> Skip completely

## 섹션 35:Bonus Topics

> Skip

### Reselect

상태를 계산하는 라이브러리(Computed Value)

예를 들어)

- PostsReducer => `posts: [Post1, Post2, Post3]`
- SelectedPostsReducer => `ids: [1,3]`

=> 컴포넌트에서 포스트를 선택하는 경우, 컴포넌트가 데이터 구조에 대해서 알아야함. 그리고 재사용이 불가능함

=> - Reslect Selector가 이 로직을 담당하고 처리 (Derived State 반환)

```js
const postsSelector = (state) => state.posts;
const selectedPostsSelector = (state) => state.selectedPostIds;

const getPosts = (posts, selectedPostIds) => {
  const selectedPosts = _.filter(posts, (post) =>
    _.contains(selectedPostIds, post.id)
  );
  return selectedPosts;
};

export default createSelector(
  postsSelector,
  selectedPostsSelector,

  // 마지막이 select logic이고
  // 앞서 계산된 결과가 인자로 전달됨 getPosts(a, b)
  getPosts
);

// 위 함수를 getStateToProps 로 전달
```

## 섹션 36:React Router + Redux Form v4

> Skip completely

## 섹션 37:Extras

> 내용없음
