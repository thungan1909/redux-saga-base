import { GET_FOOD } from "./constants";

const initialState = {
  data: [],
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOOD.SUCCESS: {
      return {
        data: action?.payload || [],
      };
    }
    default:
      return state;
  }
};

export default foodReducer;
