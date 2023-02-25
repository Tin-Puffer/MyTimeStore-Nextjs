

import { collection, doc, getDoc, getDocs, limit,orderBy,query, where } from "firebase/firestore";

import { db } from "../../FireBase/config";
const User = collection(db, "Cart");




export const CartAPI = {
  getCart: async(id:string)=> {
    const listPRoduct=  await getDocs(query(User, where("UserID", "==", id),where("Status","==",0)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
      
     return resoult[0];

  },
  
};