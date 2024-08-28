import { CREATE_PAYMENT, GET_PAYMENT } from "./constants";

export const getPaymentHandle = (payload, onSuccess, onFailed) => ({
    type: GET_PAYMENT.HANDLER,
    payload,
    onSuccess,
    onFailed,
});

export const getPaymentSuccess = (payload) => ({
    type: GET_PAYMENT.SUCCESS,
    payload,
})

export const getPaymentFailed = (error) => ({
    type: GET_PAYMENT.FAIL,
    error,
})

export const createPaymentHandle = (payload, onSuccess, onFailed) => ({
    type: CREATE_PAYMENT.HANDLER,
    payload,
    onSuccess,
    onFailed,
});

export const createPaymentSuccess = (payload) => ({
    type: CREATE_PAYMENT.SUCCESS,
    payload,
})

export const createPaymentFailed = (error) => ({
    type: CREATE_PAYMENT.FAIL,
    error,
})