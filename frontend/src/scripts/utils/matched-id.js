import { products } from "../data/products.js";
import { saleProducts } from "../data/saleProducts.js";

export function matchingProductId (productId) {
  
  const matchedId = products.find(product => 
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

export function matchingSaleProduct (productId, productColorId) {
  const matchingSaleProductId = saleProducts
    .find(saleProduct => 
      saleProduct.productId === productId && 
      saleProduct.colorId === productColorId);

  return matchingSaleProductId;
}