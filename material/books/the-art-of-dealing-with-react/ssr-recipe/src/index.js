import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import createStore from "./createStore";

import { loadableReady } from "@loadable/component";

const store = createStore(window.__PRELOADED_STATE__);

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

const root = document.getElementById("root");

if (process.env.NODE_ENV === "production") {
  loadableReady(() => {
    ReactDOM.hydrate(
      <React.StrictMode>
        <Root />
      </React.StrictMode>,
      root
    );
  });
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    root
  );
}
