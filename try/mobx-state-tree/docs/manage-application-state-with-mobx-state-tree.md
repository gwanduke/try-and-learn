# manage-application-state-with-mobx-state-tree

> https://egghead.io/courses/manage-application-state-with-mobx-state-tree

- actions에 정의된 함수만이 속성을 변경할 수 있다.
- `onPatch()`: [JSON Patch](http://jsonpatch.com/)라는 스펙이있다.(avoid sending a whole document when only a part has changed) 이는 JSON의 변경사항을 추적하기 위한 정의인데, onSnapshot 대신 이를 사용할 수도 있다.
- views에 정의된 get 프로퍼티는 computed 프로퍼티로 취급되어 mobx에서 했던 것 처럼 해당 함수 안의 내용에서 참조하고 있는 값이 변경되어야만 재계산된다. 이는 해당 computed property에 autorun을 걸어보면 알 수 있다.
- applySnapshot을 이용해 특정 아이템을 업데이트하는게 때로는 편리하다.

  ```js
  applySnapshot(this.props.item, getSnapshot(this.state.clone));
  ```

- getParent를 이용하면 상위 모델을 조회할 수 있다.

  ```js
  getParent(getParent(self)); // == getParent(self, 2)
  ```

- MST에서는 리소스들이 유니크하게 단일 경로에 존재하기 때문에, destroy같은 유틸리티로 삭제가 가능하다.
- 폼을 만드는데 있어서 리소스.create()를 해서 상태로 가지고 있으면 조작하기가 편리하다.
- Model.is(...)으로 스냅샷이 모델에 맞는지 확인할 수 있다.

  ```js
  if (localStorage.getItem("...")) {
    const json = JSON.parse(localStorage.getItem("..."));
    if (Model.is(json)) initialState = json;
  }
  ```

- HMR - https://egghead.io/lessons/react-restore-the-model-tree-state-using-hot-module-reloading-when-model-definitions-change
  - 이를 적용하지 않으면, 수정시마다 풀페이지 리로딩이 되어버린다.
  - 그래서 hot module reloading을 적용해주어야한다. (앱 렌더링, 모델 변경 두가지 경우에 대해서 각각)
- types

  - enumeration `types.enumeration('gener', ['m', 'f'])`
  - `types.Map(User)`

    ```js
    const Group = types.model({ users: types.Map(User) });
    ```

- flow

  - 다음과 같은 코드를 실행하면 action안에서만 조작할 수 있다는 에러가 난다. 왜냐면 async 부분은 다른 컨텍스트로 취급되기 때문, 그래서 flow를 사용해주어야함
    (The reason is that only the first take of an async process is part of the action. The rest is still asynchronous.)

    ```js
    // Error!
    .actions(self => ({
      getSuggestions() {
        window.fetch('').then(res => res.json()).then(json => {
          self.items.push(...json.items)
        })
      }
    }))

    // Using async - await;
    .actions(self => ({
      async getSuggestions() {
        const response = await window.fetch('');
        const json = await res.json();
        self.addSuggestions(...json.items)
      },
      addSuggestions(suggestions) {
        self.wishList.items.push(...suggestions);
      }

    // Using flow;
    .actions(self => ({
      getSuggestions: flow(function * () {
        const response = yield window.fetch('');
        const json =  yield res.json();
        self.wishList.items.push(...suggestions);
      })
    }))
    ```

- 관계 형성
  - https://egghead.io/lessons/react-create-relationships-in-your-data-with-mobx-state-tree-using-references-and-identifiers
- Use Volatile State and Lifecycle Methods to Manage Private State
  - https://egghead.io/lessons/react-use-volatile-state-and-lifecycle-methods-to-manage-private-state
- 모델간 공통 로직을 추출하고 `types.compose`로 조합할 수 있다.
  - 동일 로직, 다른 리소스에 대해서 뭔가 처리하는 경우, factory 함수를 만들어서 model을 반환하도록 처리하면 편리하다.
