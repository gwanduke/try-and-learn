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

/**
 * VDOM을 파싱해 DOM Node를 만든다
 * @param {*} element
 * @param {*} container
 */
function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  element.props.children.forEach((child) => render(child, dom));

  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  container.appendChild(dom);
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
 **/
function performUnitOfWork(nextUnitOfWork) {}

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
