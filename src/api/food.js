import { END_POINTS } from "../constants/apiUrl";
import APIUtils from "../utils/apiUtils";

const getFood = async (payload) => {
  const res = await APIUtils.get(END_POINTS.FOOD, {
    params: {
      ...payload,
    },
  });

  return res?.data || res;
};

const createFood = async (payload) => {
  const res = await APIUtils.post(END_POINTS.FOOD, {
    body: payload,
  });
  
  return res?.data || res;
};

const deleteFood = async (id, payload) => {
  const res = await APIUtils.delete(END_POINTS.FOOD + "?id=" + id, {
    params: payload,
  });
  return res;
};

const editFood = async (payload) => {
  const res = await APIUtils.put(`${END_POINTS.FOOD}?id=${payload.id}`, {
    body: payload,
  });
  return res?.data || res;
};

const FoodApi = { getFood, createFood, deleteFood, editFood };

export { FoodApi };
