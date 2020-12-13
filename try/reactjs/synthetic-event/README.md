# synthetic-event

리액트의 이벤트는 native event와 다르다.

합성 이벤트 (Synthetic Event)를 사용하는데, 기본적으로 document에 부착되어있고 event delegation을 활용한다. 다만 리액트 17로 넘어오면서 document가 아니라 root 엘리먼트에 붙는다.

실제로 어플리케이션을 만들어보면 각 엘리먼트에 이벤트가 부착되어 있는 것을 확인할 수 있는데 이는 noop 핸들러로서 ios safari 에서 발생하는 이슈를 해결하기 위함이다. 실제로는 이벤트 버블링되어 한 곳에서 이벤트가 관리되고 처리된다. 실제 이벤트는 e.nativeEvent로 접근 가능하며, e.stopPropagation은 실제로 이벤트 버블링을 막지 못하고 리액트 이벤트 시스템 내에서 호출이 차단될 뿐이다.

내 생각엔 결론적으로 리액트 어플리케이션을 설계하는데 이벤트 딜리게이션을 고민하는 것은 큰 의미가 없을 것같다. 그 것 보다는 이벤트 콜백을 컴포넌트의 어느 단계에서 생성하고 관리할 것인가를 컴포넌트 각 역할의 관점에서 잘 설계하고 코드를 관리하는게 중요하겠다.

많이 양보해서 다음과 같은 코드를 구성해볼 수는 있겠다.

```js
import React from "react";

export default function App() {
  const [val, setVal] = React.useState(1);

  return (
    <>
      <ul onClick={(e) => setVal(e.target.dataset.value)}>
        <li data-value={1}>1</li>
        <li data-value={2}>2</li>
        <li data-value={3}>3</li>
      </ul>
      <div>{val}</div>
    </>
  );
}
```

## 기타 참고자료

- [React events in depth w/ Kent C. Dodds, Ben Alpert, & Dan Abramov](https://www.youtube.com/watch?v=dRo_egw7tBc)
- https://blog.maddevs.io/a-bit-about-event-delegation-in-react-3b92fb0a978b
- https://blog.cloudboost.io/why-react-discourage-event-delegation-2b5fe3f52bea
- https://medium.com/tapjoykorea/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%98-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%95%B8%EB%93%A4%EB%9F%AC-event-handler-syntheticevent-nativeevent-3a0da35e9e3f
