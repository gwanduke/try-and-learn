# React Fundamentals

## ❌ 복습 및 정리

## 더 알아보기

- [ ] `.append` vs `.appendChild`
- [ ] key

## 02. Basic JS "Hellow World"

브라우저는 HTML을 읽어 DOM을 생성한다. 브라우저는 그 DOM을 JavaScript로 노출하므로 이와 상호작용이 가능해진다.

- DOM
  - [https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
  - [https://javascript.info/modifying-document#insertion-methods](https://javascript.info/modifying-document#insertion-methods)

## 03. Intro to Raw React APIs

React는 [ReactDOMComponent.js#L472](https://github.com/facebook/react/blob/fd61f7ea53989a59bc427603798bb111c852816a/packages/react-dom/src/client/ReactDOMComponent.js#L472) 를 참고해보면, 명령식의 브라우저 API를 추상화하여 보다 declarative API 하게 동작할 수 있도록 한다.

**[Imperative vs Declarative Programming](https://tylermcginnis.com/imperative-vs-declarative-programming/)**

- React: React 엘리먼트를 만드는데 책임을 가짐 (`document.createElement()` 같은)
- ReactDom: React 엘리먼트를 DOM에 그리는 책임을 가짐 (`rootElement.append()`와 같은)

## 04. Using JSX

- JSX는 실제 자바스크립트가 아니기에 Babel 컴파일러에 의해 변환된다. JSX → JavaScript
  - [Babel REPL](https://babeljs.io/repl#?builtIns=App&code_lz=MYewdgzgLgBArgSxgXhgHgCYIG4D40QAOAhmLgBICmANtSGgPRGm7rNkDqIATtRo-3wMseAFBA&presets=react&prettier=true)로 확인해보자
- 바벨도 자바스크립트 이기에, 브라우저에서 실행이 가능하며 그 때 그 때 변환이 가능하다. 그래서 다음 스크립트를 사용하면 된다.(프로덕션에서는 사용하면 안됨! why?)

  ```html
  <script src="https://unpkg.com/@babel/standalone@7.9.3/babel.js"></script>

  <!-- 대신 스크립트는 다음 구문 내에 써주어야한다. -->
  <script type="text/babel"></script>
  ```

- jsx와 html 태그 사이에는 약간 다른점이 있는데 이는 [dom-elements.html#differences-in-attributes](https://reactjs.org/docs/dom-elements.html#differences-in-attributes) 에서 확인가능
- `{something}` 식으로는 expression만 가능, statement는 불가능

JSX는 다음과 같이 변환된다.

```jsx
<div some="thing" {...props} />

// => transplies...
// React.createElement('div', _merge?({
//   some: 'thing'
// }, props));
```

## 05. Creating Custom Components

### propTypes

[typechecking-with-proptypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

다음과 같이 직접 구현할 수 있다.

```jsx
function Message({ subject, greeting }) {
  return (
    <div className="message">
      {greeting}, {subject}
    </div>
  );
}

Message.propTypes = {
  subject(props, propName, componentName) {
    if (typeof props[propName] !== "string") {
      return new Error(`${propName} should be typeof string`);
    }
  },
  greeting(props, propName, componentName) {
    if (typeof props[propName] !== "string") {
      return new Error(`${propName} should be typeof string`);
    }
  },
};
```

- 이는 development feature 임
- 프로덕션
  - 빌드과정에 propstypes를 제거하는 절차가 보통 포함되어있음
  - 또한 react production build에도 미포함되어있어 체크하지 않음

### React.createElement

- `react.createElement`를 사용하면 크롬 디버깅 툴("Components")에서 확인가능 함

## 06. Styling

- [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)

컴포넌트 구현시, 구현상세를 사용자에게 강요하지 말고 `props`로서 (size 같은) 제어하는 것이 좋다

## 07. Forms

- ref: renders 간에 일정한 객체임
  - current 프로퍼티를 가지며 이는 어느때든 어떤 값으로든 할당 가능
- Uncontrolled: 브라우저의 DOM에서 값을 관리하며 리액트에서는 이를 접근해 조회 가능
- Controlled: 리액트의 상태로서 값을 관리
  - inputNode.value = 'whatever' 로서 값을 업데이트할 수 있지만 이는 다소 명령적임
  - 그래서 value prop을 이용

### Input

```jsx
<input readOnly defaultValue="" value={value} />
```

- readOnly → onchange가 없어도 에러가 발생 하지 않음
- defaultValue는 초기값

## 08. Rendering Arrays

key가 전달되지 않으면 리액트는 아이템 추가/삭제/수정시 처음, 중간, 끝 어디에 배치해야할지 알지 못한다.
