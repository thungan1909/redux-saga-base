import { CREATE_PAYMENT, GET_PAYMENT } from "./constants";

const initialState = {
    data: []
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYMENT.SUCCESS: {
            return {
                data: action?.payload || []
            };
        }
        case CREATE_PAYMENT.SUCCESS: {
            return state;
          }
      
        default: 
            return state;
    }
}

export default paymentReducer;