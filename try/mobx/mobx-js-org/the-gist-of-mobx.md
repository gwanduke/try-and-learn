# The gist of MobX

## 컨셉

MobX는 다음 3개 컨셉으로 구분할 수 있다.

1. State
2. Actions
3. Derivations

## state를 정의하고 observable하게 만들기

State는 어플리케이션을 움직이게 하는 데이터이다. 대개 `domain specific state` todo items 같은 것과 `view state` 현재 선택된 엘리먼트 같은 것들이 있다. State는 값을 가진 스프레드시트 셀 같은 것이다.

objects, arrays, cylic data structure or reference 어떤 데이터 구조든 state로 저장할 수 있다. 단지 변경되는 값들에 대해서 `observable`만 붙여주고 추적하면 된다.

```js
import { makeObservable, observable, action } from "mobx";

class Todo {
  id = Math.random();
  title = "";
  finished = false;

  constructor(title) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action,
    });
    this.title = title;
  }

  toggle() {
    this.finished = !this.finished;
  }
}
```

`makeAutoObservable`이용하면 더 간단하게 observable로 만들 수 있다.

## actions를 이용해 업데이트하기

Action은 상태를 변경할 수 있는 어떤 코드를 말한다. Action은 스프레드시트의 셀에 새로운 값을 입력하는 것과 비슷하다.

`observable`한 값을 변경하는 코드들에 대해서 `action`을 표시하는 것이 추천된다. 그러면 MobX는 자동으로 트랜잭션을 적용한다 (노력없는 포퍼먼스 최적화!).

Actions를 사용하는 것은 코드를 구조화하는 것을 돕고 실수로 state를 변경하는 것을 방지한다.

## state 변화에 파생해 자동으로 응답하기

Derivation은 많은 형태로 존재한다:

- 사용자 인터페이스
- 파생된 데이터 (남은 todos의 수 같은)
- 백엔드 통합 (변경사항을 서버로 보내기)

MobX는 다음 두 derivation을 구분한다.

- computed values: 현재 observable state로부터 순수 함수를 이용해 새로운 값 얻기
- reactions: 상태 변경에 따라 자동으로 일어나야하는 사이드 이펙트 (imperative 와 reactive programming 사이의 브릿지)

### computed를 이용한 model derived values

```js
import { makeObservable, observable, computed } from "mobx";

class TodoList {
  todos = [];
  get unfinishedTodoCount() {
    // todos가 observable 이므로 자동 반응
    return this.todos.filter((todo) => !todo.finished).length;
  }
  constructor(todos) {
    makeObservable(this, {
      todos: observable정
      unfinishedTodoCount: computed, // computed 지정
    });
    this.todos = todos;
  }
}
```

### reaction을 이용해 사이드이펙트 만들기

`reaction` 이용.

여기엔 소개되지 않기만 when 등을 이용해도 좋음 (상황에 따라)

### Reactive 리액트 컴포넌트

`observer` 이용

- MobX를 사용할 땐 dumb component란 있지 않음. 모든 컴포넌트가 smart하게 렌더링
- MobX는 컴포넌트가 필요한 경우에 리렌더링 됨을 보장함 그 이상의 일은 하지 않는다

### custom reactions

autorun, reaction, when등을 시기 적절하게 사용하면 됨

**메인 규칙**: MobX는 tracked function의 실행중에 읽은 observable 프로퍼티에 반응함

## 원칙

- 상태가 변경되면 모든 derivation은 자동으로 업데이트된다.
- 모든 derivation은 동기적으로 수행된다. 즉, 상태 변경 후에 computed value가 올바르게 반영되어 있음이 보장된다.
- computed value는 lazy하게 업데이트되며, 이는 사용되기 전까지는 업데이트를 수행하지 않음을 의미한다. (성능 최적화 되어있다)
- computed value는 pure하다. 상태변경은 가정되지 않는다.
