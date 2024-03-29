import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, limit,orderBy,query, updateDoc, where } from "firebase/firestore";
import { review } from "../../../common/product/interface";
import { db, dbBlog } from "../../../FireBase/config";
export const Product = collection(db, "Product");
const docRefPoduct = query(Product, where("kho", ">", 0),orderBy("kho"), limit(6));
const docRefSlide = query(Product,orderBy("figures.sold"), limit(4));
export function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
export const ProductHomeAPI = {
  addProduct: async()=>{
    await addDoc(collection(db, "Product"), {
      category: ["Automatic","Đồng hồ đôi","KASSAW"],
      figures: {
        ATm:
        "3 ATM",
        brandMaterial:
        "Thép không gỉ 316L",
        caseMaterial:
        "Thép không gỉ 316L",
        code:
        "",
        diameter:
        "32 mm",
        glasessMaterial:
        "Sapphire",
        insurance:
        24,
        lenght:
        "8 mm",
        productLine:
        "Đồng hồ cơ (Automatic)",
        sex:
        2,
        sold:
        120,
        trademark:
        "KASSAW",
      },
      id:
      "",
      image:[],
      keyWord:["MF0226-1","IW CARNIVAL"],
      name:"",
      price:0,
      review:[],
      sale:{},
      kho:40,
      decription:[]
    })
  },
  getDetailProduct: async(id:string)=> {
    const listPRoduct=  await getDocs(query(Product, where("id", "==", id)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
     return resoult[0]
  }, 
  getListSameProduct: async(sex:number,brand:string)=> {
    const listPRoduct=  await getDocs(query(Product, where("figures.trademark", "==", brand),limit(6)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });  
     return resoult;
  },
  getCartlist: async(list:any[])=> {
    let flag=false
    const promise= new Promise((resolve) => {
    const listrs:any=[]
    let resoult:any=[]
    if(list.length > 0){
      list.forEach(async (item:any,index) =>{
      await getDocs(query(Product, where("id", "==", item.ProductID))).then(result =>{
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
  getProductInterest: async()=> {
    const listPRoduct=  await getDocs(query(Product, limit(4)))
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
  getProductSearch: async (code:string) => {
    const x = await getDocs(query(
      Product,
      where("id", ">=", code),
      where("id", "<=", code + "\uf8ff"),
      limit(4)
    ));
    const resoult:any = [];
    x.forEach((doc) => {
      resoult.push(doc.data());

    });
    return resoult;
  },
  getFilterProduct: async(type:any,value?:any)=> {
    let getList
    switch(type){
      case "hot":{
        getList = await getDocs(query(
          Product,
          where("figures.sold", ">=", 100),
        ))
        break;
      }
      case "brand":{
        getList = await getDocs(query(
          Product,
          where("figures.trademark", "==", value)
        ))
        break;
      }
      case "search":{
        getList = await getDocs(query(
          Product,
          where("id", ">=", value),
          where("id", "<=", value + "\uf8ff"),
        ))
        break;
      }
      case "gender":{
        let sex
        if(value=="man" ) sex=1
        else if(value=="woman" ) sex=0
        else if(value=="couple") sex=2
        else return false
        getList = await getDocs( query(
          Product,
          where("figures.sex", "==", sex ),
        ))
        break;
      }
      default:{
       return false
      }
    }
    const resoult:any = [];
    getList.forEach((doc) => {
      resoult.push(doc.data());

    });
    return resoult;
  },
  alowComment: async(Pid:string,Uid:string)=> {
    const q = query(collection(dbBlog, 'Alowcomment'),
     where('uid', '==', Uid))
    const listPRoduct=  await getDocs(q)
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
      
        resoult.push(doc.data())
      });
    if(resoult.length>0){
      return resoult[0].list.includes(Pid)
    }else return false

  },
  addComment: async(Pid:string,newReview:review,oldComment?:review|boolean)=> { 
      let docID
      const q = query(Product,
       where('id', '==', Pid));
       try {
         await getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            docID = doc.id;
          });
        })
         const washingtonRef =  doc(db, "Product", docID|| '');

        if(oldComment){
          if(washingtonRef){
            await updateDoc(washingtonRef, {
              review: arrayRemove(oldComment)
            });
          } 
        }
          if(washingtonRef){
          
            await updateDoc(washingtonRef, {
              review: arrayUnion(newReview)
            });
          }
          return true
       } catch (error) {
        return false
       }
  },
};