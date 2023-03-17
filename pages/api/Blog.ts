

import { collection, startAt, getCountFromServer, getDocs,limit,orderBy,query, updateDoc, where } from "firebase/firestore";
import { dbBlog,dbBlogDetail} from "../../FireBase/config";
const Blog = collection(dbBlog, "News");
const BlogDetail = collection(dbBlogDetail, "DetailNew");


export const BlogAPI = {
  getAllBlog: async (page?:number) => {
    let pagination = 1
    if (page)pagination=page
    const listPRoduct=  await getDocs(query(Blog, limit(9)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
     return  resoult
  },
  getNewBlog: async () => {
   
   
    const listPRoduct=  await getDocs(query(Blog,orderBy("Clike", 'desc'),limit(3)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
     return  resoult
  },
  getDeltailBlog: async (blogId:string) => {
    const listPRoduct=  await getDocs(query(BlogDetail,where("id","==",blogId)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
     return  resoult[0]
  },
  getBlog: async (idBlog:string) => {

    const listPRoduct=  await getDocs(query(Blog, where("id","==",idBlog)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
     return  resoult[0]
  },
  getBlogNext: async (idBlog:string) => {
    const resoult:any=[]
    const listPRoduct=  await getDocs(query(Blog, where("id","==",String(Number(idBlog)+1))))
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
  
     return  resoult[0]
  },
  getBloPrev: async (idBlog:string) => {
    const listPRoduct=  await getDocs(query(Blog, where("id","==",String(Number(idBlog)-1))))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
   

     return  resoult[0]
  },
  
};