export let productCart = JSON.parse(localStorage.getItem('productCart'));

if(!productCart){
  productCart = [{
    productId: 'j_product_0007',
    quantity: 2,
    size: '44'
  },{
    productId: 'a_product_0005',
    quantity: 1,
    size: '43'
  }, {
    productId: 'j_product_0001',
    quantity: 3,
    size: '42'
  }];
}

export function saveToStorage () {
  localStorage.setItem('productCart', JSON.stringify(productCart));
}

export function removeFromCart (productId, productSize) {
  const newCart = [];

  productCart.forEach((cartItem) => {
    if (!(cartItem.productId === productId && cartItem.size === productSize)) {
      newCart.push(cartItem);
    }
  });

  productCart = newCart;

  saveToStorage();
}