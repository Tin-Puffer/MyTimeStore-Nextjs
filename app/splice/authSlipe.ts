import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserF } from "../../common/user";
import openNotification from "../../components/Notifycation/Notification";
export interface loginState {
  userName: string;
  password: string;
}
export interface authState {
  isLogin: boolean;
  login: boolean;
  currentUser?: UserF;
}


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
    
    loginFailed(state, action: PayloadAction<string>) {
      state.login = false;
      state.isLogin = false;
      openNotification("notiifyError",action.payload)
    },
    logout(state) {
      // state.isLogin = false;
      // state.currentUser = undefined;
    },
  },
});

export const authAction = authSlice.actions;
export const authSelectLoggedIn = (state: any) => {
  return state.auth.isLogin;
};
export const authSelectLogging = (state: any) => {
  return state.auth.login;
};
export const authReducer = authSlice.reducer;
