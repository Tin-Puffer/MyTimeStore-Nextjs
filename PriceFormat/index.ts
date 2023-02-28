


function stringToDate(string:string) {
  return new Date(string);
}
function sosanh(strTime:string){
  const now = new Date();
  return now>stringToDate(strTime)
}

export  function formatOld(value :number){
    const priceFormat = value.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      return priceFormat;
}
export  function formatNew(value :number,percent :number|undefined,date:string|undefined){
  if(percent===undefined || date===undefined){
    return undefined
  }
  else{
    if(sosanh(date)){
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
}

export  function checkSale(value :number,percent :number|undefined,date:string|undefined){
  if(percent===undefined || date===undefined){
    return undefined
  }
  else{
    if(sosanh(date)){
      return undefined
    }
    else{
      const priceNow = ((value / 100) * (100 - percent))
    
  
        return priceNow;
    }
  }
}
