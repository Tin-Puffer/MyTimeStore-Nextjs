import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { auth } from "../../FireBase/config";
// import { user } from '../../model/user';

export interface loginState {
  userName: string;
  password: string;
}
export interface authState {
  isLogin: boolean;
  login?: boolean;
  currentUser?: string;
}
//  auth.onAuthStateChanged((user) => {
//     if (user) {
//       console.log(" id: ", user.uid);
//       console.log(" email: ", user.email);
//       console.log(" name: ", user.displayName);
//       console.log(" img: ", user.photoURL);
//     }
//   });

const initAuthLoad = (): authState => {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("access_token")) {
      return {
        isLogin: false,
        login: false,
        currentUser: undefined,
      };
    } else {
      // const local = JSON.parse(localStorage?.getItem("user") || "") as string;
      return {
        isLogin: true,
        login: false,
        // currentUser: local,
      };
    }
  } else
    return {
      isLogin: false,
      login: false,
      currentUser: undefined,
    };
};

const authSlice = createSlice({
  name: "auth",
  initialState: initAuthLoad() || {},
  reducers: {
    login(state) {
      // state.login = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      // state.login = false;
      // state.isLogin = true;
      // state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<String>) {
      // state.login = false;
      // state.isLogin = false;
    },
    logout(state) {
      // state.isLogin = false;
      // state.currentUser = undefined;
    },
  },
});
//action
export const authAction = authSlice.actions;

//select
export const authSelectLoggedIn = (state: any) => {
  return state.auth.isLogin;
};
export const authSelectLogging = (state: any) => {
  return state.auth.login;
};

// reducer
export const authReducer = authSlice.reducer;
