


export interface figures {
    productLine: string
    ATm: string
    diameter: string
    brandMaterial: string
    code: string
    caseMaterial: string
    lenght: string,
    insurance: number,
    glasessMaterial: string,
    
    trademark: string,
    sex:  0|1|2,
    sold:number

}
export interface review{
    uid: string
    avatar: string
    name: string
    message: string
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
    sale?:sale,
    image:string[];
    category:string[];
    decription?:string[];
    keyWord:string[],
    review:review[]
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

