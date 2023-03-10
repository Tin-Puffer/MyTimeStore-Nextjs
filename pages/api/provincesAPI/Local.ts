import axios from "axios";
import { AnyPtrRecord } from "dns";

export const LOCALs = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export const LocalAPI = {
  getProvinces(): Promise<any> {
    const URL = "/p";
    return LOCALs.get(URL).then((res) => res.data);
  },
  getDistricts(e: any): Promise<any> {
    const URL = `/p/${e}?depth=2`;
    return LOCALs.get(URL).then((res) => res.data.districts);
  },
  getwards(e: any): Promise<any> {
    const URL = `/d/${e}?depth=2`;
    return LOCALs.get(URL).then((res) => res.data.wards);
  },
  getAddressAll: async(Pid:number|undefined,Did:number|undefined,Wid: number|undefined) => {

    if(Pid && Did && Wid) {
    const P = await LOCALs.get("/p/"+Pid).then((res) => res.data.name);  
    const D= await LOCALs.get("/d/"+Did).then((res) => res.data.name);  
    const W= await LOCALs.get("/w/"+Wid).then((res) => res.data.name);  

    return W+" "+D+" "+P;
    }
    else return ''
  },
  
};
