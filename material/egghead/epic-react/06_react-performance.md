# 6. React Performance

리액트는 그 자체로 꽤나 빠르지만, 때때로 최적화가 필요하다.

## 02. Code Splitting

### 더 알아보기

- [x] [super-simple-start-to-es-modules-in-the-browser](https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-the-browser)

  - [ ] [https://v8.dev/features/modules](https://v8.dev/features/modules)

아래 두 라인의 가장 기본적인 차이는 모듈에서는 모듈 스크립트 (import) 등을 사용할 수 있다는 것이다. import 구문은 dynamic import도 가능하며, 인터넷상의 리소스도 가져올 수 있다.

```html
<script type="text/javascript"></script>
<!-- 와  -->
<script type="module"></script>
```

### 내용

적은 코드를 로딩할 수록 앱이 빠를 것이라는 원리에 기반해 코드 스플릿팅이 동작한다. 예를들어 차트를 그리는 D3 라이브러리는 로그인 화면에선느 로딩되지 않아도 된다. 그래서 필요할 때만 로딩하는 방식이다.

이는 built-in 방법으로 해결할 수 있는데, dynamic import 라는 것이다.

```js
import("some-module.js").then(
  (module) => {
    // module이 export한 것들을 핸들링
  },
  (err) => {
    // 모듈을 로딩하는데 실패한 경우 처리
  }
);
```

React 또한 리액트 컴포넌트 로딩을 위한 built-in 지원이 있다.

- 대신 모듈은 반드시 리액트 컴포넌트를 `default export`로 가져야하고 이를 `React.lazy()`로 불러올 수 있다.
- 그 후 `<React.Suspense />`로 컴포넌트가 그려지길 기다릴 수 있다.

성능 측정에 있어서는 다음 정도는 고려해보는 것이 좋다.

- 네트워크 속도를 조절해서
- 빌드된 파일로
- incognito에서

### Eager Loading

```jsx
import("../globe");
import("../globe");
import("../globe");
// → 몇번을 dynamic loading 해도 한번만 로딩될 것이다. 이는 웹팩이나 브라우저에서 처리된다.
```

위 특징을 이용해 컨텐츠 토글러에 마우스 오버했을 때나 포커스되었을 때 호출되도록 하면, 더 빠르게 사용자 UX를 만들 수 있다.

### Webpack magic comments

[Magic Comments](https://webpack.js.org/api/module-methods/#magic-comments)

`prefetch`: 브라우저가 로딩을 마치고, idle 타임이 있으면 prefetch로 지정된 스크립트를 로딩한다

```jsx
return import(/* webpackPrefetch: true */ '../globe')

=> <link rel="prefetch" as="script" href="/static/js/3.chunk.js">
```

- [ ] 근데 막상 dynamic import가 요구되는 시점에 로딩을 다시해서 fallback이 노출되는데? 뭔가 잘못된거 아닐까?

### React.Suspense는 어디에 위치해야할까?

- suspend되는 컴포넌트(lazy같은)에 각각하나씩 위치시키는 것을 추천하지 않는다.
- 대신 사용자 UI에 따라, fallback이 어떻게 보여질지를 고려해서 적당한 위치에 위치 시키면되겠다.
- suspense-boundary를 고려하자 (Error Boundary 처럼)

차후 버전의 리액트에서 concurrent mode에 따라서 fallback이 바로 동작하거나 일정 시간 후에 동작할 수도 있다. (이는 마운트/업데이트 상태에 따라 다르다)

### Chrome Devtools - Coverage 탭

- 리소스들의 사용여부를 알 수 있다. js의 경우 얼마나 사용되는지도 파악가능하다.
- 이를 통해 어떤 리소스를 chunk 분리할지 판단하면 되겠다.

## 03. useMemo for Expensive Calculations

```jsx
const allItems = React.useMemo(() => getItems(inputValue), [inputValue]);
```

- Performance 탭
  - shift + 스크롤 → 스크롤
  - 스크롤 → 줌인, 줌아웃
  - CPU를 slowdown 옵션 주고하면 더 드라마틱한 변화를 볼 수 있따.
  - 치솟는 그래프를 보고 병목구간이라고 판단 가능
  - 하단 바 그래프에서 스크립팅에 얼마나 걸렸는지 확인 가능
- [x] [usememo-and-usecallback](https://kentcdodds.com/blog/usememo-and-usecallback)
      ⇒ 한번 더 읽어볼만함 (특히 여기 → [why-is-usecallback-worse](https://kentcdodds.com/blog/usememo-and-usecallback#why-is-usecallback-worse))
- [ ] [are-hooks-slow-because-of-creating-functions-in-render](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render)
- [ ] [react-inline-functions-and-performance](https://reacttraining.com/blog/react-inline-functions-and-performance)

> Performance optimizations are not free. They ALWAYS come with a cost but do NOT always come with a benefit to offset that cost.

- 1000/60 초 안에 작업을 마무리해야 브라우저가 쉬지않고 렌더링 할 수 있다.

### Web workers

[speed-up-your-app-with-web-workers](https://kentcdodds.com/blog/speed-up-your-app-with-web-workers)

- 웹워커에 무거운 계산을 맡기면, 메인스레드의 동작 시간을 확보할 수있다.
- 대신 웹워커에 맡긴일은 비동기로 동작하게 된다.
- [ ] 웹팩의 `!workerize`를 알아볼 필요

## 04. React.memo for Reducing re-renders

- [ ] [fix-the-slow-render-before-you-fix-the-re-render](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)

`ReactDevtool - Profiler` 툴을 사용하면, render → reconciliation → commit 으로 이어질 때의 리렌더링을 관찰할 수 있다.

- render: React.createElement
- reconciliation: 이전 엘리먼트들과 새로운 엘리먼트들을 비교
- commit: DOM을 업데이트 (필요하다면)

리액트 컴포넌트는 다음 네가지 경우에 리렌더링 된다

1. props가 변함
2. 내부 상태가 변함
3. 소비중인 컨텍스트 값이 변함
4. 부모가 리렌더링 됨

unnecessary rerender가 발생하는 경우에 render/reconciliation 작업이 비싼 비용이라면, 이를 다음 유틸리티를 이용함으로서 리렌더링을 방지할 수 있따.

`React.PureComponent`, `React.memo`, or `shouldComponentUpdate`

`React.PureComponent`와 `React.memo`는 근본적으로 같은일을 수행한다. (shallow comapre and prevent rerender)

- [ ] 😎병목은 어디서 일어날까? list가 있을 때 memo 계산이 많으면 어떨까? DOM 변화만 자주 일어나지 않는다면 상관없을까? (즉 commit 만 적게되면 속도는 충분히 빠를까?)

- Tip
  - 객체로 비교를 수행하지 않도록 컴포넌트 트리 더 위에서 가능하면 primitive value로 전달하는 것이 memo 처리하기에 편리하다. (커스텀으로 memo 처리하는 것은 실수가 생길 수 있기에)

## 05. Window Large Lists with react-virtual

## 06. Optimize Context Value

- [ ] [How to optimize context value](https://github.com/kentcdodds/kentcdodds.com/blob/319db97260078ea4c263e75166f05e2cea21ccd1/content/blog/how-to-optimize-your-context-value/index.md)

- **문제/특징**
  - 컨텍스트는 그 값을 소비하는 모든 컴포넌트에 대해서 re-render를 유발한다. (Memoized 여부와 상관없이)
- **해결방법**

  - `ContextProvider`의 value를 memoize한다.

    ```js
    const CountContext = React.createContext();

    function CountProvider(props) {
      const [count, setCount] = React.useState(0);
      const value = React.useMemo(() => [count, setCount], [count]);
      return <CountContext.Provider value={value} {...props} />;
    }
    ```

  - 때로는 state와 dispatch 컨텍스트 프로바이더를 나누어서 성능 향상을 가져올 수 있다. (dispatch만 사용하는 곳에서 상태업데이트에 따라 리렌더링 발생하지 않도록) (그 성능향상이 크진 않을 수도 있다)

## 07. Fix Perf Death by a Tousand Cuts

- [ ] [https://kcd.im/colocate-state](https://kcd.im/colocate-state)

실세계에서는 보통 state 관리 솔루션을 사용하곤하는데, 이로 인해 상태가 변경됨으로서 정말 많은 컴포넌트가 업데이트되는 경우가 생긴다. 이는 성능 bottleneck이 될 수 있다.

성능문제들은 한 컴포넌트가 하지 않아야할 것을 하기 때문에 생길 수 있다. 이는 분석을 통해 손쉽게 해결할 수있다.

하지만 "perf death by a thousand cuts"는 이 성능문제를 해결할 명백한 장소를 알려주지 않는다. 왜냐면 모든 컴포넌트가 고립되어있을 때에는 느리지 않기 때문이다. 문제는 많은 상태업데이트가 발생할 때 생긴다.

- useCallback이나 useMemo를 반복적으로 사용하는 것은 복잡성이 증가함 (dependency array 관리)
- 리액트가 컴포넌트가 리-렌더링 되어야하는지 매번 체크해야함 (이것도 비용)

적은 글로벌 상태를 사용해야할까? 고민해보면, 결국 해결방법은 colocateing을 통해 불필요한 렌더링을 막아 성능 향상이 가능하다. 또한 이는 상태 관리를 필요한 곳에 고립시켜 유지보수성이 더 좋아진다.

여러 곳에서 사용되는 경우, colocate하지 않고 context를 분리해 만듬으로서 달성할 수 있따. (Provider의 위치또한 적절하게 배치하자)

다른 방법으로 useContext를 사용하는 컴포넌트의 상위 컴포넌트(중간자)를 만들고 거기서 context state를 주입해주는 방식이다. 부모만 리렌더링되고 실제 자식은 memoize되어있으므로 크게보았을 때 부하가 줄어든다.

위 방법을 더 general하게 HOC로 구성할 수 있다.

```js
function withStateSlice(Comp, slice) {
  const MemoComp = React.memo(Comp);
  function Wrapper(props, ref) {
    const state = useAppState();
    return <MemoComp ref={ref} state={slice(state, props)} {...props} />;
  }
  Wrapper.displayName = "withStateSlice()";

  return React.memo(React.forwardRef(Wrapper));
}
```

위 내용들이 매우 유용하긴 하지만 쓰이는 곳은 드물다.

### Recoil

- [ ] Recoil의 장/단점
- [ ] Recoil getting started
- [ ] `06.extra-4` 한번 더 해보기

[recoil](https://recoiljs.org/)은 앱의 서로다른 컴포넌트에서 한 context 상태를 구독함으로서 생기는 문제들을 해결할 수 있다. (오히려 이전 구현보다 훨씬 더 빨라졌다. 왜일까?)

## 08. Production Performance Mornitoring

- [ ] [React Production Performance Monitoring](https://kentcdodds.com/blog/react-production-performance-monitoring)

[Profiler API](https://reactjs.org/docs/profiler.html)를 이용하면 프로덕션에서 사용자에 의한 성능 저하 요소를 약간은 파악할 수 있다. (사용자에 의한 보고는 그 내용이 정확하지 않으므로 rendering 관련 로그를 남겨 렌더링 시간 등을 서버로 전송)

```js
<App>
  <Profiler id="Navigation" onRender={onRenderCallback}>
    <Navigation {...props} />
  </Profiler>
  <Main {...props} />
</App>;

// signiture
function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
}
```

그 외 아직 unstable\_ 단계에 있는 `unstable_trace`... [Interaction tracing with React](https://gist.github.com/bvaughn/8de925562903afd2e7a12554adcdda16)를 이용할 수 있다.

`unstable_trace`를 이용하면 상호작용(onClick 같은)으로 인해 일어난 시간 등을 추적할 수 있다. (DevTools Profiler를 통해서도 확인할 수 있다.)
