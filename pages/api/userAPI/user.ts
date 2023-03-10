

import { arrayUnion, collection, doc, getDoc, getDocs, limit,orderBy,query, updateDoc, where } from "firebase/firestore";

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
  updatePhoneNumber: async(id:string, PhoneNumber:string)=>{
    await getDocs(query(User, where("uid", "==", id)))
    .then((querySnapshot) => {
      querySnapshot.forEach((docSnapshot) => {
        const docId = docSnapshot.id;
        const userDocRef = doc(db, "User/" + docId);
        console.log(userDocRef)
        updateDoc(userDocRef, {  phone:PhoneNumber  })
      });
    })
  },
  updateEmail: async(id:string, Email:string)=>{
    await getDocs(query(User, where("uid", "==", id)))
    .then((querySnapshot) => {
      querySnapshot.forEach((docSnapshot) => {
        const docId = docSnapshot.id;
        const userDocRef = doc(db, "User/" + docId);
        console.log(userDocRef)
        updateDoc(userDocRef, {  email:Email  })
      });
    })
  },
  updateAddressUser: async(id:string, address:string)=>{
    await getDocs(query(User, where("uid", "==", id)))
    .then((querySnapshot) => {
      querySnapshot.forEach((docSnapshot) => {
        const docId = docSnapshot.id;
        const userDocRef = doc(db, "User/" + docId);
        console.log(userDocRef)
        updateDoc(userDocRef, {  address: arrayUnion(address) })
      });
    })
  },
  
};