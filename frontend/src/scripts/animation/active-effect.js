export function activeState(){
  productAddToCart();
  addToFav();
}

function productAddToCart() {
  const productCartBtn = document.querySelector('.js-product-add-to-cart-button');
  const productText1 = document.getElementById('js-product-text1');

  productCartBtn.addEventListener('click', () => {
    
    productCartBtn.classList.add('clicked');
    productText1.classList.add('hide-text1');

    setTimeout(() => {
      productCartBtn.classList.remove('clicked');
      productText1.classList.remove('hide-text1');
    }, 3000);

  });
}

function addToFav() {
  const likedProduct = document.querySelector('.js-product-add-to-fav');
  const likedProductText1 = document.querySelector('.js-product-fav-text1');
  const likedProductHeart = document.getElementById('js-product-like-svg');

  likedProduct.addEventListener('click', () => {
    if (likedProductText1.innerText === 'ADD TO FAVORITES') {
      likedProductHeart.classList.add('liked')
      likedProductHeart.classList.add('show-object');
      likedProductText1.classList.add('hide-object');
      likedProductHeart.classList.remove('product-like-svg-hide');
      likedProduct.classList.add('product-add-to-fav-new');
      likedProductText1.innerText = 'LIKED';
    }else if (likedProductText1.innerText === 'LIKED') {
      likedProductHeart.classList.remove('liked');
      likedProductHeart.classList.remove('show-object');
      likedProductText1.classList.remove('hide-object');
      likedProductHeart.classList.add('product-like-svg-hide');
      likedProduct.classList.remove('product-add-to-fav-new');
      likedProductText1.innerText = 'ADD TO FAVORITES';
    }
  });
}
