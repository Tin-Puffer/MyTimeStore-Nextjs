import { Action, configureStore, Store, ThunkAction } from "@reduxjs/toolkit";
import creatSAGA from "redux-saga";
import rootSaga from "./rootSaga";
import { createWrapper } from "next-redux-wrapper";
import { authReducer } from "./splice/authSlipe";

const sagaMiddleware = creatSAGA();
export const store =
  configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(sagaMiddleware),
  });

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
