# 6. React Performance

## 02. Code Splitting

- [x] [super-simple-start-to-es-modules-in-the-browser](https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-the-browser)

  - [ ] [https://v8.dev/features/modules](https://v8.dev/features/modules)

  ```html
  <script type="text/javascript"></script>
  <!-- 와  -->
  <script type="module"></script>

  <!-- 의 가장 기본적인 차이는 모듈에서는 모듈 스크립트 (import) 등을 사용할 수 있다는 것이다. -->
  <!-- import 구문은 dynamic import도 가능하며, 인터넷상의 리소스도 가져올 수 있다. -->
  ```

적은 코드를 로딩할 수록 앱이 빠를 것이라는 원리에 기반해 코드 스플릿팅이 동작한다.

예를들어 차트를 그리는 D3 라이브러리는 로그인 화면에선느 로딩되지 않아도 된다. 그래서 필요할 때만 로딩하는 방식이다.

이는 자바스크립트로 해결할 수 있는데, dynamic import 라는 것이다.

```jsx
import("some-module.js").then(
  (module) => {
    // module이 export한 것들을 핸들링
  },
  (err) => {
    // 모듈을 로딩하는데 실패한 경우 처리
  }
);
```

### Chrome Devtools - coverage

- 리소스들의 사용여부를 알 수 있다. js의 경우 얼마나 사용되는지도 파악가능하다.

### eager Loading

```jsx
import("../globe");
import("../globe");
import("../globe");
import("../globe");
```

→ 몇번을 dynamic loading 해도 한번만 로딩될 것이다. 이는 웹팩이나 브라우저에서 처리된다.

컨텐츠 토글러에 마우스 오버했을 때나 포커스되었을 때 호출되도록 하면, 더 빠르게 사용자 UX를 만들 수 있다.

### Webpack magic comments

[https://webpack.js.org/api/module-methods/#magic-comments](https://webpack.js.org/api/module-methods/#magic-comments)

prefetch

→ 브라우저가 로딩을 마치고, idle 타임이 있으면 prefetch로 지정된 스크립트를 로딩한다

```jsx
return import(/* webpackPrefetch: true */ '../globe')

=> <link rel="prefetch" as="script" href="/static/js/3.chunk.js">
```

⇒ ❌ 근데 막상 dynamic import가 요구되는 시점에 로딩을 다시해서 fallback이 노출되는데? 뭔가 잘못된거 아닐까?

React.Suspense는 어디에 위치해야할까?

- suspend되는 컴포넌트(lazy같은)에 각각하나씩 위치시키는 것을 추천하지 않는다.
- 대신 사용자 UI에 따라, fallback이 어떻게 보여질지를 고려해서 적당한 위치에 위치 시키면되겠다.
- suspense-boundary를 고려하자 (Error Boundary 처럼)

차후 버전의 리액트에서 concurrent mode에 따라서 fallback이 바로 동작하거나 일정 시간 후에 동작할 수도 있다. (이는 마운트/업데이트 상태에 따라 다르다)

## 03. useMemo for Expensive Calculations

```jsx
const allItems = React.useMemo(() => getItems(inputValue), [inputValue]);
```

Performance 탭

- shift + 스크롤 → 스크롤
- 스크롤 → 줌인, 줌아웃

→ CPU를 slowdown 옵션 주고하면 더 드라마틱한 변화를 볼 수 있따.

- [x] [https://kentcdodds.com/blog/usememo-and-usecallback](https://kentcdodds.com/blog/usememo-and-usecallback)
      ⇒ 한번 더 읽어볼만함 (특히 여기 → [https://kentcdodds.com/blog/usememo-and-usecallback#why-is-usecallback-worse](https://kentcdodds.com/blog/usememo-and-usecallback#why-is-usecallback-worse))
- [ ] [https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render)
- [ ] [https://reacttraining.com/blog/react-inline-functions-and-performance](https://reacttraining.com/blog/react-inline-functions-and-performance)

> Performance optimizations are not free. They ALWAYS come with a cost but do NOT always come with a benefit to offset that cost.

### Web workers

[https://kentcdodds.com/blog/speed-up-your-app-with-web-workers](https://kentcdodds.com/blog/speed-up-your-app-with-web-workers)

→ 웹워커에 무거운 계산을 맡기면, 메인스레드의 동작 시간을 확보할 수있다.

→ 대신 웹워커에 맡긴일은 비동기로 동작하게 된다.

## 04. React.memo for Reducing re-renders

- [ ] [https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)
- [ ]

Performance 툴을 사용하면, render → reconciliation → commit 으로 이어질 때의 리렌더링을 관찰할 수 있다.

리액트는 다음 네가지 경우에 리렌더링 된다

1. props가 변함
2. 내부 상태가 변함
3. 소비중인 컨텍스트 값이 변함
4. 부모가 리렌더링 됨

다음 유틸리티를 이용함으로서 리렌더링을 방지할 수 있따.

`React.PureComponent`, `React.memo`, or `shouldComponentUpdate`

React.PureComponent와 React.memo는 근본적으로 같은일을 수행한다.

(shallow comapre and prevent rerender)

- [ ] 😎병목은 어디서 일어날까? list가 있을 때 memo 계산이 많으면 어떨까? DOM 변화만 자주 일어나지 않는다면 상관없을까? (즉 commit 만 적게되면 속도는 충분히 빠를까?)

## 05. Window Large Lists with react-virtual

## 06. Optimize Context Value

때로는 컨텍스트 프로바이더를 나누어서 성능 향상을 가져올 수 있다.

## 07. Fix Perf Death by a Tousand Cuts

- [ ] [https://kcd.im/colocate-state](https://kcd.im/colocate-state)

colocateing을 통해 불필요한 렌더링을 막아 성능 향상이 가능하다. 또한 이는 상태 관리를 필요한 곳에 고립시켜 유지보수성이 더 좋아진다.

## 08. Production Performance Mornitoring
