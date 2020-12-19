import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";

const sagaMiddleware = createSagaMiddleware();

const store = (initialState = {}) => {
  const s = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);

  return s;
};

export default store;
