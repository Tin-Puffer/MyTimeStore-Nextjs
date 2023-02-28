

import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, limit,orderBy,query, updateDoc, where } from "firebase/firestore";

import { db } from "../../FireBase/config";
const User = collection(db, "Cart");




export const CartAPI = {
  removeItem: async ({id,quantity,cartId}:{id:string,quantity:number,cartId:string}) => {
    const washingtonRef =  doc(db, "Cart", cartId);
    console.log({id,quantity})
    // Atomically add a new region to the "regions" array field.
    // await updateDoc(washingtonRef, {
    //   ItemList: arrayUnion({id:"123",name:"23234s"})
    // });
    // Atomically remove a region from the "regions" array field.
    console.log("ref",washingtonRef)
    await updateDoc(washingtonRef, {
      ItemList: arrayRemove({ProductID:id,Quantity:quantity})
    })

  },
  getCart: async(id:string)=> {
    console.log("run")
    const listPRoduct=  await getDocs(query(User, where("UserID", "==", id)))
    const resoult:any=[]
    let cartID
    listPRoduct.forEach((doc) => {
      // console.log("doc",doc.id)
         cartID=doc.id
        resoult.push(doc.data())
      });
      resoult[0].Cid=cartID
     return  resoult[0]
;
  },
  
};