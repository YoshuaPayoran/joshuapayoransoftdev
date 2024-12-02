import { popularProducts } from "../data/popular-products.js";

export function matchingProductId (productId) {
  
  const matchedId = popularProducts.find(product => 
    product.id === productId
  );

  return matchedId;
}

export function matchingColorId (productId, selectedColorId){

  const matchingId = matchingProductId(productId);
  
  const matchedColorId = matchingId.colors.find(color => 
    color.colorId === selectedColorId
  );

  return matchedColorId;
}