import { quantityManager, getCurrentQuantity } from "../function/quantity-manager.js";
import { matchingProductId } from '../utils/matched-id.js';
import { activeState } from "../animation/active-effect.js";
import { productCart, saveToStorage } from '../data/product-cart.js';
import { formatPesoMoney } from '../utils/money.js';
import { starRating } from '../utils/stars.js';

export function productCartOverlay () {
  document.querySelectorAll('.js-product-card').forEach((card) => {
    card.addEventListener('click', () => {
      const productId = card.dataset.productId;
      viewProductOverlay(productId);
    })
  });
}


const closeOverylayBtn = document.querySelector('.close-product-overlay');
const closeProductOverlay = document.getElementById('product-overlay');

closeOverylayBtn.addEventListener('click', () => {
  closeProductOverlay.classList.remove('show-product-overlay');
  document.body.classList.remove('no-scroll');
});

function viewProductOverlay(productId) {
  const matchedId = matchingProductId(productId);
  const overlayProduct = document.querySelector('.product-details');
  overlayProduct.innerHTML = generateProductDetails(matchedId);
  document.getElementById('product-overlay')
    .classList.add('show-product-overlay');
  document.body.classList.add('no-scroll');
  activeState();
  quantityManager();
  viewOtherImage();
  selectSize(matchedId);
  addToCartButton(productId);
};

function generateProductDetails(matchedId) {
  const priceCents = formatPesoMoney(matchedId.priceCents);
  return `
    <div class="product-detail-left">
      <div class="product-angle-images">
        ${otherViewImages(matchedId)}
      </div>
      <div class="product-main-image-view">
        <img class="product-main-image js-product-main-image" src="${matchedId.mainImage}" alt="product">
        <img class="overlay-product-logo" src="${matchedId.logo}" alt="product logo">
      </div>
    </div>
    <div class="product-detail-right">
      <div class="overlay-product-name">
        <div class="name">
          ${matchedId.name}
        </div>
        <div class="overlay-star-rating">
          ${productStars(matchedId)}
        </div>
        <div class="price">
          &#8369 ${priceCents}
        </div>
        <div class="product-stock js-product-stock">
          Stock: ${productTotalStock(matchedId)}
        </div>
      </div>

      <div class="size-option">
        <div class="size-text">
          Select Size:
        </div>
        <div id="js-product-sizes" class="sizes">
          ${overlayProductSizes(matchedId)}
        </div>
      </div>

      <div class="quantity-input-container">
        <div class="quantity-text1">
          Quantity:
        </div>

        <div class="quantity disabled js-quantity-container">
          <button class="minus disabled js-decrease-btn" aria-label="Decrease">&minus;</button>
          <input id="js-get-quantity" type="number" class="input-box" value="1" min="1" max="10">
          <button class="plus disabled js-increase-btn" aria-label="Increase">&plus;</button>
        </div>
      </div>

      <div class="overlay-button-container">
        <button class="product-add-to-cart-button disabled js-product-add-to-cart-button">
          <span id="js-product-text1" class="product-add-to-cart-text">
            ADD TO CART
          </span>
          <span class="product-added-text">
            ADDED &#10003;
          </span>
          <svg class="product-cart-svg" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M7.25 9A.75.75 0 0 1 8 8.25h3a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9" />
            <path fill="currentColor" fill-rule="evenodd" d="M1.289 2.763a.75.75 0 0 1 .948-.475l.305.102c.626.209 1.155.385 1.572.579c.442.206.826.46 1.117.865c.291.403.412.848.467 1.333l.009.083h10.804c.976 0 1.792 0 2.417.092c.651.097 1.28.318 1.676.92c.396.6.352 1.265.184 1.902c-.16.61-.482 1.36-.867 2.258l-.467 1.089c-.176.412-.332.775-.493 1.062c-.175.31-.388.592-.711.805s-.667.298-1.021.337c-.328.035-.722.035-1.17.035H6.154c.074.134.159.244.255.341c.277.277.666.457 1.4.556c.755.101 1.756.103 3.191.103h8a.75.75 0 0 1 0 1.5h-8.055c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982s-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337V6.883c0-.713 0-1.185-.042-1.546c-.04-.342-.107-.506-.194-.626c-.086-.12-.221-.237-.533-.382c-.33-.153-.777-.304-1.453-.53l-.265-.087a.75.75 0 0 1-.474-.95m4.518 9.487h10.215c.496 0 .809-.001 1.046-.027c.219-.023.303-.062.356-.097s.122-.097.23-.289c.117-.208.24-.495.436-.95l.429-1c.414-.968.69-1.616.819-2.106c.126-.476.062-.62.014-.694c-.049-.073-.157-.189-.644-.26c-.501-.075-1.205-.077-2.257-.077H5.75V9.5c0 1.172 0 2.054.056 2.75m1.694 9.5a2.25 2.25 0 1 1 0-4.5a2.25 2.25 0 0 1 0 4.5m-.75-2.25a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0m7.5 0a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 0 0-4.5 0m2.25.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5" clip-rule="evenodd" />
          </svg>
          <svg class="product-box-svg" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20">
            <rect width="20" height="20" fill="none" />
            <path fill="currentColor" d="m10 7.96l3.029-1.21l-7.5-3l-2.586 1.034a1.5 1.5 0 0 0-.364.208zM2.035 5.853A1.5 1.5 0 0 0 2 6.176v7.646a1.5 1.5 0 0 0 .943 1.393L8.7 17.518q.391.156.8.214V8.838zm8.465 11.88a3.5 3.5 0 0 0 .8-.214l5.757-2.303A1.5 1.5 0 0 0 18 13.822V6.176q0-.166-.035-.324L10.5 8.838zm6.921-12.74l-3.046 1.219l-7.5-3L8.7 2.48a3.5 3.5 0 0 1 2.6 0l5.757 2.303a1.5 1.5 0 0 1 .364.208" />
          </svg>
        </button>
        <button class="product-add-to-fav js-product-add-to-fav">
          <span class="product-fav-text1 js-product-fav-text1">ADD TO FAVORITES</span>
          <svg id="js-product-like-svg" class="product-like-svg product-like-svg-hide" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path class="liked-path1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" d="M22 8.862a5.95 5.95 0 0 1-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608c-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 0 1 8.08 0l.266.274l.265-.274A5.6 5.6 0 0 1 16.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0 1 22 8.862Z" />
          </svg>
        </button>
      </div>

    </div>
  
  `
}

