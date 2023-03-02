import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, take } from "redux-saga/effects";
import { product } from "../../common/product/interface";
import { CartAPI } from "../../pages/api/Cart";
import { ProductHomeAPI } from "../../pages/api/productAPI/Home";
import { cartAction, cartState, itemCart, ProductSlI } from "../splice/cartSlipe";

export interface CartInfirebase {
  Cid:string;
  UserID:string;
  ItemList:{ 
    Quantity:string
    ProductID:number
  }[]
}


const callApiUser = async (uid: string) => {
  if(localStorage.getItem('cart')){
    // const Cart =await CartAPI.getCart(uid);
    const Cart = JSON.parse(localStorage.getItem("cart")||'') as CartInfirebase;

    
    if(Cart==null){
      console.log("carrt",Cart)

      return undefined
    }else {


      const list = await ProductHomeAPI.getCartlist(Cart.ItemList)

       return list
    }

  }else{
    const Cart =await CartAPI.getCart(uid);
    localStorage.setItem('cart',JSON.stringify(Cart));
    if(Cart.ItemList.length == 0){
      return undefined
    }
   const list = await ProductHomeAPI.getCartlist(Cart.ItemList)

   return list

  }

};

function* handleLogin(value: string) {
  try {
    const  resoult: any[]  = yield call(callApiUser, value);
    if (resoult) {
        yield put(cartAction.LoadingCartSucess(resoult));
    } else {
        yield put(cartAction.deleteItemFail());
    }
  } catch (error) {
    yield put(cartAction.CartLoadingFailed());
  }
}
function* whatLoginFlow() {
  while (true) {

      const acction: PayloadAction<string> = yield take(
        cartAction.LoadingCart.type
      );
      yield call(handleLogin, acction.payload);
    
    //   console.log("chay logout");
    //   yield take(authAction.logout.type);
    //   yield call(handleLogout);
    
  }
}
function* whatLoginFlow2() {
  while (true) {

      const acction: PayloadAction<itemCart> = yield take(
        cartAction.deleteCartItem.type
      );
     try {
      yield call(CartAPI.removeItem,acction.payload);
      yield put(cartAction.deleteItemSucess(acction.payload.id));
     } catch (error) {
      console.log(error);
      
      yield put(cartAction.deleteItemFail());
     }
    
    //   console.log("chay logout");  
    //   yield take(authAction.logout.type);
    //   yield call(handleLogout);
    
  }
}
export function* cartSaga() {
  yield all([call(whatLoginFlow),call(whatLoginFlow2)]);
}
