# Zustand

> [Zustand Github](https://github.com/pmndrs/zustand)

Zustand 가 등장한지는 생각보다 꽤 오래되었다. 현재(22년 3월)는 `v3.7`이고 `v2.0`이 19년 10월 릴리즈 되었으니까 적어도 2년은 넘게 흘렀다. 그럼에도 주류가 아니라는 이유로 외면해왔는데, 왜인지 요즘들어 Zustand 라는 키워드가 많이 보이는 것같다. 귀여운 곰돌이를 이제는 외면할 수 없어 try 해보기로 했다.

## 간략한 컨셉 및 특징

- 번들사이즈가 작다: 0.95kb
- flux 컨셉을 따르지만, 간결하다.
- Provider가 필요없다.
- action based 전역 상태 관리
- redux devtools 사용가능
- redux 처럼 액션을 사용하는 패턴 그대로 사용가능

## 사용방법

기본적인 사용 예제이다.

```js
import shallow from "zustand/shallow";

function Comp() {
  const state = useStore(); // 모든 상태를 구독

  // slices: 기본적으로 === 으로 비교하여 캐싱
  const nuts = useStore((state) => state.nuts);
  const honey = useStore((state) => state.honey);

  // shallow diff를 통해 비교 하려면 다음과 같이 처리
  // object, array 동일
  const { nuts, honey } = useStore(
    // nuts 나 honey 둘중 하나는 변경되어야 업데이트 (object의 주소값을 비교하는 것은 아님)
    (state) => ({ nuts: state.nuts, honey: state.honey }),
    shallow // 이 부분은 `(old, new) => diff(old, new)` 형태로 커스텀 가능
  );

  // memoized selector
  const selector = useCallback((state) => state.fruits[id]); // 만약 id에 의존하지 않는다면, 컴포넌트 밖에 정의해도 됨
  const fruit = useStore(selector, [id]);
}
```

`set`은 두번째 인자를 갖는데 true로 지정하는 경우, 머지가 아니라 replace한다.

```js
import omit from "lodash-es/omit";

const useStore = create((set) => ({
  salmon: 1,
  tuna: 2,
  deleteEverything: () => set({}, true), // store가 {} 로 대체됨으로 모든 내용이 삭제
  deleteTuna: () => set((state) => omit(state, ["tuna"]), true), // tuna만 삭제됨
}));
```

- 비동기의 경우 메서드에 async, await 하고 set만 적절한 타이밍에 해주면 모든게 알아서 해결된다.
- `create`의 두번째 인자 `get`을 이용하면 다른 상태를 가져올 수 있다.
- React 컴포넌트 밖에서도 사용가능하다.

  ```js
  const useStore = create(() => ({ paw: true, snout: true, fur: true }));

  // Getting non-reactive fresh state
  const paw = useStore.getState().paw;
  // Listening to all changes, fires synchronously on every change
  const unsub1 = useStore.subscribe(console.log);
  // Updating state, will trigger listeners
  useStore.setState({ paw: false });
  // Unsubscribe listeners
  unsub1();
  // Destroying the store (removing all listeners)
  // useStore는 여전히 사용가능하다. subscribe한 리스너만 제거,
  // 만약 useStore를 컴포넌트에서 사용한 후에 호출했다면, 해당 re-render도 일어나지 않음
  useStore.destroy();
  ```

## 미들웨어

```js
// Log every time state is changed
const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log("  applying", args);
      set(args);
      console.log("  new state", get());
    },
    get,
    api
  );

// Turn the set method into an immer proxy
const immer = (config) => (set, get, api) =>
  config(
    (partial, replace) => {
      const nextState =
        typeof partial === "function" ? produce(partial) : partial;
      return set(nextState, replace);
    },
    get,
    api
  );

const useStore = create(
  log(
    immer((set) => ({
      bees: false,
      setBees: (input) => set((state) => void (state.bees = input)),
    }))
  )
);
```

그리고 pipe

```js
import create from "zustand";
import produce from "immer";
import pipe from "ramda/es/pipe";

/* log and immer functions from previous example */
/* you can pipe as many middlewares as you want */
const createStore = pipe(log, immer, create);
```

## props를 통한 초기화 등으로 Context가 필요한 경우

```js
import create from "zustand";
import createContext from "zustand/context"; // zustand에서 유틸 제공

type BearState = {
  bears: number
  increase: () => void
}

// pass the type to `createContext` rather than to `create`
const { Provider, useStore } = createContext<BearState>();

export default function App({ initialBears }: { initialBears: number }) {
  return (
    <Provider
      createStore={() =>
        create((set) => ({
          bears: initialBears, // props로 부터 초기화
          increase: () => set((state) => ({ bears: state.bears + 1 })),
        }))
      }
    >
      <Button />
    </Provider>
)
}
```

## TypeScript

type yourself

```ts
// You can use `type`
type BearState = {
  bears: number;
  increase: (by: number) => void;
};

// Or `interface`
interface BearState {
  bears: number;
  increase: (by: number) => void;
}

// And it is going to work for both
const useStore = create<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
```

자동으로 infer 하는 방법 => `combine` 사용

```js
import { combine } from "zustand/middleware";

const useStore = create(
  combine({ bears: 0 }, (set) => ({
    increase: (by: number) => set((state) => ({ bears: state.bears + by })),
  }))
);
```

## Testing

[이 Wiki](https://github.com/pmndrs/zustand/wiki/Testing) 참고

## Best Practice

- 단일 스토어 생성 ([여러 슬라이스로 쪼개는 예제](https://github.com/pmndrs/zustand/wiki/Splitting-the-store-into-separate-slices))
- store를 `set`만을 이용해 정의
- dispatch 함수를 스토어의 최상위에 위치하고 one or many slices를 업데이트

```js
const useStore = create((set) => ({
  storeSliceA: ...,
  storeSliceB: ...,
  storeSliceC: ...,
  dispatchX: () => set(...),
  dispatchY: () => set(...),
}))
```
