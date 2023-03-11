

import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs,query, updateDoc, where } from "firebase/firestore";
import { ItemList, ItemOder } from "../../app/saga/cartSaga";
import { itemCart, ProductSlI } from "../../app/splice/cartSlipe";
import { db, dbBlog } from "../../FireBase/config";
import { formatOld } from "../../PriceFormat/index";

import emailjs from "emailjs-com";

function sendEmail(name:string,email: string, table:string,total:number) {
  const emailService = "service_8tab78v";
  const emailTemplate = "template_2uu849s";
  const userID = "aWKt2LkPTmrBW-2Ow";
  console.log(table)
  const templateParams = {
    to_name: name,
    to_email: email,
    render:table,
    total:formatOld(total)
  };

  emailjs.send(emailService, emailTemplate, templateParams, userID).then(
    (result) => {
      console.log(result.text);
    },
    (error) => {
      console.log(error.text);
    }
  );
}

const User = collection(db, "Cart");
export const CartAPI = {
  removeItem: async (item:itemCart) => {
    const washingtonRef =  doc(db, "Cart", item.cartId);
    await updateDoc(washingtonRef, {
      ItemList: arrayRemove({ProductID:item.id,Quantity:item.quantity})
    })
  },
  addCartItem: async (item:itemCart) => {
    const washingtonRef =  doc(db, "Cart", item.cartId);
    await updateDoc(washingtonRef, {
      ItemList: arrayUnion({ProductID:item.id,Quantity:item.quantity})
    });
  },
  updateCart: async (item:any,cartId:string) => {
    const washingtonRef =  doc(db, "Cart", cartId);
    
    await updateDoc(washingtonRef, {
      ItemList: item
    });
  },
  getCart: async(id:string)=> {

    const listPRoduct=  await getDocs(query(User, where("UserID", "==", id)))
    const resoult:any=[]
    let cartID
    listPRoduct.forEach((doc) => {
         cartID=doc.id
        resoult.push(doc.data())
      });
      resoult[0].Cid=cartID
     return  resoult[0]
  },
  oderNow: async(Itemlist:ItemOder[],total:number,
    address:string,dateOder:string,
    email:string,sdt:string,uid:string,voucher?:string,discout?:number,note?:string)=> {
    await addDoc(collection(dbBlog, "Oder"), {
      ItemList: Itemlist,
      Total: total,
      address: address,
      dateOder: dateOder,
      email: email,
      sdt: sdt,
      uid: uid,
      voucher: voucher?  voucher:null,
      discout: discout? discout: null,
      note: note? note: null,
      
    })
  },
  EmailConfirm: async(name:string,adressMail:string,listProduct:ItemOder[],total:number)=>{
    console.log(name,adressMail,listProduct,total)
   let HeadTable=` 
   <table border="0" width="100%" cellspacing="0" cellpadding="0">
   <tbody>
   <tr>
   <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;" align="left" bgcolor="#eeeeee" width="75%">Order Confirmation #</td>
   <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;" align="left" bgcolor="#eeeeee" width="25%">2345678</td>
   </tr>
   `
  let BootomTable=`
   </tbody>
   </table>`
   const ListTable= listProduct.map((item) => {
    return `<tr>
    <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;" align="left" width="75%">${item.Name}</td>
    <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;" align="left" width="25%">${formatOld(item.Price)}</td>
    </tr>`
   })
   const tableHTML= HeadTable+ ListTable + BootomTable
   sendEmail(name,adressMail,tableHTML,total)
  },

  oderSuccess: async(id:string)=>{
    const washingtonRef =  doc(db, "Cart", id);
    await updateDoc(washingtonRef, {
      ItemList: []
    });
  
  }
  
};