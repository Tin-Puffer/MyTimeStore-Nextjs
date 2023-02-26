import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { product } from "../../common/product/interface";
import { Fproduct } from "../../fakeData/Fproduct";
import { auth } from "../../FireBase/config";


export interface ProductSlI {
  Pid: string;
  name: string;
  image:string;
  price: number;
discount?: number;
endSale?:string;
quantity: number;

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

function covertProductList (pr:any){
  
  const prrr=[...pr]
  const pr2=Fproduct;



  console.log("chieu dai cua pr",pr.length);
  console.log("chieu dai cua prrrr",pr2.length);

  const nnnmm:any=[]
  prrr.forEach(p=>{
    const xxx:ProductSlI= {
      Pid: p.id,
      name: p.name,
      image:p.image[0],
      price: p.price,
      discount: p.deal,
       endSale:p.endOfSale,
       quantity:1
     }
      nnnmm.push(xxx)
      console.log("chay vong lap")
      
    })
   
  console.log(nnnmm);
  
  return 1
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
    LoadingCartSucess(state,action: PayloadAction<any[]>){
      state.isLoading = false;
      state.loading = false;
      console.log(action.payload);

      // state.ProductSl = covertProductList(action.payload);

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
