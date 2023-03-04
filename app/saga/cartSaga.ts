import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, take } from "redux-saga/effects";
import { product } from "../../common/product/interface";
import { CartAPI } from "../../pages/api/Cart";
import { ProductHomeAPI } from "../../pages/api/productAPI/Home";
import { cartAction, itemCart, ProductSlI } from "../splice/cartSlipe";

export interface CartInfirebase {
  Cid:string;
  UserID:string;
  ItemList:{ 
    Quantity:number
    ProductID:string
  }[]
}

const getCartList = async (uid: string) => {
  if(localStorage.getItem('cart')){
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
    if(Cart.ItemList.length > 0){
      console.log("giá trị của getCart để chuẩn bị lặp ",Cart)
      
      const list = await ProductHomeAPI.getCartlist(Cart.ItemList)
   
      console.log("listin FB",list)
   
      return list
    }else{

      return []
    }

  }

};

function* handleGetCartList(value: string) {
  try {
    const  resoult: any[]  = yield call(getCartList, value);
    // if (resoult) {
      console.log(resoult)

        yield put(cartAction.LoadingCartSucess(resoult));
    // } else {
    //     yield put(cartAction.CartLoadingFailed());
    // }
  } catch (error) {
    yield put(cartAction.CartLoadingFailed());
  }
}

function* WhenLoadingCart() {
  while (true) {
      const acction: PayloadAction<string> = yield take(
        cartAction.LoadingCart.type
      );
      yield call(handleGetCartList, acction.payload);
  }
}
function* WhenDeleteCart() {
  while (true) {
      const acction: PayloadAction<itemCart> = yield take(
        cartAction.deleteCartItem.type
      );
     try {
      yield call(CartAPI.removeItem,acction.payload);
      yield put(cartAction.deleteItemSucess(acction.payload.id));
      // yield call (deleteItemLS,acction.payload.id)
     } catch (error) {
      console.log(error);
      
      yield put(cartAction.deleteItemFail());
     }
  }
}

function addItemLS({id,quantity}:{id:string,quantity:number}){
  const Cart = JSON.parse(localStorage.getItem("cart")||'') as CartInfirebase;
  if(Cart){
    Cart.ItemList.push({
      ProductID:id,
      Quantity:quantity
    })
    localStorage.setItem('cart',JSON.stringify(Cart));
  }
}
function* WhenAddCart() {
  while (true) {
      const acction: PayloadAction<itemCart> = yield take(
        cartAction.addCartItem.type
      );
     try {
      const cart:ProductSlI[] = yield select((state)=> state.cart.ProductSl)
      const duplicate = cart.find(item => item.Pid === acction.payload.id)
      if(duplicate)
      {

        const Cart = JSON.parse(localStorage.getItem("cart")||'') as CartInfirebase;
        let newQtt=0
        let CartID=Cart.Cid
        Cart.ItemList.forEach(item => {
          if(item.ProductID === acction.payload.id) {
            newQtt=item.Quantity+acction.payload.quantity
            item.Quantity = item.Quantity+acction.payload.quantity; 
            localStorage.setItem("cart", JSON.stringify(Cart));
          }
        });
        yield call(CartAPI.removeItem,{cartId:CartID,quantity:newQtt-acction.payload.quantity,id:acction.payload.id});
        yield call(CartAPI.addCartItem,{cartId:CartID,quantity:newQtt,id:acction.payload.id});
        yield put(cartAction.addQuantityItemSucces(acction.payload))
    
      }
      else {
        yield call(CartAPI.addCartItem,acction.payload);
        const newProduct:product= yield call(ProductHomeAPI.getDetailProduct,acction.payload.id);
        yield put(cartAction.addNewItemSucces({
          Pid: newProduct.id,
          name: newProduct.name,
          image:newProduct.image[0],
          price: newProduct.price,
          discount: newProduct.sale?.discount,
          endSale:newProduct.sale?.end,
          beginSale:newProduct.sale?.begin,
          quantity: acction.payload.quantity,
        }))
        yield call(addItemLS,{id:newProduct.id, quantity:acction.payload.quantity})
      }
      // yield put(cartAction.deleteItemSucess(acction.payload.id));
     } catch (error) {
      yield put(cartAction.deleteItemFail())
     }
  }
}
export function* cartSaga() {
  yield all([call(WhenLoadingCart),call(WhenDeleteCart),call(WhenAddCart)]);
}
