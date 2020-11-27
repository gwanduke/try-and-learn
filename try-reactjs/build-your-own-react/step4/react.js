//------------------- React -------------------//
//                                             //
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
      children: [],
    },
  };
}

function createDom(fiber) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  return dom;
}

/**
 * nextUnitOfWork에 fiber tree의 root를 할당
 * @param {*} element
 * @param {*} container
 */
function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

let nextUnitOfWork = null;

/**
 * 브라우저 idle 상태에 돌아갈 작업
 * @param {*} deadline
 */
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  window.requestIdleCallback(workLoop);
}

/**
 * https://developer.mozilla.org/ko/docs/Web/API/Window/requestIdleCallback
 * 브라우저의 idle 상태에 호출될 함수를 대기열에 넣습니다.
 * 이를 통해 개발자는 애니메이션 및 입력 응답과 같은 대기
 * 시간이 중요한 이벤트에 영향을 미치지 않고 메인 이벤트 루프에서
 * 백그라운드 및 우선 순위가 낮은 작업을 수행 할 수 있습니다
 */
window.requestIdleCallback(workLoop);

/**
 * 작업 단위를 수행하고 다음 작업 단위를 반환
 * 작업 단위를 조직하려면 fiber tree라는 데이터 구조가 필요하다
 * 각 엘리먼트마다 fiber가 존재하고, 각 fiber가 작업 단위가 된다
 *
 * fiber == 작업 단위
 *
 * 각 fiber에서는 다음 작업을 수행한다.
 *   1. DOM에 element를 추가한다. -> 각 fiber.dom에 추가 해둠
 *   2. element의 children들의 fiber를 생성한다.
 *   3. 다음 작업 단위를 선택한다.
 *
 * fiber tree 구조의 목적: 다음 작업 유닛을 쉽게 찾기 위함
 **/
function performUnitOfWork(fiber) {
  /**
   * fiber의 구조
   *
   *  {
   *    type: '...',
   *    props: {
   *      children: []
   *    }
   *    dom: ...,
   *    parent: ...,
   *  }
   */

  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

const Myact = {
  createElement,
  render,
};

//-------------------- App --------------------//
//                                             //
/** @jsx Myact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById("root");
Myact.render(element, container);
