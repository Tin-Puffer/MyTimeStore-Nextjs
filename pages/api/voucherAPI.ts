

import { collection, doc, getDocs,query, updateDoc, where } from "firebase/firestore";
import { dbBlog} from "../../FireBase/config";
const Voucher = collection(dbBlog, "Voucher");

export const VoucherAPI = {
  getVoucher: async (id:string) => {
    const listPRoduct=  await getDocs(query(Voucher, where("Vcode", "==", id)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
     return  resoult[0]
  },
  
  
};