function otherViewImages(matchedId) {
  let viewOtherImages = '';

  matchedId.otherImages.forEach((otherImage) => {
    viewOtherImages += `
      <img class="js-other-view" src="${otherImage}" alt="">
    `
  });
  return viewOtherImages;
};

function viewOtherImage() {
  const otherImages = document.querySelectorAll('.js-other-view');
  const mainImage = document.querySelector('.js-product-main-image');
  otherImages.forEach((otherImage) => {
    otherImage.addEventListener('mouseover', () => {
      const imgSrc = otherImage.src;
      const viewSrc = imgSrc.replace(window.location.origin + '', '');
      mainImage.src = viewSrc;
    });
  });
}

function productStars(matchedId) {
  const overlayProductStar = starRating(matchedId);
  return overlayProductStar.stars;
};

function productTotalStock(matchedId) {
  let totalStock = 0;
  matchedId.sizes.forEach((sizes) => {
    totalStock += sizes.stock;
  });
  return totalStock;
};

function overlayProductSizes(matchedId) {
  let sizesHTML = '';
  matchedId.sizes.forEach((sizes) => {
    sizesHTML += `
      <div class="js-product-size">${sizes.size}</div>
    `
  });
  return sizesHTML;
};

let selectedSizeText;

function selectSize(matchedId) {
  const selectedSizes = document.querySelectorAll('.js-product-size');

  selectedSizes.forEach((size) => {
    size.addEventListener('click', () => {
      selectedSizeText = size.textContent.trim();
      selectedSizes.forEach((s) => s.classList.remove('selected-size'));
      size.classList.add('selected-size');
      enableActionButtons();
      selectedProductSize(matchedId, selectedSizeText);
      size.classList.add('selected-size');
    });
  });
  return selectedSizeText;
}

function selectedProductSize(matchedId) {
  const setMaxValue = document.querySelector('.input-box');
  const sizeStock = document.querySelector('.js-product-stock');
  let matchedSize;
  setMaxValue.value = 1;
  matchedId.sizes.forEach((sizeObj) => {
    if (sizeObj.size === selectedSizeText) {
      matchedSize = sizeObj;
    }
  });
  sizeStock.textContent = `Stock: ${matchedSize.stock}`;
  setMaxValue.max = matchedSize.stock;
}

function addToCart(productId, quantityValue) {
  let matchingItem;

  productCart.forEach((cartItem) => {
    if(productId === cartItem.productId && selectedSizeText === cartItem.size) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += 1;
  } else {
    productCart.push({
      productId: productId,
      quantity: quantityValue,
      size: selectedSizeText
    });
  }

  saveToStorage();
}

export function updateCartQuantity() {
  let totalCartQuantity = 0;
  productCart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-total-quantity')
    .innerHTML = totalCartQuantity;
}

function addToCartButton(productId) {
  const cartBtnElement = document.querySelector('.js-product-add-to-cart-button');
  cartBtnElement.addEventListener('click', () => {
    const quantityValue = getCurrentQuantity();
    addToCart(productId, quantityValue);
    updateCartQuantity();
  });
}

function enableActionButtons() {
  document.querySelector('.js-product-add-to-cart-button').classList.remove('disabled');
  document.querySelector('.js-quantity-container').classList.remove('disabled');
  document.querySelector('.js-increase-btn').classList.remove('disabled');
  document.querySelector('.js-decrease-btn').classList.remove('disabled');
}