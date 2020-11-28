import { onSnapshot } from "mobx-state-tree";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import TodoStore from "./models/TodoStore";

const localStorageKey = "mst-todo";

const initialState = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey))
  : {
      todos: [
        {
          text: "learn Mobx",
          completed: false,
          id: 0,
        },
        {
          text: "learn MST",
          completed: false,
          id: 1,
        },
      ],
    };

let snapshotListener;
function createTodoStore(snapshot) {
  if (snapshotListener) snapshotListener();

  const store = TodoStore.create(snapshot);

  snapshotListener = onSnapshot(store, (snapshot) => {
    console.log(snapshot);
    localStorage.setItem(localStorageKey, JSON.stringify(snapshot));
  });

  return store;
}

function renderApp(App, store) {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

renderApp(App, createTodoStore(initialState));
