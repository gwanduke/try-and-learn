# Jotai vs. Recoil

- [Jotai vs. Recoil](#jotai-vs-recoil)
  - [Jotai vs. Recoil: What are the differences?](#jotai-vs-recoil-what-are-the-differences)
  - [References](#references)
  - [Tips](#tips)
    - [Manage Application State with Jotai Atoms](#manage-application-state-with-jotai-atoms)
  - [API Core](#api-core)
    - [atom](#atom)
    - [onMount](#onmount)
    - [Provider](#provider)
    - [useAtom()](#useatom)
    - [Core tips](#core-tips)
    - [Notes about atoms](#notes-about-atoms)
  - [API Utils](#api-utils)
    - [atomWithStorage](#atomwithstorage)
    - [useUpdateAtom](#useupdateatom)
    - [useAtomValue](#useatomvalue)
    - [atomWithReset](#atomwithreset)
    - [useResetAtom](#useresetatom)
    - [RESET](#reset)
    - [useReducerAtom](#usereduceratom)
    - [atomWithReducer](#atomwithreducer)
    - [atomWithDefault](#atomwithdefault)
    - [🚧 atomWithDefault](#-atomwithdefault)
    - [atomWithHash](#atomwithhash)
    - [atomFamily](#atomfamily)

요즘은 일에 치여서 신기술이나 트렌드에 대해서 좀 관심을 끊고 살았는데, 이제야 숨통이 조금 트여서 오랜만에 이것저것 찾아봤다. 그리고 전회사 동료에게도 요즘 뭐 신박한거 없냐? 라고 물어보게 되었는데 `Jotai`를 쓴다고했다. 들어는 봤는데 이름이 맘에 안들어서(...) 외면했던 그 것! 이걸 프로덕션에서 사용한다고? 급 궁금해진다.

우선은 잘 요약된 자료를 먼저 찾아 읽어보자.

- [리액트 상태 관리 트렌드](https://leerob.io/blog/react-state-management)
- [화해 기술블로그: Atomic state management – Jotai](http://blog.hwahae.co.kr/all/tech/tech-tech/6099/)
- [Kent C. Dodds - Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)

## [Jotai vs. Recoil: What are the differences?](https://blog.logrocket.com/jotai-vs-recoil-what-are-the-differences/)

최근 리액트 진영에서의 상태관리 라이브러리를 분류하면 다음과 같다.

- Flux (Redux, Zustand)
- Proxy (MobX, Valtio)
- Atomic (Recoil, Jotai)

Atomic한 방법이 Flux, Proxy한 방법 보다 리액트 상태 관리와 닮아있고, 리액트 트리에 저장된다. (그래서 비교적 React Context와 많이 비교당함)

## References

- https://github.com/pmndrs/jotai/issues/420
- [이미지 캡쳐](.)

## Tips

### [Manage Application State with Jotai Atoms](https://egghead.io/courses/manage-application-state-with-jotai-atoms-2c3a29f0)

- To store a list of states and effectively preserve them, we can combine multiple atoms into one atom. This new atom would store a list of atom configs.
- An atom config can be converted to a string to be used as a key prop when we map over a list of atoms.

```js
listAtoms.map((atom) => <div key={`${atom}`}>...</div>);
```

- The naming convention here, `selectedShapeAtomAtom`, can be translated to "atom that stores the selected ShapeAtom".
- The `selectedAtomCreator` returns `true` if the provided `ShapeAtom` is the same as the selected `ShapeAtom` and `false` otherwise. The `useMemo` hook causes `selectedAtomCreator` to only be called when the `shapeAtom` has changed.

```ts
// selection.ts
const selectedShapeAtomAtom = atom<ShapeAtom | null>(null);

export const selectAtom = atom(null, (_, set, shapeAtom: ShapeAtom) => {
  set(selectedShapeAtomAtom, shapeAtom);
});

export const selectedAtomCreator = (shapeAtom: ShapeAtom) => {
  const selectedAtom = atom((get) => shapeAtom === get(selectedShapeAtomAtom));

  return selectedAtom;
};

// App.tsx
const App = () => {
  const [shape] = useAtom(shapeAtom);
  const [_, select] = useAtom(selectAtom);
  const [selected] = useAtom(
    useMemo(() => selectedAtomCreator(shapeAtom), [shapeAtom])
  );
};
```

- Provider를 제공하면, 동일한 atom을 사용하더라도 각자 독립된 공간에서 상태를 관리하게 해준다.

## API Core

### atom

'atom config' 를 만들기위한 함수이며 'atom config'는 immutable object 이다. atom의 실제 값은 Provider 상태에 저장된다.

- `initialValue`: atom의 값이 변경되지 않은 경우 반환할 값
- `read`: 매 렌더링시마다 호출될 함수. `read` 시그니쳐는 `(get) => Value | Promise<Value>`. atom config를 취해 Provider에 저장된 값을 반환한다. Dependency는 추적된다. 즉, `get`이 한번이라도 사용되면 `read`는 atom 값이 변경될 때마다 재평가 된다.
- `write`: atom의 값을 변경하기 위한 함수. primitive atom인 경우 해당 값을 `useAtom()[1]`로 직접 할당한다. `write`의 시그니쳐는 `(get, set, update) => void | Promise<void>` 이다. `get`과 유사하지만 dependency를 추적하지 않는다는 점이 다르다. `set` 함수는 atom config를 인자로 받아 Provider의 해당 값을 업데이트하는 함수이다. `update`는 `useAtom`사용시 받게될 재량적인 변수이다.

```js
const primitiveAtom = atom(initialValue); // writable atom
const derivedAtomWithRead = atom(read); // read only atom
const derivedAtomWithReadWrite = atom(read, write);
const derivedAtomWithWriteOnly = atom(null, write); // write only atom
```

### onMount

`onMount` 함수는 atom이 provider에서 처음 사용될 때 호출된다. 그리고 `onUnmount`는 더이상 사용되지 않을 때 호출된다. 어떤 경우에는 unmount 직후 즉시 mount가 이루어질 수도 있다.

```js
const countAtom = atom(1);
const derivedAtom = atom(
  (get) => get(countAtom),
  (get, set, action) => {
    if (action.type === "init") {
      set(countAtom, 10);
    } else if (action.type === "inc") {
      set(countAtom, (c) => c + 1);
    }
  }
);

// setAtom은 derivedAtom의 write 함수를 이용하게 된다.
derivedAtom.onMount = (setAtom) => {
  setAtom({ type: "init" });
};
```

### Provider

### useAtom()

- useState와 같이 아톰 값과 udpate 함수를 튜플로 반환함
- 아톰이 이 함수를 통해 처음 사용될 때, Provider에 initial value를 등록함
- 아톰이 파생 아톰이라면, read 함수가 호출되어 초기값을 결정한다.
- 아톰이 더이상 사용되지 않으면(어떤 아톰을 사용하는 컴포넌트가 모두 언마운트 되면, 그래서 atom cofig가 더이상 존재하지 않으면) 값은 **Provider로 부터 제거**된다.

```js
// updateValue는 한개의 인자만을 받는다. (atom write의 3번째 인자)
const [value, updateValue] = useAtom(anAtom);
```

### Core tips

- dependency는 read를 호출 할 때 마다 재계산된다. (다시 만들어진다)
- atom은 동적으로도 만들어질 수 있음 (컴포넌트 내에서라도)
  - useRef, useMemo, useState를 활용해야할 수 있음 (https://github.com/pmndrs/jotai/issues/5)
  - atom을 글로벌하게 저장할 수도 있음 (https://twitter.com/dai_shi/status/1317653548314718208, https://github.com/pmndrs/jotai/issues/119#issuecomment-706046321)
  - `atomFamily`가 parameterized atoms를 만드는데 도움을 줄 수 있음

### Notes about atoms

- `read` 함수는 React render phase에 호출되기 때문에, 함수는 순수해야함
- `write` 함수는 `useAtom` 처음 호출시, 그 후에는 useEffect 에서 일어날 수 있다. `write`를 렌더에서 처리하면 안된다.
- atom이 `useAtom`을 이용해 처음 초기화될때, 초기값을 가져오기 위해 `read`를 호출한다. 만약 atom이 Provider에 값을 가진 상태라면, `read`를 호출하지 않고 그 값을 바로 가져온다. (초기호출시에만)
- 일단 atom이 한번 사용되고나면, 해당 값은 dependencies가 변하거나, useAtom을 통해 명시적으로 변경했을 떄에만 업데이트 된다.

## API Utils

### atomWithStorage

`localStorage` 또는 `sessionStorage`에 값을 유지하는 atom을 만들 수 있다.

```js
// atomWithStorage(key, initialValue, storage)
const darkModeAtom = atomWithStorage("darkMode", false);
```

🚧 서버사이드 렌더링시 localStorage가 없기에 initialValue를 활용하게 되어 실제로 유저의 정보와 일치하지 않아 깜빡임이나 표시를 제대로 못하는 경우가 생긴다. 이를 위해 storeValue와 관련된 컴포넌트는 클라이언트에서만 표시되도록 하는 것이 도움이 되겠다. (https://docs.pmnd.rs/jotai/api/utils#server-side-rendering)

### useUpdateAtom

context에서 value, dispatch context를 분리하는 것과 동일한 효과

```js
export function useUpdateAtom<Value, Update>(
  anAtom: WritableAtom<Value, Update>,
  scope?: Scope
) {
  const ScopeContext = getScopeContext(scope)
  const store = useContext(ScopeContext)[0]
  const setAtom = useCallback(
    (update: Update) => store[WRITE_ATOM](anAtom, update),
    [store, anAtom]
  )
  return setAtom as SetAtom<Update>
}
```

### useAtomValue

`useAtom(anAtom)[0]` 와 동일하다.

```js
export function useAtomValue<Value>(anAtom: Atom<Value>): Value {
  return useAtom(anAtom)[0];
}
```

### atomWithReset

`useResetAtom`을 이용해 정의할 때 주어진 `initialValue`로 리셋될 수 있는 atom이다. primitive atom을 다룰때와 동일하나, `RESET`이라는 값으로 세팅이 가능하다. (참고: https://docs.pmnd.rs/jotai/guides/resettable)

### useResetAtom

resettable atom을 초기값으로 되돌린다.

```js
const TodoResetButton = () => {
  const resetTodoList = useResetAtom(todoListAtom);
  return <button onClick={resetTodoList}>Reset</button>;
};
```

### RESET

- `atomWithReset`
- `atomWithDefault`
- `RESET` 심볼을 받을 수 있는 writable atom

을 위한 심볼이다. 의도되는 동작은 초기값으로 초기화이다.

### useReducerAtom

atom을 리듀서를 이용해 다룰 수 있다.

```js
const countReducer = (prev, action) => {
  if (action.type === "inc") return prev + 1;
  if (action.type === "dec") return prev - 1;
  throw new Error("unknown action type");
};

const countAtom = atom(0);

const Counter = () => {
  const [count, dispatch] = useReducerAtom(countAtom, countReducer);
  return (
    <div>
      {count}
      <button onClick={() => dispatch({ type: "inc" })}>+1</button>
      <button onClick={() => dispatch({ type: "dec" })}>-1</button>
    </div>
  );
};
```

### atomWithReducer

`useReducerAtom`과는 다르게 atom을 생성할 때 리듀서를 넘긴다. useAtom을 사용하면 `[value, dispatch]` 튜플을 반환한다.

### atomWithDefault

primitive 값 대신, read 함수로 resettable primitive atom을 만든다.

### 🚧 atomWithDefault

- [ ] 다시보기

원시 값 대신 함수로 초기화를 한다는 것은 알겠는데, 왜 필요한지는 잘 모르겠고, 예제도 잘 동작하지 않는듯하다. atomWithDefault를 이용한 값에 set을 하면 초기화 함수는 더이상 readable 하지 않는 것은 맞는 것같다.

### atomWithHash

- URL hash와 양방향으로 데이터를 처리하도록 하는 API
- URL의 hash가 변하면 이 값도 변하고, 이 값이 변하면 URL도 변한다.

### atomFamily

TODO: recoil의 atomFamily와 비교해볼 필요가 있겠음

https://github.com/pmndrs/jotai/issues/23
