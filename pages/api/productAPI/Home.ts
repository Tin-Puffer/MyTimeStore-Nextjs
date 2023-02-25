

import { collection, doc, getDoc, getDocs, limit,orderBy,query, where } from "firebase/firestore";

import { db } from "../../../FireBase/config";
const Product = collection(db, "Product");
const docRefPoduct = query(Product, where("kho", ">", 0),orderBy("kho"), limit(6));
const docRefSlide = query(Product,orderBy("sold"), limit(4));







export const ProductHomeAPI = {
  getDetailProduct: async(id:string)=> {
    const listPRoduct=  await getDocs(query(Product, where("id", "==", id)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
      
     return resoult[0];

  },
  getCartlist: async(list:string[])=> {
    const listrs:any=[]
    list.forEach(async item =>{
      const listPRoduct=  await getDocs(query(Product, where("id", "==", item)))
      const resoult:any=[]
      listPRoduct.forEach((doc) => {
          resoult.push(doc.data())
        });
        listrs.push(resoult[0])
    })
      
     return listrs;

  },
  getProduct: async()=> {
    const listPRoduct=  await getDocs(docRefPoduct)
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
      
     return resoult;

  },
  getProductBestSell: async()=> {
    const listPRoduct=  await getDocs(docRefSlide)
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
      
     return resoult;

  },
};