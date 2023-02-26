

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
    const resoult:any=[]
    
       list.forEach(async (item:any,index) =>{
        console.log("chay vong lap")
      await getDocs(query(Product, where("id", "==", item.ProductID))).then(result =>{
        
        result.forEach((doc) => {
            resoult.push(doc.data())
          });

        return resoult[0];
        
      }).then(resoult =>{
        listrs.push({...resoult,Quantity:item.Quantity});
        // listrs.push(resoult);

        if(index==list.length-1){
          flag=true
        }

      })
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
  
  // getCartlist: async(list:string[])=> {
    
  //   console.log("ham nay chay 1");
  //   const promise= new Promise((resolve) => {
  //   const listrs:any=[]
  //   const resoult:any=[]
    
  //      list.forEach(async (item:any) =>{
  //       console.log("chay vong lap")
  //     await getDocs(query(Product, where("id", "==", item))).then(result =>{
        
  //       result.forEach((doc) => {
  //           resoult.push(doc.data())
  //         });

  //       return resoult[0];
        
  //     }).then(resoult =>{
  //       listrs.push(resoult);

  //     })
  //     console.log("chay vong lap xong")
  //     }
  //     )
   
  //   console.log("listrs",listrs);
  //   resolve(listrs)
  //   // setTimeout(()=>{resolve(listrs)},3000)
      
    
  // })
  //  return await promise.then((list)=>{
  //   return list;
  // })
    

  // },
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