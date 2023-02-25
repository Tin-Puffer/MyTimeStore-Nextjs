import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { product } from "../../common/product/interface";
import { CartAPI } from "../../pages/api/Cart";
import { ProductHomeAPI } from "../../pages/api/productAPI/Home";
import { cartAction, cartState, ProductSlI } from "../splice/cartSlipe";


const callApiUser = async (uid: string) => {
    const Cart =await CartAPI.getCart(uid);
    let lisproduct:any=null
   const x=Cart.ItemList.map((item:any)=>{
    return item.ProductID
   })
    
   return  lisproduct = await ProductHomeAPI.getCartlist(x)
//     console.log("danhsach",xx)
    
//     const resoult:cartState= {Uid:uid,isLoading:true,loading:false,ProductSl:[...xx] }

//   return resoult
    
//       localStorage.setItem("cart", JSON.stringify(Cart));
//       console.log(Cart);
};

function* handleLogin(value: string) {
  try {
    const  resoult: product[]  = yield call(callApiUser, value);
    

    
    
    if (resoult) {
        yield put(cartAction.LoadingCartSucess(resoult));
        // localStorage.setItem('cart', JSON.stringify(resoult1));
    } else {
        yield put(cartAction.CartLoadingFailed());
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
export function* cartSaga() {
  yield fork(whatLoginFlow);
}
