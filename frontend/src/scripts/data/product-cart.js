export let productCart = JSON.parse(localStorage.getItem('productCart')) || [];

// Remove the default items from the array initialization above
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