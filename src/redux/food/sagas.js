import { fork, put, takeLatest } from "redux-saga/effects";
import { createFoodFailed, createFoodSuccess, getFoodFailed, getFoodHandle, getFoodSuccess } from "./actions";
import { CREATE_FOOD, GET_FOOD } from "./constants";
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

function* createFoodSaga(obj) {
  const { payload, onSuccess, onFailed } = obj;

  try {
    const res = yield callApi(FoodApi.createFood, payload)
    if (res) {
      onSuccess?.(res);
      yield put(getFoodHandle())
      yield put(createFoodSuccess(res))
    } else {
      onFailed?.(res);
      yield put(createFoodFailed(res));
    }
  } catch (error) {
    onFailed?.(error);
    yield put(createFoodFailed(error));
  }
}

function* watchUser() {

  yield takeLatest(GET_FOOD.HANDLER, getFoodSaga);
  yield takeLatest(CREATE_FOOD.HANDLER, createFoodSaga)
  // yield takeLatest(CREATE_FOOD.HANDLER, createFoodSaga);
  // upadte/delete ....
}

export default function* rootChild() {
  yield fork(watchUser);
}
