# Actions

## actions로 상태 업데이트 하기

- action (annotation)
- action(fn)
- action(name, fn)

actions은 상태를 변경하는 코드이고 원칙적으로 이벤트에 의해 액션이 실행된다.

MobX는 액션을 정의하기를 요구하며 (`makeAutoObservable`를 사용하면 자동으로 할 수 있다.) 액션은 다음과 같은 성능 이점을 갖느다.

1. 트랜잭션안에서 실행되며, 최고 바깥의 액션이 끝나기 전까지 observers가 업데이트되지 않는다. 즉, 중간에 연산중인 값들이 어플리케이션에 보여지지 않도록 한다. (액션이 끝나기 전까지)
2. 기본적으로 액션 밖에서의 상태변경은 허용되지 않는다. 이는 상태 변경이 어디서 이루어지는지 명확하게 정의한다.

### `action`을 이용해 함수 묶기

action은 하나의 트랜잭션을 만드므로 가능한 바깥쪽에 action을 위치 시키는 것이 좋다.

- action
- action.bound (annotation): this가 올바른 instance로 bind된다.
- runInAction(fn): action을 만들되 즉시 호출

### 비동기 액션

비동기 액션에서 변경을 처리하는 경우 다음과 같은 조치가 필요하다.

1. 변경 처리 콜백을 action으로 묶기
2. async await의 경우 await 이후는 다른 tick으로 처리되므로 runInAction 처리
3. flow + generator로 처리해 runInAction 같은 처리를 신경쓰지 않기
