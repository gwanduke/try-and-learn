# 7. Testing React Apps

## 01. Testing React Apps Welcome

테스트는 자신감을 어떻게 가지느냐이다!

- [ ] [but-really-what-is-a-javascript-test](https://kentcdodds.com/blog/but-really-what-is-a-javascript-test)
- [ ] [but-really-what-is-a-javascript-mock](https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock)

## 02. Simple Test With ReactDOM

두 사용자를 고려해야한다.

1. end user: 코드와 상호작용 하는 사람
2. developer user: 실제 코드를 사용하는 사람 (렌더링, 함수호출 등...)

- [ ] [Avoid The Test User](https://kentcdodds.com/blog/avoid-the-test-user/)

기본적인 테스트는 다음과 같이 구성된다

```js
// 렌더링
const div = document.createElement("div");
document.body.append(div);
ReactDOM.render(<Counter />, div);

// 레퍼런스
const [increment, decrement] = div.querySelectorAll("button");
const message = div.firstChild.querySelector("div");

// Assertion
expect(message.textContent).toBe("Current count: 0");
// 더 상세한 이벤트를 발생시키려면 `dispatchEvent`를 사용해도 된다.
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
increment.click();
//...

// Cleanup
div.remove();
```

## 03. Simple Test with React Testing Library

- `@testing-library/react`, `@testing-library/jest-dom`를 사용하면 편리함
- `@testing-library/react`가 자동으로 제공하는 것
  - auto cleanup을 제공해 따로 cleanup해줄 필요없다. [auto-cleanup feature](https://testing-library.com/docs/react-testing-library/api#cleanup)
  - act를 자동으로 핸들링, 경고가 있는 경우 참고 -> [Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning).

## 04. Avoid Implementation Details

구현상세를 테스트 하는 것은 피하는 것이 좋다.

- 📜 Read more about
  - [ ] [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
  - [ ] how to [Avoid the Test User](https://kentcdodds.com/blog/avoid-the-test-user)
- fireEvent대신 userEvent 패키지를 사용하면 더 사용자의 환경(브라우저)과 가까운 테스트를 수행할 수 있음
- **chrome devtools**에 **accesibility**를 점검할 수 있는 도구가 있는데, 이를 이용하면 어떤 Role을 가지는지, 어떤 name을 가지는지 파악하기 편리함 (또한 이는 시각장애인등에 접근성이 좋음)

## 05. Form Testing

- 넘겨야하는 함수가 있는 경우 mock 함수를 직접 구현하기도 하지만, `jest.fn()`을 사용하면 편리하다.
- 코드와 상관없는 부분의 값 등은 fake 값을 사용하는 것이 좋다. (faker 이용) (함수를 호출하기에 이 것이 나타나내는게 이름이나 패스워드라는 의미도 부여되므로 일석이조.).
  - `buildLoginForm()` 같은 팩토리 함수를 만들고 사용하는 것이 편리하다.
  - 이 팩토리 함수는 필요한 경우 값을 오버라이드 할 수 있도록 구성하자 `buildLoginForm(params)`
  - 관련 라이브러리: [`@jackfranklin/test-data-bot`](https://www.npmjs.com/package/@jackfranklin/test-data-bot)

## 06. Mocking HTTP Requests

msw를 사용하는 방법에 대한 내용이다. 크게 중요하지 않고 필요할 때 찾아보면 된다.

- `waitForElementToBeRemoved`를 사용하면 사라지는 엘리먼트를 감지할 수 있다. (await 빼먹지 말기)
- `inlineSnapshot`이 서버의 에러 메시지를 표시하는 것을 체크하는데에 유용할 수 있다. (계속 변할 수 잇으므로 u만 프레스하면 업데이트할 수 있도록)

  ```js
  // snapshot 함수 안쪽 내용은 자동으로 만들어진다. 에러 내용은 바뀔 수 있기에 snapshot을 활용하면 복붙하지 않아도 되어서 편리하다.
  expect(screen.getByRole("alert")).toMatchInlineSnapshot(`
    <div
      role="alert"
      style="color: red;"
    >
      password required
    </div>
  `);
  ```

## 07. Mocking Browser APIs and Modules

mock을 한다는 것은 실제와 다른 부분을 하나 추가하는 것이므로 한부분에서 자신감을 잃는 것과 같다.

- [ ] [The Merits of Mocking](https://kentcdodds.com/blog/the-merits-of-mocking)
- [ ] [But really, what is a JavaScript mock?](https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock)

테스트는 브라우저에서 수행되는 것이 아니라, Node의 jsdom이 제공하는 browser simulated 환경에서 동작한다. 그래서 브라우저 API 또는 레이아웃에 직접적으로 의존하는 것들 (드래그앤 드롭 등...)은 Cypress같은 실제 브라우저 툴을 사용하는 것이 좋다.

### Mocking Modules

- [ ] [how-jest-mocking-works](https://github.com/kentcdodds/how-jest-mocking-works)
- 📜 [Manual Mocks](https://jestjs.io/docs/en/manual-mocks)

```js
jest.mock("../math", () => {
  const actualMath = jest.requireActual("../math");
  return {
    ...actualMath,
    subtract: jest.fn(),
  };
});

// now the `add` export is the normal function,
// but the `subtract` export is a mock function.

// 그냥 jest.mock('...') 호출하면 ... 모듈의 exports 들은 모두 jest.fn 처리된다.
```

### Example

다음과 같은 형태로 fake 할 수 있다.

```js
function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

window.navigator.geolocation.getCurrentPosition.mockImplementation(
  (callback) => {
    promise.then(() => callback(fakePosition));
  }
);

// ...
resolve();
await promise;
```

### act() 문제

상태업데이트가 수동으로 일어나는 경우 이런 문제가 생길 수 있는데 다음과 같이 act 처리해주어야 함

```js
await act(async () => {
  resolve();
  await promise;
});
```

### mock module 예제

```js
import { useCurrentPosition } from "react-use-geolocation";

// ...
const fakePosition = {
  coords: { latitude: 33, longitude: 132 },
};
let updateCoords;
function useGeo() {
  const [state, setState] = useState([]);
  updateCoords = setState;

  return state;
}
useCurrentPosition.mockImplementation(useGeo);

render(<Location />);
expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

updateCoords([fakePosition]);
// ...
```

## 08. Context and Custom Render Method

- context 등은 render 메서드의 wrapper에 context provider를 지정해 간소화할 수 있다.
- 이 과정을 하나의 유틸리티 함수 `render` 로 만들어두면 편리하고 DRY하다.

## 09. Testing Custom Hooks

여러가지 방법이 있다.

- 1. custom hooks를 사용하는 간단한 컴포넌트를 구성하고, 그 컴포넌트를 테스트한다.
- 2. fake component, [참고 - How to test custom React hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks): 컴포넌트를 만들기가 힘든 경우 사용
- 3. react hook testing library 사용 (2번 아이디어와 동일함)

  ```javascript
  const result = {};
  function TestComponent(props) {
    Object.assign(result, useCounter());
    return null;
  }
  render(<TestComponent />);

  expect(result.count).toBe(0);
  act(() => result.increment());
  expect(result.count).toBe(1);
  // ...
  ```
