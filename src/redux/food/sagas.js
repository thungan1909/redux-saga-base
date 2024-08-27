import { fork, put, takeLatest } from "redux-saga/effects";
import { getFoodFailed, getFoodSuccess } from "./actions";
import { GET_FOOD } from "./constants";
import { callApi } from "../../utils/helper/callApi";
import { FoodApi } from "../../api/food";

function* getFoodSaga(obj) {
  const { payload, onSuccess, onFailed } = obj;
  try {
    const res = yield callApi(FoodApi.getFood, payload);

    if (res) {
      onSuccess?.(res);
      yield put(getFoodSuccess(res));
    } else {
      onFailed?.(res);
      yield put(getFoodFailed(res));
    }
  } catch (err) {
    onFailed?.(err);
    yield put(getFoodFailed(err));
  }
}

function* watchUser() {
  yield takeLatest(GET_FOOD.HANDLER, getFoodSaga);
  // yield takeLatest(CREATE_FOOD.HANDLER, createFoodSaga);
  // upadte/delete ....
}

export default function* rootChild() {
  yield fork(watchUser);
}
