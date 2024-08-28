import { combineReducers } from "redux";
import foodReducer from "./food/reducer";
import loadingReducer from "./loading/reducer";
import paymentReducer from "./payment/reducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  foods: foodReducer,
  payments: paymentReducer,
  // ...
});

export default rootReducer;
