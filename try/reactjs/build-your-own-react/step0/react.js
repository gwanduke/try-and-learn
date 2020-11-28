const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
};

const container = document.getElementById("root");

const h1 = document.createElement(element.type);
h1["title"] = element.props.title;

const textNode = document.createTextNode("");
textNode["nodeValue"] = element.props.children;

h1.appendChild(textNode);
container.appendChild(h1);
