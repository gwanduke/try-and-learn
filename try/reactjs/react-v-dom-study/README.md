# React V-DOM에 대한 고찰

Virtual DOM을 알고 있지만 정확하게 설명하진 못했다. Virtual DOM은 어떤 특징이 있으며 이로인해 개발자가 신경써야하는 부분은 무엇일까? 먼저 키워드를 나열하고 하나씩 알아보자

👉 Keywords

- v-dom의 정의
- Reconciliation
- v-dom과 React Fiber
- 이를 고려한 컴포넌트 설계 방법 / 고려 사항

## Virtual DOM이란 무엇인가?

Virtual DOM (이하 v-dom)은 UI의 표현(DOM)을 메모리에 저장하고 실제 DOM과 동기화하는 개념이다. 이 과정을 reconiliation 이라고 한다.

### 성능 최적화 포인트

- VDOM이 존재함으로서 실제 DOM의 변경사항이 한번에 적용되어 브라우저의 연산이 줄어들어 성능 최적화 (이는 사실 DOM 조작시 fragment를 사용해도 됨)
- 추가로 React는 이 작업을 추상화함으로서 생산성 높은 개발 환경을 제공함

## Reconciliation

리액트 앱이 업데이트(setState 등으로)되면 새로운 트리가 생성되는데, 새로운 트리와 이전 트리를 비교해 어떤 부분이 변경되었는지 결정하는 알고리즘을 뜻한다.

다음 두가지 가정을 바탕으로 diff를 수행해 속도를 향상시켰다.

1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
2. 개발자가 key prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.

1번 내용은 이해 하기 힘들 수 있는데, 다음 코드를 보면 이해가 쉽다.

```js
<div>
  <Counter />
</div>

// 위 코드가 이렇게 변경되면 Counter는 다시 마운트됨 (다시 렌더링되는게 아니라, 다시 마운트됨)
<span>
  <Counter />
</span>
```

다음은 직접 작성한 코드인데, Fragment가 등장해도 re-mount가 일어난다. (하지만 `<></>`가 없다면 다시 마운트 되지 않는다!)

```js
function Counter() {
  useEffect(() => {
    console.log("Mount!");
  }, []);

  return <div>Hi</div>;
}

export default function App() {
  const [toggle, setToggle] = React.useState(true);

  return (
    <div className="App">
      <button onClick={() => setToggle((a) => !a)}>Toggle</button>
      {toggle ? (
        <>
          <div>
            <Counter />
          </div>
        </>
      ) : (
        <div>
          <Counter />
        </div>
      )}
    </div>
  );
}
```

## V-DOM 과 React Fiber

[React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)를 읽어보면 된다.

[Andrew Clark: What's Next for React — ReactNext 2016](https://youtu.be/aV1271hd9ew)를 한번 보면 좋다.

## 그럼 컴포넌트는 어떻게 설계되어야할까?

- 하위 트리가 통으로 리렌더링 되지 않도록 어플리케이션을 설계해야하며, 상태변화가 적게 일어나도록 하는 것이 좋다. 트리를 고려해 역할에 따라 컴포넌트를 잘게 나누는 것도 도움이 되겠다.
- 무엇보다 reconciliation 자체를 피하는 것이 가장 좋은데, shouldComponentUpdate, React.PurComponent 또는 React.memo를 통해 수행할 수 있다.

## 참고자료

- 👍 https://ko.reactjs.org/docs/reconciliation.html
- https://ko.reactjs.org/docs/faq-internals.html
- [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
- https://velopert.com/3236
- https://medium.com/react-native-seoul/react-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%B2%98%EC%9D%8C%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90-03-react-%EC%9D%98-reconciliation-%EA%B3%BC%EC%A0%95-2e6fb59c0c2d
- 👍 https://meetup.toast.com/posts/110, https://www.huskyhoochu.com/virtual-dom/
