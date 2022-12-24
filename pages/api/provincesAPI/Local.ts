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
  getComment(idFilm: string): Promise<AnyPtrRecord> {
    const URL = "/comment";
    return LOCALs.get(URL, {
      params: {
        idFilm: idFilm,
      },
    }).then((res) => res.data[0]);
  },
};
