import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";

import { authAction, loginState } from "../splice/authSlipe";

const callApiUser = async (imfomationLogin: loginState) => {
  // return await apiMock_1.getUser(imfomationLogin.userName).then((res) =>
  //  {
  //     return { res };
  // });
};
function* handleLogin(value: loginState) {
  try {
    // const { res }: { res: user } = yield call(callApiUser, value);
    // if (res) {
    //     yield put(authAction.loginSuccess(res));
    //     localStorage.setItem('user', JSON.stringify(res));
    //     localStorage.setItem('access_token', 'TOken');
    // } else {
    //     yield put(authAction.loginFailed('loginFailed'));
    // }
  } catch (error) {
    yield put(authAction.loginFailed("loginFailed"));
  }
}

function* handleLogout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  // yield put(autheMCAction.resetListMC());
}

function* whatLoginFlow() {
  while (true) {
    const isLogin = localStorage.getItem("access_token");
    if (!isLogin) {
      console.log("chaylogin");
      const acction: PayloadAction<loginState> = yield take(
        authAction.login.type
      );
      yield call(handleLogin, acction.payload);
    } else {
      console.log("chay logout");
      yield take(authAction.logout.type);
      yield call(handleLogout);
    }
  }
}
export function* authSaga() {
  yield fork(whatLoginFlow);
}
