# 7. Testing React Apps

## 들어가며

- [but-really-what-is-a-javascript-test](https://kentcdodds.com/blog/but-really-what-is-a-javascript-test)
- [but-really-what-is-a-javascript-mock](https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock)

## 01. Testing React Apps Welcome

## 02. Simple Test With ReactDOM

- [ ] [https://kentcdodds.com/blog/avoid-the-test-user/](https://kentcdodds.com/blog/avoid-the-test-user/)

```jsx
Notice the lack of `cleanup` functionality. That's thanks to
`@testing-library/react`'s
[auto-cleanup feature](https://testing-library.com/docs/react-testing-library/api#cleanup)

Another automatic feature of React Testing Library is its handling of
[React's `act` function](https://reactjs.org/docs/test-utils.html#act). If
you've ever seen a warning about something not being wrapped in `act`, that's
what we're talking about. As mentioned in the React docs, React Testing Library
is recommended for avoiding the issues `act` is warning you about. You can learn
more about this from my blog post
[Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning).
```

## 03. Simple Test with React Testing Library

## 04. Avoid Implementation Details

```jsx
📜 Read more about
[Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
and how to
[Avoid the Test User](https://kentcdodds.com/blog/avoid-the-test-user)

📜 Learn more about the queries built-into React Testing Library from
[the query docs](https://testing-library.com/docs/dom-testing-library/api-queries).
```

chrome devtools에 accesibility를 점검할 수 있는 도구가 있는데, 이를 이용하면 편리하겠음

## 05. Form Testing

## 06. Mocking HTTP Requests

- inlineSnapshot 이 서버의 에러 메시지를 표시하는 것을 체크하는데에 유용할 수 있다. (계속 변할 수 잇으므로 u만 프레스하면 업데이트할 수 있도록)

## 07. Mocking Browser APIs and Modules

mock을 한다는 것은 실제와 다른 부분을 하나 추가하는 것이므로 한부분에서 자신감을 잃는 것과 같다

- [ ] [https://kentcdodds.com/blog/the-merits-of-mocking](https://kentcdodds.com/blog/the-merits-of-mocking)
- [ ] [https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock](https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock)
- [ ] [https://github.com/kentcdodds/how-jest-mocking-works](https://github.com/kentcdodds/how-jest-mocking-works)

## 08. Context and Custom Render Method

## 09. Testing Custom Hooks

**#### 1. 💯 fake component**

Sometimes it's hard to write a test component without making a pretty

complicated "TestComponent." For those situations, you can try something like

this:

```javascript
const results = {};

function TestComponent(props) {
  Object.assign(results, useCustomHook());

  return null;
}

// interact with and assert on results here
```

Learn more about this approach from my blog post:

[How to test custom React hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks)
