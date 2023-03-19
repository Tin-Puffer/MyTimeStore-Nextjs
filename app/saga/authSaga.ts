import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { UserF } from "../../common/user";
import { UserAPI } from "../../pages/api/userAPI/user";
import { authAction } from "../splice/authSlipe";

const callApiUser = async (Uid: string) => {
  if(localStorage.getItem("auth")){
    const user = JSON.parse(localStorage.getItem("auth")||'') as UserF;
    return user;
  }else{  
        console.log("callApiUser load data");
        const userData= await UserAPI.getUser(Uid);
        localStorage.setItem("auth", JSON.stringify(userData))
        return userData;
    
  }
};
function* handleLogin(Uid: string) {
  try {
      const  resoult: UserF  = yield call(callApiUser, Uid); 
      yield put(authAction.loginSuccess(resoult));
    
  } catch (error) {
    yield put(authAction.loginFailed("loginFailed"));
  }
}

function* whatLoginFlow() {
  while (true) {
      const acction: PayloadAction<string> = yield take(
        authAction.LoginUser.type
      );
      yield call(handleLogin, acction.payload);
  }
}
export function* authSaga() {
  yield fork(whatLoginFlow);
}
