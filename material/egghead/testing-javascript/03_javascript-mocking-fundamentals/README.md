# JavaScript Mocking Fundamentals

- 간단히 가져온 모듈의 실제 프로퍼티를 바꿔서 구현을 mock할 수 있다. (멍키 패칭)

  ```js
  const utils = require("./utils"); // utils는 랜덤에 의존하는 함수 집합
  const originalGetWinner = utils.getWinner;
  utils.getWinner = (a, b) => a;

  test('', () => {
    ...
  })

  // 되돌려 놓아야함
  utils.getWinner = originalGetWinner;
  ```

- mock fn을 만들어보자

  ```js
  function fn(impl) {
    const mockFn = (...args) => {
      mockFn.mock.calls.push(args)
      retur impl(...args);
    }

    mockFn.mock = { calls: []}

    return mockFn;
  }

  utils.getWinner = fn((a, b) => a)
  ```

- spyOn, mockRestore

  ```js
  function fn(impl = () => {}) {
    const mockFn = (...args) => {
      mockFn.mock.calls.push(args)
      retur impl(...args);
    }

    mockFn.mock = { calls: []}
    mcokFn.mockImplementaion = newImpl => (impl = newInpl)

    return mockFn;
  }

  function spyOn(obj, prop) {
    const origin = obj[prop];
    obj[prop] = fn(obj[prop]);
    obj[prop].mockRestore = () => {
      obj[prop] = origin;
    }
  }

  spyOn(utils, 'getWinner');
  ...
  utils.getWinner.mockRestore();
  ```

- mock a javascript module `?`

  - commonjs 모듈에서는 멍키패칭이 먹히지만 es module에서는 아니다.
  - 그래서 jest.mock 같은 것을 사용하게 된다.

  ```js
  // 모듈 시스템을 흉내 내야한다
  console.log(require.cache); // ?
  ```

> 5, 6번은 다시 보기
