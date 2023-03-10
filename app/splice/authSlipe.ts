import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { UserF } from "../../common/user";
import openNotification from "../../components/Notifycation/Notification";
import { auth } from "../../FireBase/config";
// import { user } from '../../model/user';

export interface loginState {
  userName: string;
  password: string;
}
export interface authState {
  isLogin: boolean;
  login: boolean;
  currentUser?: UserF;
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

    return {
      isLogin: false,
      login: false,
      currentUser: undefined,
    };
};
const uprateAddressLC=(newAddress:string)=>{
  if(localStorage.getItem("auth")){

    const user = JSON.parse(localStorage.getItem("auth")||'') as UserF;
    user.address.push(newAddress)
    localStorage.setItem("auth", JSON.stringify(user))
  }
  
}
const currentAddEmail=(newEmail:string,currentUser?:UserF)=>{
  if(currentUser){
    currentUser.email=newEmail
    const user = JSON.parse(localStorage.getItem("auth")||'') as UserF;
    user.email=newEmail
    localStorage.setItem("auth", JSON.stringify(user))
    return currentUser;
  }
  else{
    return undefined
}
}

const currentAddPhone=(Phone:string,currentUser?:UserF)=>{
  if(currentUser){
    currentUser.phone=Phone
    const user = JSON.parse(localStorage.getItem("auth")||'') as UserF;
    user.phone=Phone
    localStorage.setItem("auth", JSON.stringify(user))
    return currentUser;
  }
  else{
    return undefined
}
  
}
const authSlice = createSlice({
  name: "auth",
  initialState: initAuthLoad() || {},
  reducers: {
    clearUser(state){
      state.login = false;
      state.isLogin = false;
      state.currentUser = undefined;
    },
    LoginUser(state,action: PayloadAction<string>){
      state.isLogin=true,
      state.login = true;
    },
    loginSuccess(state,action: PayloadAction<UserF>) {
      state.login = false;
      state.currentUser = action.payload;

    },
    updateAdress(state, action: PayloadAction<string>) {
      state.currentUser?.address.push(action.payload)
      uprateAddressLC(action.payload)
    },
    updateEmail(state, action: PayloadAction<string>) {
      state.currentUser= currentAddEmail(action.payload,state.currentUser)
      
    },
    updatePhone(state, action: PayloadAction<string>) {
      state.currentUser= currentAddPhone(action.payload,state.currentUser)

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
