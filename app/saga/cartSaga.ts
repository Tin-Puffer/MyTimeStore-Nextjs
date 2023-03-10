import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, take } from "redux-saga/effects";
import { product } from "../../common/product/interface";
import { CartAPI } from "../../pages/api/Cart";
import { ProductHomeAPI } from "../../pages/api/productAPI/Home";
import { cartAction, itemCart, oderNow, ProductSlI } from "../splice/cartSlipe";
import { LocalAPI } from "../../pages/api/provincesAPI/Local";
import { UserAPI } from "../../pages/api/userAPI/user";
import { authAction } from "../splice/authSlipe";
import { UserF } from "../../common/user";


export interface CartInfirebase {
  Cid:string;
  UserID:string;
  ItemList:ItemList[]
}
export interface ItemList{
  Quantity:number
  ProductID:string

}
export interface ItemOder  extends ItemList{
  Price:number
  Name:string
  Image:string
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
function* WhenOdernow() {
  while (true) {
      const acction: PayloadAction<oderNow> = yield take(
        cartAction.oderNow.type
      );
     try {
      const  resoult:string[] =  yield call(LocalAPI.getAddressAll,
        acction.payload.province,acction.payload.districts,acction.payload.wards)
        const now = new Date();
      const address= resoult? acction.payload.adress +" "+ resoult : acction.payload.Address; 
        yield call(CartAPI.oderNow,acction.payload.ItemList,acction.payload.Total,
          address,now.toLocaleString(),acction.payload.Email,
          acction.payload.PhoneNumber,acction.payload.uid
          ,acction.payload.voucher,acction.payload.discount,acction.payload.note);
          if(acction.payload.Address=="NewAddress"){
            console.log("chay add")
            yield call(UserAPI.updateAddressUser,acction.payload.uid,address)
            yield put(authAction.updateAdress(address));
          }
        const userInfor:UserF = yield select((state)=> state.auth.currentUser)
        const cartID:string = yield select((state)=> state.cart.Cid)

        if(!userInfor.phone){
          yield call(UserAPI.updatePhoneNumber,acction.payload.uid,acction.payload.PhoneNumber)
            yield put(authAction.updateEmail(acction.payload.PhoneNumber));
        }
        if(!userInfor.email){
          yield call(UserAPI.updateEmail,acction.payload.uid,acction.payload.Email)
            yield put(authAction.updatePhone(acction.payload.Email));
        }

      yield call(CartAPI.oderSuccess,cartID)
      yield put(cartAction.oderSuccess)

     } catch (error) {
      console.log(error);
      
      yield put(cartAction.deleteItemFail());
     }
  }
}
function* WhenUpdateCart() {
  while (true) {
      const acction: PayloadAction<ProductSlI[]> = yield take(
        cartAction.updateCart.type
      );
     try {
      // const cartID:string = yield select((state)=> state.cart.Cid)
      const Cart = JSON.parse(localStorage.getItem("cart")||'') as CartInfirebase;

      const list = acction.payload.map(item => { return {
        ProductID:item.Pid,
        Quantity:item.quantity
      }})
      Cart.ItemList=list
      localStorage.setItem("cart", JSON.stringify(Cart));

      yield call(CartAPI.updateCart,list,Cart.Cid);
      yield put(cartAction.updateCartSuccess(acction.payload));
     } catch (error) {
      console.log(error);
      
      yield put(cartAction.updateCartFail());
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
          kho:newProduct.kho
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
  yield all([call(WhenLoadingCart),
    call(WhenDeleteCart),
    call(WhenAddCart),
    call(WhenUpdateCart),
    call(WhenOdernow)
  ]);
}
