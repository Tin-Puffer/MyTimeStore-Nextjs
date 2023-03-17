

import { collection,  FieldValue, getDocs,limit,orderBy,query, updateDoc, where, doc, arrayUnion, arrayRemove, increment, startAfter, getCountFromServer } from "firebase/firestore";
import { dbBlog,dbBlogDetail} from "../../FireBase/config";
const Blog = collection(dbBlog, "News");
const BlogDetail = collection(dbBlogDetail, "DetailNew");

const PAGE_SIZE = 2;
export const BlogAPI = {
  getAllBlog: async (page?:number) => {
    const snapshot = await getCountFromServer(Blog) 
    const total=Math.ceil(snapshot.data().count/PAGE_SIZE)

    const loadMoreDocuments = async (lastDoc:any) => {
    const listPRoduct=  await getDocs(query(Blog,orderBy("time"),startAfter(lastDoc), limit(PAGE_SIZE)))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
     return resoult
     
    }

    const q = query(
      Blog,
      orderBy("time"),
      limit(PAGE_SIZE)
    );

    if( !page || page==0 ){
      const resoult:any=[]
      const listPRoduct = await getDocs(q);
      listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
      return {
        resoult:resoult,
        total:total
      }
    }else{
    
      const listPRoduct = await getDocs(query(Blog,orderBy("time"), limit(PAGE_SIZE*page)));
      let lastDoc = listPRoduct.docs[listPRoduct.docs.length - 1];
      const moreDocuments = await loadMoreDocuments(lastDoc);
      return {
        resoult:moreDocuments,
        total:total
      }
    
    }

  },
  getSearch: async (value:string) => {
    const listPRoduct=  await getDocs(query(Blog,
    where("name", ">=", value),
    where("name", "<=", value + "\uf8ff")))
    const resoult:any=[]
    listPRoduct.forEach((doc) => {
        resoult.push(doc.data())
      });
     return   {
      resoult:resoult,
      total:Math.ceil(resoult.length/PAGE_SIZE)
    }
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
  handleLikeBlog: async(Bid:string,like:boolean,UserID?:string,)=> {
    let docID
    if(!UserID) return false
    const q = query(Blog,
      where('id', '==', Bid));
      try {
        await getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            docID = doc.id;
          });
        })
        const washingtonRef =  doc(dbBlog, "News", docID|| '');
        if(washingtonRef){
          if(like){
            
            await updateDoc(washingtonRef, {
              like: arrayRemove(UserID),
              Clike: increment(-1),
            });
          }
          else{
            await updateDoc(washingtonRef, {
              like: arrayUnion(UserID),
              Clike: increment(1),
            });
          }
        }
        return true
      } catch (error) {
        console.log(error)
        return false
        
     }
    
  
  },
 
  
};