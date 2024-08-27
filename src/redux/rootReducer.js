import { combineReducers } from "redux";
import foodReducer from "./food/reducer";
import loadingReducer from "./loading/reducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  foods: foodReducer,
  // ...
});

export default rootReducer;
