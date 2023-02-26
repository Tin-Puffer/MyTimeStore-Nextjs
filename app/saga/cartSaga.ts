import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { product } from "../../common/product/interface";
import { CartAPI } from "../../pages/api/Cart";
import { ProductHomeAPI } from "../../pages/api/productAPI/Home";
import { cartAction, cartState, ProductSlI } from "../splice/cartSlipe";


const callApiUser = async (uid: string) => {
    const Cart =await CartAPI.getCart(uid);
 
  //  const x =Cart.ItemList.map((item:any)=>{
  //   return item.ProductID
  //  })
    
  console.log("list  cua toi",Cart);
   const list = await ProductHomeAPI.getCartlist(Cart.ItemList)

   return list
//     console.log("danhsach",xx)
    
//     const resoult:cartState= {Uid:uid,isLoading:true,loading:false,ProductSl:[...xx] }

//   return resoult
    
//       localStorage.setItem("cart", JSON.stringify(Cart));
//       console.log(Cart);
};

function* handleLogin(value: string) {
  try {
    const  resoult: any[]  = yield call(callApiUser, value);
    
    console.log("nhav",resoult);

    
    
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
