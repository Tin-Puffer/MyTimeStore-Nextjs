

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
  
  getCartlist: async(list:any[])=> {
    
    console.log("ham nay chay 1");
    let flag=false
    const promise= new Promise((resolve) => {
    const listrs:any=[]
    let resoult:any=[]
    
       list.forEach(async (item:any,index) =>{
        console.log("chay vong lap",index)

      await getDocs(query(Product, where("id", "==", item.ProductID))).then(result =>{
        console.log("chay id ",item.ProductID)
        
        result.forEach((doc) => {

       
            resoult.push(doc.data())
          });
          
          
          
        })
        console.log("data add vao liss qua tung vong lap ",resoult)

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
      },100)
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