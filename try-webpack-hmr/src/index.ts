import renderer from "./renderer";
import store from "./store";

let myStore = store;

const init = () => {
  renderer.updateNumber(myStore);
};

window.addEventListener("load", init);

if (module.hot) {
  module.hot.accept("./store", () => {
    myStore = require("./store").default;
    init();
  });
}
