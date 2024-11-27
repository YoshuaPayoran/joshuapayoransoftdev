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

export function matchingColorId (productId, selectedColorId){
  let matchedColorId;

  popularProducts.forEach((product) => {
    if(product.id === productId) {
      product.colors.forEach((color) => {
        if(color.colorId === selectedColorId){
          matchedColorId = color;
        }
      });
    }
  });
  
  return matchedColorId;
}