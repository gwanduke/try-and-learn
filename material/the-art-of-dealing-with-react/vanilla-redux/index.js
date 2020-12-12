import { createStore } from "redux";

const togglerDiv = document.querySelector(".toggle");
const counterH1 = document.querySelector("h1");

const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");

const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (diff) => ({ type: INCREASE, diff });
const decrease = () => ({ type: DECREASE });

const initialState = {
  toggle: false,
  counter: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.diff,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const render = () => {
  const state = store.getState();

  if (state.toggle) {
    togglerDiv.classList.add("active");
  } else {
    togglerDiv.classList.remove("active");
  }

  counterH1.innerText = state.counter;
};
render();

store.subscribe(render);

togglerDiv.onclick = () => {
  store.dispatch(toggleSwitch());
};

increaseBtn.onclick = () => {
  store.dispatch(increase(1));
};

decreaseBtn.onclick = () => {
  store.dispatch(decrease());
};
