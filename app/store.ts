import { configureStore, Store } from "@reduxjs/toolkit";
import creatSAGA from "redux-saga";
import rootSaga from "./rootSaga";
import { createWrapper } from "next-redux-wrapper";
import { authReducer } from "./splice/authSlipe";

const sagaMiddleware = creatSAGA();
const store = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      // authMC: authMCReducer,
      // comment: commentReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(sagaMiddleware),
  });
store();
sagaMiddleware.run(rootSaga);

export const wrapper = createWrapper(store);
