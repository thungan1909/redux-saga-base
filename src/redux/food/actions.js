import { GET_FOOD } from "./constants";

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
  type: GET_FOOD.FAILURE,
  error,
});
