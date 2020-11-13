# MST TODO

```text
$ yarn add mobx-state-tree
```

모델만 잘 정의하면 특별히 어려운 점은 없었다.

## 실수 했던 것

- types.identifierNumber로 지정해야하는 것을 types.identifier 로 지정했더니 에러가 났다. 런타임에 타입체킹이 생각보다 편리한 것 같다.
- onSnapshot으로 변경이 있을 때마다 localStorage로 동기화하은 방식이 편리했다.
- todo 삭제시 `destroy(todo)` 이런식으로 mobx-state-tree의 `destroy()` 함수를 활용하는데, 이런 유틸리티 함수들을 잘 알아두는게 편리하겠다.
  - destroy(node): Kills node, making it unusable. Removes it from any parent in the process
- TodoStore 하위에 Todo 같은 스토어를 추가로 넘기면 해당 스토어에서는 `getRoot(self)` 형태로 상위 스토어를 조회할 수 있었다.
  - getRoot(node): Returns the root element of the tree containing node
- `types.union`, `types.literal`
  - types.union(options?: { dispatcher?: (snapshot) => Type, eager?: boolean }, types...) create a union of multiple types. If the correct type cannot be inferred unambiguously from a snapshot, provide a dispatcher function to determine the type. When eager flag is set to true (default) - the first matching type will be used, if set to false the type check will pass only if exactly 1 type matches.
  - types.literal(value) can be used to create a literal type, where the only possible value is specifically that value. This is very powerful in combination with unions. E.g. temperature: types.union(types.literal("hot"), types.literal("cold")).
- References
  - [Types Overview](https://mobx-state-tree.js.org/overview/types)
  - [API Overview](https://mobx-state-tree.js.org/overview/api)
  - [Lifecycle hooks overview](https://mobx-state-tree.js.org/overview/hooks): 모델 생성, 삭제 등의 액션 이후 수행되어질 동작을 정의할 수 있다.
