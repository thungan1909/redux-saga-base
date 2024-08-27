import { CREATE_FOOD, GET_FOOD } from "./constants";

export const getFoodHandle = (payload, onSuccess, onFailed) => ({
  type: GET_FOOD.HANDLER,
  payload,
  onSuccess,
  onFailed,
});
export const getFoodSuccess = (payload) => ({
  type: GET_FOOD.SUCCESS,
  payload,
});
export const getFoodFailed = (error) => ({
  type: GET_FOOD.FAIL,
  error,
});

export const createFoodHandle = (payload, onSuccess, onFailed) => ({
  type: CREATE_FOOD.HANDLER,
  payload,
  onSuccess,
  onFailed,
});

export const createFoodSuccess = (payload) => ({
  type: CREATE_FOOD.SUCCESS,
  payload,
});

export const createFoodFailed = (error) => ({
  type: CREATE_FOOD.FAIL,
  error,
});
