# Build your own React

> https://pomb.us/build-your-own-react/

## 목차

- [Build your own React](#build-your-own-react)
  - [목차](#목차)
  - [시작하기](#시작하기)
  - [Step 0: Review](#step-0-review)
  - [Step I: The createElement Function](#step-i-the-createelement-function)
  - [Step II: The render Function](#step-ii-the-render-function)
  - [Step III: Concurrent Mode](#step-iii-concurrent-mode)
  - [Step IV: Fibers](#step-iv-fibers)
  - [Step V: Render and Commit Phases](#step-v-render-and-commit-phases)
  - [Step VI: Reconciliation](#step-vi-reconciliation)
  - [Step VII: Function Components](#step-vii-function-components)
  - [Step VIII: Hooks](#step-viii-hooks)
  - [끝](#끝)

## 시작하기

ReactJS를 직접 만들어보는 시간!

- 최적화 없이
- 필수적인 요소들만

## Step 0: Review

- `JSX`: Babel 등의 도구를 거쳐 `React.createElement(...)` 로 변환됨
- `render`: 리액트가 DOM을 변경시키는 곳

JSX에 의해 다음 코드는

```js
const element = <h1 title="foo">Hello</h1>;
const container = document.getElementById("root");
ReactDOM.render(element, container);
```

컨셉적으로 이렇게 변경 된다

```js
// JSX element라고 볼 수 있겠다. 실제 JSX를 변환하면
// React.createElement(tag, props, children) 식으로 표현된다.
// React의 전체 구조를 표현한 것은 아니지만
// virtual DOM은 대략 다음과 같이 생겼다.
// https://github.com/facebook/react/blob/f4cc45ce962adc9f307690e1d5cfa28a288418eb/packages/react/src/ReactElement.js#L111
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}
​
// ReactDOM.render() 부분이라고 볼 수 있겠다.​
const container = document.getElementById("root")

const node = document.createElement(element.type)
node["title"] = element.props.title

const text = document.createTextNode("")
text["nodeValue"] = element.props.children

node.appendChild(text)
container.appendChild(node)
```

## Step I: The createElement Function

다음 코드에서

```js
// Babel이 JSX를 Didact.creatElement로 트랜스파일 되도록 해준다.
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
const container = document.getElementById("root");
ReactDOM.render(element, container);
```

`element`는 다음과 같이 표현될 수 있다.

```js
const element = React.createElement(
  "div",
  { id: foo },
  React.createElement("a", {}, "bar"),
  React.createElement("b")
);
```

변환된 함수가 v-dom을 생성하도록 하자

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [], // 실제 리액트에서는 이렇게 children을 만들지 않음 (그저 단순함을 위해 이렇게 처리)
    },
  };
}

const Didact = {
  createElement,
};
```

## Step II: The render Function

```js
function render(element, container) {
  // DOM노드를 여기에 만듬
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== chlidren;
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

const Didact = {
  // ...,
  render,
};

Didact.render(element, container);
```

여기까지 처리해주면 JSX를 변환해 DOM에 정상적으로 그려준다. 물론 리액트가 자랑하
는 V-DOM Diff는 아직없지만... 😁 생각보다 그 컨셉은 간단하다. 평소 리액트를 사용
하면서 console log를 찍어보면 비슷한 프로퍼티들을 만나볼 수 있는데, 참고해서 조
금 더 분석해보면 좋곘다.

## Step III: Concurrent Mode

스텝2에서 작성한 코드가 잘 동작하지만, 재귀적으로 호출되기 때문에 전체 트리가 굉
장히 커지면 메인 스레드를 너무 오래 블락해 브라우저의 다른 작업이 중단된다. 그래
서 작업을 더 잘게 쪼개서 브라우저가 작업할 시간을 벌어주어야한다.

```js
let nextUnitOfWork = null;

/**
 * @param deadline 브라우저가 제어를 가져가기 까지 남은 시간
 */
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

// 루프를 만들기 위해 사용한다. setTimeout 같은거라고 생각할 수 있다.
// 대신 언제 실행할지를 우리가 지정하지 않고 브라우저의 메인 스레드가 idle한 시간에 실행된다.
// 리액트는 이 함수를 더이상 사용하지 않고 다음 패키지를 이용한다. (하지만 컨셉은 동일하다)
// https://github.com/facebook/react/issues/11171#issuecomment-417349573
// https://github.com/facebook/react/tree/master/packages/scheduler
requestIdleCallback(workLoop);

/**
 * work를 수행하고 다음 작업 유닛을 반환
 */
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
```

## Step IV: Fibers

작업 단위를 구성하기 위해서는 데이터 구조가 필요한데 이를 `a fiber tree`라고 한
다.

각 엘리먼트에 한개의 fiber를 가지며 각 fiber가 작업단위가 될 것이다.

예를 들어, 다음과 같은 엘리먼트 트리는 `render`에서 root fiber를 만들고 이를
`nextUnitOfWork`로 설정한다. 남은 작업은 `performUnitOfWork` 함수에서 일어나며각
fiber에서는 다음 세가지 일을 수행한다.

- 각 fiber에서 수행하는 일
  1. DOM에 엘리먼트를 추가
  2. 엘리먼트의 children을 위한 fibers를 생성
  3. 다음 작업 유닛 선택

```js
Didact.render(
  <div>
    <h1>
      <p />
      <a />
    </h1>
    <h2 />
  </div>,
  container
);
```

트리는 다음과 같이 생기게 된다. 각각 부모, 자식, 형제, 삼촌을 가진다.

```plain
  root
  ⬇ ⬆
  <div>
  ⬇ ⬆ ^\
          \
  <h1> --> <h2>
  ⬇ ⬆ ^\
          \
  <p>  --> <a>
```

fiber에서 작업 수행을 마치면 자식이 있는 경우 그 자식이 다음 작업 단위가 된다.
예를 들어 div 다음에는 h1이다.

자식이 없으면 형제가 다음 작업 단위가 된다. 예를들어 p fiber에서 자식이 없기때문
에 a로 옮겨간다.

자식과 형제 모두 없으면 삼촌으로 옮겨간다. 예에서 a나 h2 같은 것들이 여기에 해당
된다.

부모가 더이상 형제가 없으면 부모로 올라가며 계속해서 형제를 탐색하고 root까지 도
달한다. 그럼 이 render에서 모든 작업이 완료된 것이다.

코드를 작성해보자.

```js
// 이 코드를
function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
​
  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
​
  element.props.children.forEach(child =>
    render(child, dom)
  )
​
  container.appendChild(dom)
}
let nextUnitOfWork = null

// 다음과 같이 변경한다

// 나중에 DOM 노드를 만들 때 사용한다
function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)
​
  const isProperty = key => key !== "children"
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })
​
  return dom
}
​
function render(element, container) {
  // fiber 트리의 root에 nextUnitOfWork를 설정한다.
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  }
}
let nextUnitOfWork = null
```

브라우저가 준비되면 `workLoop`를 호출하고 root에서 작업을 시작한다.
`performUnitOfWork` 구현을 눈여겨 보자.

```js
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}


// 브라우저가 준비되면 시작!
requestIdleCallback(workLoop)
​
function performUnitOfWork(fiber) {
  // 1. DOM에 새로운 노드를 만든다.
  // fiber.dom 프로퍼티를 통해 이 DOM을 계속 추적한다.
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
​
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }
​
  // 2. 각 자식에 대해 새로운 fiber를 생성
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }

    // 새로운 fiber를 트리 위치에 따라, 자식이나 형제로 설정한다.
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber;
    index++;
  }

  // 3. 다음 작업 단위를 찾아 반환한다.
  // 순서는 설명했듯 자식 -> 형제 -> 삼촌 -> ... 순이다
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber;
  while(nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
```

## Step V: Render and Commit Phases

이제 다른 문제가 있는데, 새로운 노드를 각 엘리먼트가 작업될 때 마다 DOM에 추가하
고 있다. 기억하기로, 브라우저는 이 전체 트리가 완성되기 전에 인터럽트 할 수 있어
야한다. 이런 경우라면 사용자는 불완전한 UI를 보게된다. 하지만 우린 이걸 원하지않
는다.

그래서 `performUnitOfWork`에서 DOM 변화 부분을 제거해야한다.(part that mutates
the DOM) 대신에 fiber tree의 root를 추적한다. 이를 `wipRoot`라고 부르겠다. 그리
고 작업이 완료되면, 이 모든걸 commit해 DOM에 반영한다.

```js
function commitRoot() {
  // 재귀적으로 node를 DOM에 추가한다.
  commitWork(wipRoot.child)
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  wipRoot = { // HERE;
    dom: container,
    props: {
      children: [element],
    },
  }
  nextUnitOfWork = wipRoot // HERE;
}
​
let nextUnitOfWork = null
let wipRoot = null // HERE;

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
​
  // HERE;
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
​
  requestIdleCallback(workLoop)
}
```

## Step VI: Reconciliation

이제 DOM에 이 것들을 추가했지만, 노드를 업데이트하거나 삭제하는 것은 어떨까? 그
럴려면 `render` 함수에서 받은 엘리먼트들과 마지막으로 DOM에 반영한 fiber tree를
비교해야한다.

`currentRoot`라는 변수에 "마지막으로 DOM에 커밋된 fiber tree"의 레퍼런스를 저장
하자. 그리고 `alternate` 프로퍼티를 모든 fiber에 추가함으로서 이 프로퍼티가 old
fiber(이전 커밋 Phase에서 DOM에 커밋된)를 링크하도록 처리한다.

```js
function commitRoot() {
  commitWork(wipRoot.child);
  currentRoot = wipRoot; // HERE!
  wipRoot = null;
}

//...

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, // HERE!
  };
  nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let currentRoot = null; // HERE!
let wipRoot = null;
```

이제 `performUnitOfWork`에서 새로운 fiber를 만드는 부분을 추출해 새로운
`reconcileChildren` 함수로 이동하자.

```js
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  // NOTE: 여기 뭔가 더 있어야하지 않나?
​
  const elements = fiber.props.children // NEW!
  reconcileChildren(fiber, elements) // NEW!
​
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function reconcileChildren(wipFiber, elements) {
  let index = 0
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child; // NEW!
  let prevSibling = null
​
  while (index < elements.length || oldFiber != null) { // NEW!
    const element = elements[index]
​
  let newFiber = null;
    // const newFiber = {
    //   type: element.type,
    //   props: element.props,
    //   parent: wipFiber,
    //   dom: null,
    // }

    // TODO: oldFiber 와 엘리먼트를 비교

    const sameType =
      oldFiber &&
      element &&
      element.type == oldFiber.type
​
    if (sameType) {
      // 노드를 업데이트 한다.
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      }
    }

    if (element && !sameType) {
      // 이 노드를 추가한다.
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      }
    }

    if (oldFiber && !sameType) {
      // oldFiber의 node를 삭제한다
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
​
    if (index === 0) {
      wipFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
​
    prevSibling = newFiber
    index++
  }
}
```

`reconcileChildren` 함수에서 배열과 linked list를 동시간에 iterate하는 보일러플
레이트 코드를 무시하면, `oldFiber`와 `element`가 남습니다. `element`는 DOM에 그
리려고 하는 것이고, `oldFiber`는 지난 시간에 그렸던 것이다.

DOM에 반영할 것이 있는지 알아보기 위해 이 두가지를 비교해야한다. 우리는 type으로
비교한다.

- old fiber와 새로운 엘리먼트가 같은 타입을 가지고 있다면, DOM 노드를 그대로 두
  고 새로운 props만 업데이트
- 타입이 다르고 새로운 엘리먼트가 있다면, 새로운 DOM 노드를 만들어야함을 의미
- 타입이 다르고 old fiber가 있다면, old node를 제거해야함을 의미

여기서 리액트는 `key`를 사용하는데, 이는 좀 더 나은 비교를 한다. 예를 들어
element array에서 자식이 변경되었는지 확인한다.

old fiber와 엘리먼트가 같은 타입을 가지면, 새로운 fiber를 만들고 DOM node를 유지
한다. old fiber로 부터 그리고 그리고 element로 부터 props를. 그리고 또한 새로운
프로퍼티를 fiber에 추가해야한다: `effectTag`. 이 프로퍼티를 나중에 커밋페이즈에
사용할 것이다.

새로운 DOM 노드가 필요한 엘리먼트는 새로운 fiber를 `PLACEMENT` 이펙트 태그로 표
시한다.

그리고 노드를 삭제해야하는 곳에서는 새로운 fiver가 필요없다. 그래서 old fiver에
effect tag만 추가해주면 된다. 하지만 fiber tree를 DOM에 커밋한다., old fibers를
가지고 있지 않은 WIProot로부터. 그래서 우리가 삭제하길 원하는 노드를 가진 array
를 추가하고 추적해야한다.

```js
function commitRoot() {
  deletions.forEach(commitWork) //
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  }
  deletions = [] //
  nextUnitOfWork = wipRoot
}
​
let nextUnitOfWork = null
let currentRoot = null
let wipRoot = null
let deletions = null //
```

그리고 나면, DOM에 변경사항을 반영할 때 이 배열에 있는 fiber들을 사용한다.
`effectTags`를 처리하기 위해 `commitWork`를 변경하자.

```js
// old fiber와 new fiber의 props를 비교하고 사라진 props를 제거합니다.
// 그리고 새로운 props나 변경된 props를 추가합니다.
const isEvent = key => key.startsWith("on") // 이벤트는 특별하게 취급함
const isProperty = key =>
  key !== "children" && !isEvent(key)
