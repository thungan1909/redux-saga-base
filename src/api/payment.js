import { END_POINTS } from "../constants/apiUrl"
import APIUtils from "../utils/apiUtils"

const getPayment = async(payload) => {
    const res = await APIUtils.get(END_POINTS.PAYMENT, {
        params: {
            ...payload
        }
    });

    return res?.data || res;
}


const createPayment = async (payload) => {
    const res = await APIUtils.post(END_POINTS.PAYMENT, {
      body: payload,
    });
    
    return res?.data || res;
  };

const PaymentApi = {getPayment, createPayment};

export {PaymentApi};