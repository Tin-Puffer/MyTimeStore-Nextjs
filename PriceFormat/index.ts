


function stringToDate(string:string) {
  return new Date(string);
}
export function sosanh(sateE?:string,dateB?:string){
  const now = new Date();
  if(sateE && dateB) return now>stringToDate(sateE) || now<stringToDate(dateB);
  else return true

}

export  function formatOld(value :number){
    const priceFormat = value.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      return priceFormat;
}
export  function formatNew(value :number,percent :number|undefined,dateE:string|undefined,dateB:string|undefined){
  if(percent===undefined || dateE===undefined ||dateB===undefined || sosanh(dateE,dateB)){

    return undefined
  }
  else{
   
      const priceNow = ((value / 100) * (100 - percent)).toLocaleString(
          "it-IT",
          {
            style: "currency",
            currency: "VND",
          }
        );
  
        return priceNow;
    
  }
}

export  function checkSale(value :number,percent :number|undefined,dateE:string|undefined,dateB:string|undefined){
  if(percent===undefined || dateE===undefined ||dateB===undefined || sosanh(dateE,dateB)){
    return undefined
  }
  else{
   
      const priceNow = ((value / 100) * (100 - percent))
        return priceNow;
    
  }
}
export function calcPrice(vaule:number,discount?:number){
  if(discount==undefined){return vaule}
  else{ return vaule - (vaule * discount / 100) }
}
