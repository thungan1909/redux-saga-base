import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";

let middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares = [...middlewares, sagaMiddleware, logger];

const middleware = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);
