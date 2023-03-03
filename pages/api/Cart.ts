

import { arrayRemove, arrayUnion, collection, doc, getDocs,query, updateDoc, where } from "firebase/firestore";
import { itemCart } from "../../app/splice/cartSlipe";
import { db } from "../../FireBase/config";
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
  getCart: async(id:string)=> {
    console.log("run")
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
  
};