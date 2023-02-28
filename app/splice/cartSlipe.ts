import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartInfirebase } from "../saga/cartSaga";



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
  Cid: string;
  Userid: string;
  ProductSl: ProductSlI[];
}



const initAuthLoad = (): cartState => {
  // if (typeof window !== "undefined") {
  //   if (!localStorage.getItem("cart")) {
  //     return {
  //       isLoading: false,
  //       loading: false,
  //       Cid:'',
  //       ProductSl:[]
  //     };
  //   } else {
  //     const cart = JSON.parse(localStorage?.getItem("cart") || "") as cartState;
  //     return {
  //       isLoading: false,
  //       loading: true,
  //       Cid: cart.Uid,
  //       ProductSl: cart.ProductSl
  //     };
  //   }
  // } else
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
       quantity:p.Quantity
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
  localStorage.removeItem('cart')
  return list.filter(item => item.Pid !== id)
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initAuthLoad() || {},
  reducers: {
    LoadingCart(state,action: PayloadAction<string>){
      state.isLoading = true;
      state.loading = false;
      state.Userid = action.payload;
    },
    LoadingCartSucess(state,action: PayloadAction<any[]>){
      state.isLoading = false;
      state.loading = true;
      state.ProductSl = covertProductList(action.payload);
      state.Cid=getcardID()

    },
    CartLoadingFailed(state) {
      state.isLoading= false,
      state.loading= true,
      state.ProductSl = [];

    },
    clearCart(state){
      state.isLoading= false,
      state.loading= false,
      state.ProductSl = [];
    },
    deleteItem(state,action: PayloadAction<string>){
      state.ProductSl = deleteItem(action.payload,state.ProductSl);;
      
      
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