const isNew = (prev, next) => key =>
  prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })
​
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })

}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;

  // effectTag가 PLACEMENT라면 이전과 동일한 동작을 한다 (추가)
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    // UPDATE 라면 존재하는 DOM 노드를 변경된 props로 업데이트한다.
    // 이는 updateDom 함수에서 수행할 것이다.
    fiber.effectTag === "UPDATE" && fiber.dom != null;
  } else if (fiber.effectTag === "DELETION") {
    // DELETION 이라면 반대로 자식을 삭제한다.
    domParent.removeChild(fiber.dom);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
```

## Step VII: Function Components

다음은 함수형 컴포넌트를 지원해볼 것인데, 먼저 예제를 변경해보자

```js
/** @jsx Didact.createElement */
function App(props) {
  return <h1>Hi {props.name}</h1>;
}
const element = <App name="foo" />;
const container = document.getElementById("root");
Didact.render(element, container);

// js로 변환되면 다음과 같다
function App(props) {
  return Didact.createElement("h1", null, "Hi ", props.name);
}
const element = Didact.createElement(App, {
  name: "foo",
});
```

함수형 컴포넌트는 두가지가 다른데,

1. 함수형 컴포넌트의 fiber는 DOM node를 가지고 있지 않다.
2. 함수 실행 으로 부터 오는 children 대신에 props로 부터 바로 받는다.

```js
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
​
  const elements = fiber.props.children
  reconcileChildren(fiber, elements)
​//...
```

만약 fiber 타입이 함수라면, 그리고 이에 의존해 다른 업데이트 함수로 갈것이다.
`updateHostComponent`에서 이전에 했던 것처럼 할 것이다.

```js

function performUnitOfWork(fiber) {
  const isFunctionComponent =
    fiber.type instanceof Function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
​
function updateFunctionComponent(fiber) {
  // 여기서 children을 받기위해 함수를 실행한다.
  // fiber.type은 App 함수이고 이를 실행했을 때, h1 엘리먼트를 반환한다.
  // 일단 children을 가지면, reconcilation은 동일한 방식으로 진행된다.
  // 여기서 다른 것을 이제 변경할 필요가 없다.
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
​
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  reconcileChildren(fiber, fiber.props.children)
}
```

그런데 `commitWork` 함수는 변경해주어야한다. 우리는 지금 DOM node가 없는 fibers
를 가지고 있는데, 다음 두가지를 변경해주어야한다.

1. DOM node에서 부모를 찾기 위해서, fiber tree를 따라 DOM Node가 있는 fiber를 만
   날때 까지 따라 올라간다.
2. Node를 삭제할 때 DOM노드를 가진 자식을 만날 때 까지 내려가야한다.

```js

function commitWork(fiber) {
  if (!fiber) {
    return
  }
​
  // HERE;
  let domParentFiber = fiber.parent
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom
​
  if (
    fiber.effectTag === "PLACEMENT" &&
    fiber.dom != null
  ) {
    domParent.appendChild(fiber.dom) // HERE;
  } else if (
    fiber.effectTag === "UPDATE" &&
    fiber.dom != null
  ) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  } else if (fiber.effectTag === "DELETION") {
    // domParent.removeChild(fiber.dom)
    commitDeletion(fiber, domParent)
  }
​
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}


// HERE;
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}
```

## Step VIII: Hooks

마지막!

함수형 컴포넌트를 만들고 상태를 추가해보자.

```js
/** @jsx Didact.createElement */
function Counter() {
  const [state, setState] = Didact.useState(1); // 주목
  return <h1 onClick={() => setState((c) => c + 1)}>Count: {state}</h1>;
}
const element = <Counter />;
const container = document.getElementById("root");
Didact.render(element, container);
```

함수형 컴포넌트를 호출하기 전에 전역 변수를 설정하고, 이를 useState 함수내에서사
용할 수 있어야한다.

먼저 wip fiber를 설정한다.

동일 컴포넌트에서 `useState`가 몇번이고 호출 되는 것을 돕기위해 `hooks` 배열을
fiber에 추가하고 current hook index를 추적한다.

함수형 컴포넌트가 `useState`를 호출하면, old hook이 있는지 먼저 검사한다. hook
index를 이용해 fiber의 `alternate`를 확인한다.

만약 old hook이 있으면, old hook에서 new hook으로 상태를 복사한다. (상태를 초기
화 하지 않았다면)

그리고 new hook을 fiber에 추가한다. hook index를 하나 올리고 state를 리턴한다.

```js
let wipFiber = null // Added;
let hookIndex = null // Added;
​
function updateFunctionComponent(fiber) {
  wipFiber = fiber // Added;
  hookIndex = 0 // Added;
  wipFiber.hooks = [] // Added;

  const children = [fiber.type(fiber.props)] // Modified;
  reconcileChildren(fiber, children)
}
​
function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex]
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  }

  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    hook.state = action(hook.state)
  })
​
​
  const setState = action => {
    hook.queue.push(action)
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }
​
  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state, setState]
}
```

`useState`는 상태를 업데이트하기 위해 함수를 반환해야한다. 그래서 우리는 액션을
받는 `setState` 함수를 정의한다. (COunter 예제에서 이 액션은 상태를 1 증가시키는
함수이다). 우리는 훅에 추가된 큐에 큐에 액션을 푸시한다. 그리고 나서 render 함수
에 했던 것과 비슷한 것을 하는데, 새로운 작업을 다음 유닛으로서 wiproot에 세팅하
고 work loop가 새로운 렌더 페이즈를 시작할 수 있도록 한다.

아직 액션을 추가해주지 않았는데, 우리는 이를 다음 컴포넌트 렌더링시에 한다. old
hook queue로 부터 모든 액션을 가져오고나서 새로운 hook state에 하나씩 적용한다.
그래서 상태를 반환했을 때 그것은 업데이트 도이ㅓ있다.

## 끝

- https://codesandbox.io/s/didact-8-21ost
- https://github.com/pomber/didact

후아 힘들었다.
