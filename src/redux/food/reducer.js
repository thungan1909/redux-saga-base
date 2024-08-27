import { CREATE_FOOD, GET_FOOD } from "./constants";

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
    
    case GET_FOOD.FAIL: {
      return {
        data: null,
      };
    }
    
    case CREATE_FOOD.SUCCESS: {
      return state
    }

    default:
      return state;
  }
};

export default foodReducer;
