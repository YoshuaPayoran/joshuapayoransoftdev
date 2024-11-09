import { popularProducts } from "../data/popular-products.js";

export function matchingProductId (productId) {
  let matchedId;
  popularProducts.forEach((product) => {
    if(product.id === productId){
      matchedId = product;
    }
  });
  return matchedId;
}