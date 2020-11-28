import "./index.css";

import Binder from "./binder";
import Binding from "./binding";

Binder.setScope({
  name: "John",
  surname: "Doe",
});
Binder.redefine();

const els = document.querySelectorAll("[data-bind]");
els.forEach((el) => {
  const expressionParts = el.getAttribute("data-bind").split(":");
  const bindingHandler = expressionParts[0].trim();
  const scopeKey = expressionParts[1].trim() as "name" | "surname";
  const binding = new Binding(scopeKey, bindingHandler, el);
  binding.bind();
});

// webpack-dev-server: Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
