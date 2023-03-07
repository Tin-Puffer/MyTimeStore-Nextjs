import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import openNotification from "../../components/Notifycation/Notification";
import { CartInfirebase } from "../saga/cartSaga";



export interface ProductSlI {
  Pid: string;
  name: string;
  image:string;
  price: number;
  discount?: number;
  endSale?:string;
  beginSale?:string
  quantity: number;
  kho:number
}
export interface cartState {
  isLoading: boolean,
  loading: boolean,
  Cid: string;
  Userid: string;
  ProductSl: ProductSlI[];
}
export interface itemCart{
  id:string;
  quantity:number;
  cartId:string
}
const initAuthLoad = (): cartState => {
    return {
      isLoading: false,
      loading: false,
      Userid: "",
      Cid:'',
      ProductSl:[]
    };
};
function covertProductList (pr:any[]){
  const list:any=[]
  pr.forEach(p=>{
    const xxx:ProductSlI= {
      Pid: p.id,
      name: p.name,
      image:p.image[0],
      price: p.price,
      discount: p.deal,
       endSale:p.endOfSale,
       quantity:p.Quantity,
       beginSale: p.beginSale,
       kho: p.kho
     }
     list.push(xxx)
    })
  return list
}

function getcardID(){
  const cart = JSON.parse(localStorage.getItem('cart') || "") as CartInfirebase;
  return cart.Cid
}
function deleteItem(id:string,list:ProductSlI[]){
  const cart = JSON.parse(localStorage.getItem('cart') || "") as CartInfirebase;
  const newList= cart.ItemList.filter((item:any) => item.ProductID !== id);
  cart.ItemList=newList
  localStorage.setItem('cart',JSON.stringify(cart));
  return list.filter(item => item.Pid !== id)
}
function updateProductQuantity(item: itemCart, products: ProductSlI[]): ProductSlI[] {
  return products.map(product => {
    if (product.Pid === item.id) {
      return { ...product, quantity: product.quantity + item.quantity };
    }
    return product;
  });
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initAuthLoad() || {},
  reducers: {
    LoadingCart(state,action: PayloadAction<string>){
      state.loading= true,
  
      state.Userid = action.payload;
    },
    LoadingCartSucess(state,action: PayloadAction<any[]>){
      state.loading= false,

      state.ProductSl = covertProductList(action.payload);
      state.Cid=getcardID()

    },
    CartLoadingFailed(state) {
      state.ProductSl = [];

    },
    clearCart(state){
      state.isLoading= false,
      state.loading= false,
      state.ProductSl = [];
    },
    deleteCartItem(state, action: PayloadAction<itemCart>) {
      state.loading=true
    },
    deleteItemSucess(state,action: PayloadAction<string>){
      state.loading=false
      state.ProductSl = deleteItem(action.payload,state.ProductSl);;
      openNotification("DeleteItemInCart")
      
    },
    updateCart(state,action: PayloadAction<ProductSlI[]>){
      state.loading=true

    },
    updateCartSuccess(state,action: PayloadAction<ProductSlI[]>){
      state.loading=false
      state.ProductSl=action.payload
      openNotification("UdateCartSuccess")

    },
    updateCartFail(state) {
      state.loading=false
    },
    deleteItemFail(state) {
      state.loading=false
    },
    addCartItem(state,action: PayloadAction<itemCart>) {
      state.loading=true
    },
    addNewItemSucces(state,action: PayloadAction<ProductSlI>) {
      state.ProductSl.push(action.payload)
      state.loading=false
      openNotification("AddItemInCart")


   },
   addQuantityItemSucces(state,action: PayloadAction<itemCart>) {
     state.ProductSl=updateProductQuantity(action.payload,state.ProductSl);;
     state.loading=false
     openNotification("AddItemInCart",action.payload.quantity)

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
