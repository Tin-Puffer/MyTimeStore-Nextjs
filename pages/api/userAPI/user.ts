

import { collection, doc, getDoc, getDocs, limit,orderBy,query, where } from "firebase/firestore";

import { db } from "../../../FireBase/config";
const User = collection(db, "User");




export const UserAPI = {
  getUser: async(id:string)=> {
    const listPRoduct=  await getDocs(query(User, where("uid", "==", id)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
      
     return resoult[0];

  },
  
};