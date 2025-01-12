import { generateNewsHTML } from '../data/infinite-news.js';
import { productCart } from '../data/product-cart.js';


  let totalCartQuantity = 0;
  productCart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });
  if(totalCartQuantity > 99) {
    document.querySelector('.js-cart-total-quantity')
    .innerHTML = '99+'
  }else {
    document.querySelector('.js-cart-total-quantity')
    .innerHTML = totalCartQuantity;
  }

generateNewsHTML();