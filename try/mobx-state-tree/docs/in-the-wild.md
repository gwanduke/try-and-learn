# MST: 프로젝트를 진행하며 알게된 점

- [MST: 프로젝트를 진행하며 알게된 점](#mst-프로젝트를-진행하며-알게된-점)
  - [API](#api)
    - [getEnv()](#getenv)
    - [Lifecyle Hooks](#lifecyle-hooks)
      - [afterAttach()](#afterattach)

## API

### getEnv()

`node`의 environment를 반환한다. [Dependency Injection](https://mobx-state-tree.js.org/concepts/dependency-injection)에서 더 알 수 있는데, `create()`를 이용해서 새로운 트리를 만들 때 두번째 인자로 넘긴 객체의 데이터를 조회할 수 있다. 이는 트리 전역에서 호출 가능하며, 테스트 등에서 로거 등을 대체할 때 편리하다.

```js
import { types, getEnv } from "mobx-state-tree";

const Todo = types
  .model({
    title: "",
  })
  .actions((self) => ({
    setTitle(newTitle) {
      // grab injected logger and log
      getEnv(self).logger.log("Changed title to: " + newTitle);
      self.title = newTitle;
    },
  }));

const Store = types.model({
  todos: types.array(Todo),
});

// setup logger and inject it when the store is created
const logger = {
  log(msg) {
    console.log(msg);
  },
};

const store = Store.create(
  {
    todos: [{ title: "Grab tea" }],
  },
  {
    logger: logger, // inject logger to the tree
  }
);

store.todos[0].setTitle("Grab coffee");
// prints: Changed title to: Grab coffee
```

### Lifecyle Hooks

#### afterAttach()

다른 노드에 할당되면 일어남. 부모의 한 부분으로서 엘리먼트가 만들어지면, `afterAttach()`가 호출된다. `afterCreate()`와 다른점은 너비 우선으로 호출되어진다는 것. 그래서 `afterAttach()`는 안전하게 부모가 있다 가정할 수 있음, 반면 `afterCreate()`는 아님
