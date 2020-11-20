import Store from "./store";

const renderer = {
  updateNumber: (store: typeof Store) => {
    const number: HTMLElement = document.getElementById("number");
    number.innerHTML = String(store.number);
  },
};

export default renderer;
