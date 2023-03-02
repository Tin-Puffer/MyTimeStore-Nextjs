


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
}

export interface product{
    id:string,
    name:string;
    price:number;
    kho:number;
    deal?:number;
    sold:number
    endOfSale?:string;
    beginSale?:string;
    image:string[];
    category:string[];
    decription?:string[];
    keyWord:string[],
    review:review[]|null
    figures:figures,
}


