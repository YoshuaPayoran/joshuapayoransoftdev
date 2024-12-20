export function formatPesoMoney (priceCents) {
  const price = (Math.round(priceCents) / 100);
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(price);
}

export function salePrice (saleOff, priceCents) {
  const salePercent = saleOff / 100;
  const saleDiscount = priceCents * salePercent;
  const discountedPrice = priceCents - saleDiscount;

  return discountedPrice;
}