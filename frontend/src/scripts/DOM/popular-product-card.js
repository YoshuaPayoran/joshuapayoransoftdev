import {popularProducts} from '../data/popularProducts.js';
import { starRating } from '../utils/stars.js';
import { formatPesoMoney } from '../utils/money.js';
import '../animation/carousel.js';
import '../DOM/brand-products.js';
import { matchingProductId, matchingColorId } from '../utils/matched-id.js';
import { productCartOverlay, updateCartQuantity } from './product-overlay.js';

let popularProductsHTML = '';

popularProducts.forEach((product, index) => {
  const matchedId = matchingProductId(product.productId);
  const matchedColorId = matchingColorId(product.productId, product.defaultColor);
  const productRating = starRating(matchedId);
  const priceCents = formatPesoMoney(matchedColorId.priceCents);
  const delay = index * 100;

  popularProductsHTML += 
    `
      <div class="product-card js-product-card" data-product-id="${matchedId.id}" data-product-color="${product.defaultColor}" data-aos="fade-up"
      data-aos-delay="${delay}">
        <img class="product-logo" src="${matchedId.logo}" alt="product logo">
        <div class="product-picture">
            <img src="${matchedColorId.image}">
        </div>
        <div class="product-info">
          <div>
            <p class="product-name">${matchedColorId.name}</p>
            <div class="rating-container">
              <div class="star-rating">
                ${productRating.stars}
              </div>
              <div class="rating-count">
                <p>(${matchedId.rating.count})</p>
              </div>
            </div>
            <p class="product-price">&#8369 ${priceCents}</p>
          </div>
          <div class="add-to-cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
              <rect width="24" height="24" fill="none" />
              <path class="cart-icon-path1" fill="currentColor" d="M7.25 9A.75.75 0 0 1 8 8.25h3a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9" />
              <path class="cart-icon-path2" fill="currentColor" fill-rule="evenodd" d="M1.289 2.763a.75.75 0 0 1 .948-.475l.305.102c.626.209 1.155.385 1.572.579c.442.206.826.46 1.117.865c.291.403.412.848.467 1.333l.009.083h10.804c.976 0 1.792 0 2.417.092c.651.097 1.28.318 1.676.92c.396.6.352 1.265.184 1.902c-.16.61-.482 1.36-.867 2.258l-.467 1.089c-.176.412-.332.775-.493 1.062c-.175.31-.388.592-.711.805s-.667.298-1.021.337c-.328.035-.722.035-1.17.035H6.154c.074.134.159.244.255.341c.277.277.666.457 1.4.556c.755.101 1.756.103 3.191.103h8a.75.75 0 0 1 0 1.5h-8.055c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982s-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337V6.883c0-.713 0-1.185-.042-1.546c-.04-.342-.107-.506-.194-.626c-.086-.12-.221-.237-.533-.382c-.33-.153-.777-.304-1.453-.53l-.265-.087a.75.75 0 0 1-.474-.95m4.518 9.487h10.215c.496 0 .809-.001 1.046-.027c.219-.023.303-.062.356-.097s.122-.097.23-.289c.117-.208.24-.495.436-.95l.429-1c.414-.968.69-1.616.819-2.106c.126-.476.062-.62.014-.694c-.049-.073-.157-.189-.644-.26c-.501-.075-1.205-.077-2.257-.077H5.75V9.5c0 1.172 0 2.054.056 2.75m1.694 9.5a2.25 2.25 0 1 1 0-4.5a2.25 2.25 0 0 1 0 4.5m-.75-2.25a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0m7.5 0a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 0 0-4.5 0m2.25.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    `
});

document.querySelector('.js-product-grid')
  .innerHTML = popularProductsHTML;

productCartOverlay();

updateCartQuantity();


