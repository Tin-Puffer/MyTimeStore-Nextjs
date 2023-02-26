

import { collection, doc, getDoc, getDocs, limit,orderBy,query, where } from "firebase/firestore";

import { db } from "../../FireBase/config";
const User = collection(db, "Cart");




export const CartAPI = {
  getCart: async(id:string)=> {
    console.log("run")
    const listPRoduct=  await getDocs(query(User, where("UserID", "==", id)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
      
      console.log(resoult[0])
     return resoult[0];
  },
  
};