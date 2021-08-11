# Try Recoil

> https://recoiljs.org/

다음 리액트의 한계를 극복할 수 있다

- 컴포넌트 상태는 동일 부모로 상태를 공유 가능한데, 이는 트리 전체를 리렌더링 시킬 수 있음
- 컨텍스트는 단일 값만 저장할 수 있음. 각 컨슈머를 위한 각 값 집합을 저장할 순 없다.
- 이들은 트리의 위에서부터 코드를 분리하기 힘들게한다.

API를 유지하면서 의미적으로 동일한 행동을 가능한 유지하도록 하고 싶다.

## 특징

- 각 atom이 고유한 키를 가지며, 동일키를 가지는 것은 오류이다.
- `useRecoilState`: 상태를 읽고/쓰는 훅, `useState`와 비슷하지만, 컴포넌트간 상태 공유 가능
- selector는 순수함수이다. atom 또는 또다른 selector로 구성된다. 상위 atom 또는 selector가 변경되면 이 또한 변경된다.
- `useRecoilValue()`: selector를 읽을 수 있는 훅이다.
- ES5로 트랜스파일해 사용하는 것을 권장하지 않으며, Map/Set 같은 것들을 polyfill을 이용해 에뮬레이션 하는 것은 성능상 문제를 일으킬 수 있음

## Utils

- eslint-plugin-react-hooks를 사용하는 경우, `useRecoilCallback`도 지정해주면 더 도움이 된다.

  ```js
  {
  "plugins": ["react-hooks"],
  "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": [
      "warn",
      {
          "additionalHooks": "useRecoilCallback"
      }
      ]
  }
  }
  ```

## 시작하기

- `<RecoilRoot />`를 루트에 삽입해주기
- atom의 값을 읽는 컴포넌트는 암묵적으로 이를 `구독`한다. (값 변경시 렌더링이 일어난다) 이는 `useRecoilState()`로 달성가능하다.
- derived state는 `selector`로 정의할 수 있으며 `useRecoilValue()`로 읽을 수 있다.
- `useSetRecoilState()`를 이용하면 setter를 얻을 수 있다.
- atom은 기본적으로 읽기/쓰기가 가능하지만 selector는 get/set을 둘다 가지는 경우에만 읽기/쓰기가 가능한것으로 취급된다.

## 고급

- 셀렉터를 async 하게 사용할 수 있는데, selector를 사용할 때 async가 붙을 뿐, useRecoilValue를 사용하는 인터페이스는 동일하다.
- 하지만 render()는 동기적이기 때문에, 곤란한 점이 있는데, recoil은 Suspense와 함께 동작해, 로딩동안 fallback을 보여줄 수 있다.
- 비슷한 개념으로 에러시에는 ErrorBoundary를 활용할 수 있다.
- 셀렉터에 인자를 전달할 필요가 있는 경우 `selectorFamily`로 셀렉터를 생성할 수 있다.
- [ ] TODO: https://recoiljs.org/docs/guides/asynchronous-data-queries#concurrent-requests 더 읽어보자

## 생각 정리

생각보다 간단하구만!

async 하게도 값을 초기화하거나 다룰 수 있다는 점이 흥미로웠고, 아래 두가지는 아직 변경가능성이 있다.

- https://recoiljs.org/docs/guides/atom-effects
- https://recoiljs.org/docs/guides/dev-tools

작은 단위의 원자상태를 만들고 이를 조합해 사용하는 형태, 서버 데이터 처럼 많은 상태를 관리해야할 떄에는 어떤식으로 정리될지 모르겠으나 일단 기본적으로 UI 값을 관리하는데에는 손색이 없는듯하다.
