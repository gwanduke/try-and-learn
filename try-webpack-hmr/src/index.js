import renderer from "./renderer";
import store from "./store";

const init = () => {
  renderer.updateNumber(store);
};

window.addEventListener("load", init);

if (module.hot) {
  module.hot.accept("./store", () => {
    init();
  });
}
