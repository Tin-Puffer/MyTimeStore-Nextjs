import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartInfirebase, ItemOder } from "../saga/cartSaga";
import openNotification from "../../components/Notifycation/Notification";
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
  oder:number
  Cid: string;
  Userid: string;
  ProductSl: ProductSlI[];
}
export interface itemCart{
  id:string;
  quantity:number;
  cartId:string;
}
export interface oderNow{
  ItemList:ItemOder[]
  Total:number;
  Address:string,
  province?:number
  Email:string,
  districts?:number
  PhoneNumber:string
  wards?:number
  name:string
  adress:string
  note?:string
  uid:string
  voucher?:string
  discount?:number,
  
  
}
const initCart = (): cartState => {
    return {
      isLoading: false,
      oder:0,
      loading: false,
      Userid: "",
      Cid:'',
      ProductSl:[]
    };
};
export function covertProductList (pr:any[]){
  const list:any=[]
  pr.forEach(p=>{
    const xxx:ProductSlI= {
      Pid: p.id,
      name: p.name,
      image:p.image[0],
      price: p.price,
      discount: p.sale?.discount|| undefined,
       endSale:p.sale?.end ||undefined,
       quantity:p.Quantity||1,
       beginSale: p.sale?.begin||undefined,
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
  initialState: initCart() || {},
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
    oderSuccess(state){
      state.loading=false
      state.ProductSl = [];
      const cart={Cid:state.Cid,
        UserID:state.Userid,
        ItemList:[]}
      localStorage.setItem('cart',JSON.stringify(cart));
      state.oder=2

    },
    oderFail(state) {
      state.loading=false
      state.oder=3
    },
    resetOder(state) {
      state.oder=0
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
    oderNow(state,action: PayloadAction<oderNow>) {
      state.loading=true
      state.oder=1
    },
    addNewItemSucces(state,action: PayloadAction<ProductSlI>) {
      state.ProductSl.push(action.payload)
      state.loading=false
      openNotification("AddItemInCart")
   },
   addQuantityItemSucces(state,action: PayloadAction<itemCart>) {
     state.ProductSl=updateProductQuantity(action.payload,state.ProductSl);;
     state.loading=false
     
     openNotification("AddItemInCart","",action.payload.quantity)

  },
  },
});

export const cartAction = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
