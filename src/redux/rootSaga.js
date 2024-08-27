import { all, fork } from "redux-saga/effects";
import food from "./food/sagas";

export default function* rootSaga() {
  yield all([
    fork(food),
    // ...
  ]);
}
