import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter from "./counter_thunk";
import { counterSaga } from "./counter";
import sample from "./sample";
import loading from "./loading";

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export function* rootSaga() {
  // all 은 여러 사가를 합쳐주는 역할
  yield all([counterSaga()]);
}

export default rootReducer;
