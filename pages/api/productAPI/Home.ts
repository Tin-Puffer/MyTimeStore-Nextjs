

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
  getListSameProduct: async(sex:number,brand:string)=> {
    const listPRoduct=  await getDocs(query(Product, where("figures.trademark", "==", brand),where("figures.sex", "==", sex),limit(6)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
      
     return resoult;
  },
  getCartlist: async(list:any[])=> {
    
    console.log("ham nay chay 1",list);
    let flag=false

    const promise= new Promise((resolve) => {
    const listrs:any=[]
    let resoult:any=[]
    if(list.length > 0){

      list.forEach(async (item:any,index) =>{
        console.log("chay vong lap",index)

      await getDocs(query(Product, where("id", "==", item.ProductID))).then(result =>{
        console.log("chay id ",item.ProductID)
        
        result.forEach((doc) => {

       
            resoult.push(doc.data())
          });
          
          
          
        })
        listrs.push({...resoult[0],Quantity:item.Quantity});
        resoult=[]
        if(index==list.length-1){
          flag=true
        }

      
      }
      )
      const time= setInterval(()=>{
        console.log("flag:",flag)
        if(flag){
          resolve(listrs)
          clearInterval(time)
        }
      },500)
    }
    else  resolve(listrs)
  })
   return await promise.then((list)=>{
    return list;
  })
    

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