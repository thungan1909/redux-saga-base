import { fork, put, takeLatest } from "redux-saga/effects";
import { PaymentApi } from "../../api/payment";
import { callApi } from "../../utils/helper/callApi";
import { createPaymentFailed, createPaymentSuccess, getPaymentFailed, getPaymentSuccess } from "./actions";
import { CREATE_PAYMENT, GET_PAYMENT } from "./constants";

function* getPaymentSaga(obj) {
    const { payload, onSuccess, onFailed } = obj;
    try {
        const res = yield callApi(PaymentApi.getPayment, payload);

        if (res) {
            onSuccess?.(res);
            yield put(getPaymentSuccess(res))
        }
        else {
            onFailed?.(res);
            yield put(getPaymentFailed(res));
        }
    }
    catch (err) {
        onFailed?.(err);
        yield put(getPaymentFailed(err))
    }
}



function* createPaymentSaga(obj) {
    const { payload, onSuccess, onFailed } = obj;
    try {
        const res = yield callApi(PaymentApi.createPayment, payload);

        if (res) {
            onSuccess?.(res);
            yield put(createPaymentSuccess(res))
        }
        else {
            onFailed?.(res);
            yield put(createPaymentFailed(res));
        }
    }
    catch (err) {
        onFailed?.(err);
        yield put(createPaymentFailed(err))
    }
}

function* watchUser() {
    yield takeLatest(GET_PAYMENT.HANDLER, getPaymentSaga);
    yield takeLatest(CREATE_PAYMENT.HANDLER, createPaymentSaga);
}

export default function* rootChild() {
    yield fork(watchUser);
}