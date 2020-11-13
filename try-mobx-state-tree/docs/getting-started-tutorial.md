# Getting Started Tutorial

> https://mobx-state-tree.js.org/intro/getting-started

- [Getting Started Tutorial](#getting-started-tutorial)
  - [Getting Started](#getting-started)
    - [Creating our first model](#creating-our-first-model)
    - [Creating model instances (tree nodes)](#creating-model-instances-tree-nodes)
    - [Meeting Types](#meeting-types)
    - [Modifying data](#modifying-data)
    - [Snapshots are awesome!](#snapshots-are-awesome)
    - [From snapshot to model](#from-snapshot-to-model)
    - [Time travel](#time-travel)
    - [Getting to the UI](#getting-to-the-ui)
    - [Improving render performance](#improving-render-performance)
    - [Computed properties](#computed-properties)
    - [Model views](#model-views)
    - [Going further: References](#going-further-references)
      - [Identifiers](#identifiers)
      - [How to define the reference](#how-to-define-the-reference)
      - [Setting a reference value](#setting-a-reference-value)
      - [References are safe!](#references-are-safe)

```plain
npx create-react-app mst-todo
yarn add mobx mobx-react mobx-state-tree
```

MST is a state container that combines the simplicity and ease of mutable data with the traceability of immutable data and the reactiveness and performance of observable data.

## Getting Started

- 당연하게도 엔티티 정의가 최우선적으로 진행되어야함

### Creating our first model

- 트리는 mutable하지만 런타임 타입 정보에 의해 강화되어 엄격하게 보호되는 객체들로 구성된다. 즉, 각 트리는 모양(타입 정보)과 상태(데이터)를 가진다.
- 이 living tree로 부터, immutable하고 구조적으로 공유되는 스냅샷들이 자동으로 생성된다.

### Creating model instances (tree nodes)

```js
import { types, getSnapshot } from "mobx-state-tree";

// 타입을 직접 명시하지 않고 데이터만으로 엔티티를 생성할 수도 있다.
// 여기에 명시한 데이터는 인스턴스의 기본값이 된다.
const Todo = types.model({
  name: "",
  done: false,
});

const User = types.model({
  name: "",
});

// `.create()`를 이용해 인스턴스를 만들 수 있다.
// 인자를 넘겨 기본값을 오버라이딩 가능
const john = User.create({ name: "gwanduke" });
const eat = Todo.create();

console.log("John:", getSnapshot(john));
// John: {name: "gwanduke"}
console.log("Eat TODO:", getSnapshot(eat));
```

### Meeting Types

> [types overview](https://mobx-state-tree.js.org/overview/types)

타입을 명시적으로 처리하려면 다음과 같이 작성

```js
import { types } from "mobx-state-tree";

const Todo = types.model({
  name: types.optional(types.string, ""), // 명시적인 타입 지정
  done: types.optional(types.boolean, false),
});

const User = types.model({
  name: types.optional(types.string, ""),
});

// Todo와 User 인스턴스를 관리할 모델
const RootStore = types.model({
  users: types.map(User),
  todos: types.optional(types.map(Todo), {}),
});

const store = RootStore.create({
  users: {}, // users is not required really since arrays and maps are optional by default since MST3
});
```

### Modifying data

- MST tree nodes (=== model instances)

```js
const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
  })
  // Actions를 정의할 수 있으며, 인스턴스를 받아 tree node에 변경을 가하는 함수들의 객체를 반환
  // self는 create()시 만들어지는 인스턴스 그 자체
  .actions((self) => ({
    setName(newName) {
      self.name = newName;
    },
    toggle() {
      self.done = !self.done;
    },
  }));
```

```js
store.todos.get(1).toggle();
```

### Snapshots are awesome!

- living tree는 mutable하지만 MST는 `getSnapshot(store)`을 통해 현 상태를 serialize할 수 있다.
- `onSnapshot(store, snapshot => ...)`로 state가 변경될 때 마다 관찰 가능하다.

### From snapshot to model

- 스냅샷으로부터 모델을 복구하는 것이 가능하다.
  - 1. `.create`의 인자로 스냅샷 제공, 모든 레퍼런스를 새로 만드므로 리액트 컴포넌트의 경우 모두 새로 대체될 것임
  - 2. `applySnapshot(store, snapshot)`을 이용하면 store의 레퍼런스가 변경되지 않고 프로퍼티만 업데이트된다. 이는 reconciliation을 트리거한다.

### Time travel

스냅샷을 저장해두고 순서대로 적용하면 된다.

```js
import { applySnapshot, onSnapshot } from "mobx-state-tree";

var states = [];
var currentFrame = -1;

onSnapshot(store, (snapshot) => {
  if (currentFrame === states.length - 1) {
    currentFrame++;
    states.push(snapshot);
  }
});

export function previousState() {
  if (currentFrame === 0) return;
  currentFrame--;
  applySnapshot(store, states[currentFrame]);
}

export function nextState() {
  if (currentFrame === states.length - 1) return;
  currentFrame++;
  applySnapshot(store, states[currentFrame]);
}
```

### Getting to the UI

- MobX에서 했던 것처럼 `react-mobx`를 사용해 컴포넌트에 바인딩 시켜도 된다.
- `autorun`, `reaction`, `observe` 등의 대부분의 API가 호환된다.

### Improving render performance

기존 MobX와 동일하게, 컴포넌트를 더 잘게 쪼개서 observer하는 레퍼런스를 최대한 분리해내면 된다. 그래서 다른 레퍼런스에 의해 불필요한 렌더링이 일어나지 않도록 처리

### Computed properties

- `.views()`로 computed property를 정의할 수 있다.
- 동작방식은 기존 `@computed` 개념과 동일하다
- snapshot에서는 computed 값은 제외된다. (computed값은 속성으로 부터 도출되기 때문에, 의도된 동작임)

```js
const RootStore = types
  .model({
    users: types.map(User),
    todos: types.map(Todo),
  })
  .views((self) => ({
    get pendingCount() {
      return values(self.todos).filter((todo) => !todo.done).length;
    },
    get completedCount() {
      return values(self.todos).filter((todo) => todo.done).length;
    },
  }))
  .actions((self) => ({
    addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }));
    },
  }));
```

### Model views

- model view로 부터 스토어를 수정하는 것은 허락되지 않는다.

```js
const RootStore = types
  .model({
    users: types.map(User),
    todos: types.map(Todo),
  })
  .views((self) => ({
    get pendingCount() {
      return values(self.todos).filter((todo) => !todo.done).length;
    },
    get completedCount() {
      return values(self.todos).filter((todo) => todo.done).length;
    },
    getTodosWhereDoneIs(done) {
      return values(self.todos).filter((todo) => todo.done === done);
    },
  }))
  .actions((self) => ({
    addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }));
    },
  }));
```

### Going further: References

- MST는 레퍼런스 기능을 기본적으로 제공한다. (userId를 user로 매핑하는 것 같은...)

#### Identifiers

- MST에 어떤 attribute를 uid로 사용할 것인지 알려줄 필요 있음
- model 정의시 `types.identifier`를 이용

#### How to define the reference

- model에 다음과 같이 처리
- `user: types.maybe(types.reference(types.late(() => User)))`
- type.late는 지연평가를 위함

#### Setting a reference value

- action으로 정의하면 됨

```js
const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
    user: types.maybe(types.reference(types.late(() => User))),
  })
  .actions((self) => ({
    setName(newName) {
      self.name = newName;
    },
    setUser(user) {
      if (user === "") {
        // When selected value is empty, set as undefined
        self.user = undefined;
      } else {
        self.user = user;
      }
    },
    toggle() {
      self.done = !self.done;
    },
  }));
```

#### References are safe!

- computed property에 의해 필요한 모델을 실수로 삭제하면 에러!
- 레퍼런스에 의해 사용되는 유저를 삭제하면 에러!
