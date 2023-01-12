


export interface figures {
    productLine: string
    ATm: string
    diameter: string
    brandMaterial: string
    code: string
    caseMaterial: string
    sex:  1|2|3,
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
}

export interface product{
    image:string[];
    name:string;
    price:number;
    kho:number;
    category:string[];
    deal?:number;
    decription?:string[];
    endOfSale:string;
    figures:figures,
    id:string,
    key:string[],
    review:review[]
    sold:number
}


