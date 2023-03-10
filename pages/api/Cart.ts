

import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs,query, updateDoc, where } from "firebase/firestore";
import { ItemList, ItemOder } from "../../app/saga/cartSaga";
import { itemCart, ProductSlI } from "../../app/splice/cartSlipe";
import { db, dbBlog } from "../../FireBase/config";
const User = collection(db, "Cart");
export const CartAPI = {
  removeItem: async (item:itemCart) => {
    const washingtonRef =  doc(db, "Cart", item.cartId);
    await updateDoc(washingtonRef, {
      ItemList: arrayRemove({ProductID:item.id,Quantity:item.quantity})
    })
  },
  addCartItem: async (item:itemCart) => {
    const washingtonRef =  doc(db, "Cart", item.cartId);
    await updateDoc(washingtonRef, {
      ItemList: arrayUnion({ProductID:item.id,Quantity:item.quantity})
    });
  },
  updateCart: async (item:any,cartId:string) => {
    const washingtonRef =  doc(db, "Cart", cartId);
    
    await updateDoc(washingtonRef, {
      ItemList: item
    });
  },
  getCart: async(id:string)=> {

    const listPRoduct=  await getDocs(query(User, where("UserID", "==", id)))
    const resoult:any=[]
    let cartID
    listPRoduct.forEach((doc) => {
         cartID=doc.id
        resoult.push(doc.data())
      });
      resoult[0].Cid=cartID
     return  resoult[0]
  },
  oderNow: async(Itemlist:ItemOder[],total:number,
    address:string,dateOder:string,
    email:string,sdt:string,uid:string,voucher?:string,discout?:number,note?:string)=> {
    await addDoc(collection(dbBlog, "Oder"), {
      ItemList: Itemlist,
      Total: total,
      address: address,
      dateOder: dateOder,
      email: email,
      sdt: sdt,
      uid: uid,
      voucher: voucher?  voucher:null,
      discout: discout? discout: null,
      note: note? note: null,
      
    })
  },
  oderSuccess: async(id:string)=>{
    const washingtonRef =  doc(db, "Cart", id);
    await updateDoc(washingtonRef, {
      ItemList: []
    });
  
  }
  
};