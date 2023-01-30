const derivePriceFromUnstructuredData = (arr) => {
  let price = 0;
  // console.log(arr.cardmarket.prices.avg30);
  // Take the usual data point
  if (arr.cardmarket) {
    price = arr.cardmarket.prices.avg30;
    return price;
  }

  //tcgplayer has either normal or holofoil
  // Look for tcgplayer.prices.low
  price = arr.tcgplayer.prices.low ? arr.tcgplayer.prices.low : 0;
  if (price > 0) return price; // return if value is set

  price = arr.tcgplayer.prices.holofoil ? arr.tcgplayer.prices.holofoil.mid : 0;
  if (price > 0) return price;

  price = arr.tcgplayer.prices.normal ? arr.tcgplayer.prices.normal.mid : 0;
  if (price > 0) return price;

  return 0;
};

export default derivePriceFromUnstructuredData;
