import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { product } from "../../common/product/interface";
import { auth } from "../../FireBase/config";


export interface ProductSlI {
  Pid: string;
  name: string;
  image:string;
  price: number;
discount?: number;
endSale?:string
}
export interface cartState {
  isLoading: boolean,
  loading: boolean,
  Uid: string;
  ProductSl?: ProductSlI[];
}

const initAuthLoad = (): cartState => {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("cart")) {
      return {
        isLoading: false,
        loading: false,
        Uid:''
      };
    } else {
      const cart = JSON.parse(localStorage?.getItem("cart") || "") as cartState;
      return {
        isLoading: false,
        loading: true,
        Uid: cart.Uid,
        ProductSl: cart.ProductSl
      };
    }
  } else
    return {
      isLoading: false,
      loading: false,
      Uid:''
    };
};

function covertProductList (pr:product[]){
  console.log(pr);
  const nnnmm:ProductSlI[]=[]
  pr.forEach(p=>{
    const xxx:ProductSlI= {
      Pid: p.id,
      name: p.name,
      image:p.image[0],
      price: p.price,
    discount: p.deal,
    endSale:p.endOfSale,
    }
    nnnmm.push(xxx)
  })
  console.log(nnnmm);
  return nnnmm
}
const cartSlice = createSlice({
  name: "cart",
  initialState: initAuthLoad() || {},
  reducers: {
    LoadingCart(state,action: PayloadAction<string>){
     
      state.isLoading = true;
      state.loading = false;
      state.Uid = action.payload;
      
    },
    LoadingCartSucess(state,action: PayloadAction<product[]>){
      state.isLoading = false;
      state.loading = false;
      state.ProductSl = covertProductList(action.payload);

    },
    CartLoadingFailed(state) {
      state.isLoading= false,
      state.loading= false,
      state.Uid=''
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
export const cartAction = cartSlice.actions;

//select
// export const authSelectLoggedIn = (state: any) => {
//   return state.auth.isLogin;
// };
// export const authSelectLogging = (state: any) => {
//   return state.auth.login;
// };

// reducer
export const cartReducer = cartSlice.reducer;
