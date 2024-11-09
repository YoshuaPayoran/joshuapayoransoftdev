export function formatPesoMoney (priceCents) {
  const price = (Math.round(priceCents) / 100);
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(price);
}