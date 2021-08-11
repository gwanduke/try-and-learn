# Try Jotai

https://jotai.pmnd.rs/

- 추가적인 리렌더링 없음. suspense, concurrent 피쳐의 혜택을 받을 수 있다!
- `useState`를 대체할 수 있으며 더 확장성이 있다. (글로벌하게 사용 가능하다)(복잡한 어플 설계에 유용하다)

## 사실...

- atomic한 Recoil의 영향을 받았으며 bottom-up 접근형태를 취한다.
- 렌더링은 atom의 의존관계에 따라 최적화된다.
  - 이는 React context의 extra re-render 이슈를 해결한다. (extra re-render는 화면에 변경점이 없음에도 re-render가 일어나는 현상을 의미)

## Extra Utils

- `jotai/utils` 패키지를 따로 제공하며, 저장소를 로컬 스토리지를 사용하도록 하는 등의 기능을 제공한다.
- Immer, Optics, Query, XState, Valtio, Zustand, and Redux 등의 통합? -> 이부분은 직접 해봐야 알겠음 😱

## vs Recoil

- 더 미니멀한 API
  - 셀렉터든 아톰이든 그냥 atom 으로 만듬
- string key 없음
- 타입스크립트 기반

- Jotai는 객체 참조에 의존, Recoil은 atom string key에 의존
- Recoil 승리: If your app heavily requires state serialization (storing state in storage, server, or URL), Recoil comes with good features.
- 단순히 context를 대체하는 정도라면 Jotai 굿
- 사실 둘다 비슷해서 사용해보고 맘에 드는거 고고

## vs Context

- context는 기본적으로 extra re-render 문제를 가지고 있다.
- 이를 해결하기 위해서 Provider를 나눠 Provider 헬이 생길 수있음
- 동적인 추가/삭제가 이루어질 수 있음 (하위 컨텍스트가 추가/삭제)
- top-down 솔루션으로는 "use-context-selector" 같은 라이브러리가있다. 이는 참조를 동일하게 만듦으로서 리렌더링을 방지한다. 그리고 가끔 memoization 테크닉을 요구한다.

이와 비교해 Jotai는 atomic 모델을 이용한 bottom-top 솔루션이다.

## 기본

Jotai는 두가지 원리가있음

- 원시적: 기본 인터페이스가 useState와 닮아있다
- 유연함: 파생된 atom은 다른 atom과 결합될 수 있따. 그리고 또한 side effects를 위해 `useReducer` 스타일을 허용한다.

## 특이사항

- Jotai state is within React component tree

## API

### atom

- atom config를 만드는 함수이며, atom config는 immutable 하다.
- atom config 자체는 값을 소유하고 있지않다. atom 값은 Provider의 상태에 저장된다.
- 다음 4가지를 만들 수 있따.
  - primitive atom
  - read-only atom
  - wriable derived atom
  - write-only derived atom

```js
const primitiveAtom = atom(initialValue);
const derivedAtomWithRead = atom(read);
const derivedAtomWithReadWrite = atom(read, write);
const derivedAtomWithWriteOnly = atom(null, write);

// write: (get, set, update) => void | Promise<void>
//   - get은 의존성을 track하지 않는다. 즉, 렌더링 다시 일어나지 않음
//   - set은 새로운 값으로 Provider의 값을 대체한다
//   - update is an arbitrary value that we receive from the updating function returned by useAtom described below.
```

- atom을 종류로 따지면 2가지로 나눌 수 있다
  - writable atom
  - read-only atom

### onMount

- `onMount` 함수는 atom이 provider에서 처음 사용될 때 일어남
- `onUmount`는 atom이 더이상 사용되지 않을 때 일어남

어떤 경우에 atom은 unmount 되자마자 다시 mount될 수도 있따.

### Provider

- atom config는 값을 홀딩하지 않음.
- atom values는 분리된 스토어에 살아감.
- Provider가 없어도 동작은 하지만 여러 컴포넌트 트리의 다른 atom 값들을 저장하려면 필요로 한다.
- scope를 유니크하게 지정하면, scoped atom을 위한 저장소가 될 수 있다. 라이브러리 제공등에서 사용할 수 있음

Provider is to provide a state for component sub tree. Multiple Providers can be used for multiple subtrees, even nested. This works just like the normal React Context.

If an atom is used in a tree which no Providers exist, it will use the default state. This is so-called provider-less mode.

Providers are useful for some reasons.

It can provide a different state for each sub tree.
Provider can hold some debug information.
Provider can accept initial values of atoms.

### useAtom

- Provider의 값을 읽을 때 사용
- [atomValue, updater] 형태의 tuple 반환
- useAtom을 이용해 atom config를 사용하는 모든 컴포넌트가 해제되면, 실제 값은 Provider에서 제거된다.
