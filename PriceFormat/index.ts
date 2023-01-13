


export  function formatOld(value :number){
    const priceFormat = value.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
      });
      return priceFormat;
}
export  function formatNew(value :number,percent :number){

    const priceNow = ((value / 100) * (100 - percent)).toLocaleString(
        "en-US",
        {
          style: "currency",
          currency: "VND",
        }
      );

      return priceNow;
}