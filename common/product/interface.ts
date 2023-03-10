


export interface figures {
    productLine: string
    ATm: string
    diameter: string
    brandMaterial: string
    code: string
    caseMaterial: string
    sex:  0|1|2,
    lenght: string,
    trademark: string,
    insurance: number,
    glasessMaterial: string
}
export interface review{
    avatar: string
    name: string
    message: string
    like: number
    disLike: number
    rating: number
    Time: string
}
export interface sale {
    begin: string
    end:string
    discount: number

}
export interface product{
    id:string,
    name:string;
    price:number;
    kho:number;
    sold:number
    sale?:sale,
    image:string[];
    category:string[];
    decription?:string[];
    keyWord:string[],
    review:review[]|null
    figures:figures,
  
}

interface OderListItem{
    Image:string;
    Name:string;
    Price:number;
    ProductID:string;
    Quantity:number
}
interface Oder{
    ItemList:OderListItem[]
    Total:number,
    address:string,
    dateOder:string,
    email:string,
    sdt:string,
    ship:number,
    uid:string
}

