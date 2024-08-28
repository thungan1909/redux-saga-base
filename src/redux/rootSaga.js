import { all, fork } from "redux-saga/effects";
import food from "./food/sagas";
import payment from "./payment/sagas";

export default function* rootSaga() {
  yield all([
    fork(food), fork(payment)
    // ...
  ]);
}
