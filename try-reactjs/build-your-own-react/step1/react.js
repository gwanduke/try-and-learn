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

const Myact = {
  createElement,
};

/** @jsx Myact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById("root");
container.innerHTML = `<pre>${JSON.stringify(element, null, 2)}</pre>`;
// ReactDOM.render(element, container);
