

import { collection, doc, getDoc, getDocs, limit,query } from "firebase/firestore";

import { db } from "../../../FireBase/config";
const Product = collection(db, "Product");
const docRef = query(Product, limit(2));




export const ProductHomeAPI = {
  getProduct: async()=> {
    const listPRoduct=  await getDocs(docRef)
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
      
     return resoult;

  },
};