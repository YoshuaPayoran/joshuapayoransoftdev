import { adidasProducts } from "../data/adidas.js";
import { converseProducts } from "../data/converse.js";
import { nikeProducts } from "../data/nike.js";
import { jordanProducts } from "../data/jordan.js";
import { pumaProducts } from "../data/puma.js";
import { viewProductOverlay } from "./product-overlay.js";
import { matchingColorId, matchingProductId } from "../utils/matched-id.js";
import { starRating } from "../utils/stars.js";
import { formatPesoMoney } from "../utils/money.js";

// Map to associate brand ids with product arrays
const brandDataMap = {
  'adidas': adidasProducts,
  'converse': converseProducts,
  'nike': nikeProducts,
  'jordan': jordanProducts,
  'puma': pumaProducts
};

const seeLessBtnElement = document.querySelector('.brand-see-less-button');

document.querySelectorAll('.brand-nav-button').forEach((navBtn) => {
  navBtn.addEventListener('click', () => {
    const brandId = navBtn.dataset.brandId;
    seeLessBtnElement.style.display = 'none';
    // Fetch and display the products for the clicked brand
    const productHTML = brandProductsHTML(brandId);
    document.querySelector('.js-shop-product-grid').innerHTML = productHTML;

    // Move the slider to the clicked button
    moveSlider(navBtn);
  });
});

// Add the "active" class to the default button (Adidas)
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.brand-nav-button').classList.add('active');
  const productHTML = brandProductsHTML('adidas');
  document.querySelector('.js-shop-product-grid').innerHTML = productHTML;
});

const seeMoreBtn = document.querySelector('.brand-see-more-button');

// Function to move the slider
function moveSlider(button) {
  const slider = document.querySelector('.slider');
  const buttonRect = button.getBoundingClientRect();
  const containerRect = button.parentElement.getBoundingClientRect();

  // Calculate the new position of the slider
  const leftPosition = buttonRect.left - containerRect.left;

  // Update the slider position and width
  slider.style.left = `${leftPosition}px`;
  slider.style.width = `${buttonRect.width}px`;

  // Remove active class from all buttons
  document.querySelectorAll('.brand-nav-button').forEach((btn) => btn.classList.remove('active'));

  // Add active class to the clicked button
  button.classList.add('active');
}


function brandProductsHTML(brandId, showAll = false) {
  const brandProducts = brandDataMap[brandId] || []; // Get the corresponding product array for the brandId
  let productHTML = '';
  const limit = 8; // Limit to 8 products
  const productsToDisplay = showAll ? brandProducts : brandProducts.slice(0, limit); // Show all or limit to 8

  if (!showAll && brandProducts.length > 8) {
    seeMoreBtn.style.display = 'flex';
  } else {
    seeMoreBtn.style.display = 'none';
  }

  productsToDisplay.forEach((product) => {
    const matchedId = matchingProductId(product.productId);
    const matchedColorId = matchingColorId(product.productId, product.colorId);
    const productRating = starRating(matchedId);
    productHTML += `
      <div class="product-card js-product-card" data-product-id="${matchedId.id}" data-product-color="${product.colorId}">
        <img class="product-logo" src="${matchedId.logo}" alt="product logo">
        <div class="product-picture">
            <img src="${matchedColorId.image}">
        </div>
        <div class="product-info">
          <div>
            <p class="product-name">${matchedColorId.name}</p>
            <div class="rating-container">
              ${productRating.stars}
              <div class="rating-count">
                <p>(${matchedId.rating.count})</p>
              </div>
            </div>
            <p class="product-price">&#8369 ${formatPesoMoney(matchedColorId.priceCents)}</p>
          </div>
          <div class="add-to-cart">
            <!-- Add to cart icon -->
          </div>
        </div>
      </div>
    `;
  });

  return productHTML;
}

// Add event delegation to the parent container of product cards
document.querySelector('.js-shop-product-grid').addEventListener('click', (event) => {
  const card = event.target.closest('.js-product-card'); // Check if a product card was clicked
  if (card) {
    const productId = card.dataset.productId;
    const productColor = card.dataset.productColor;
    viewProductOverlay(productId, productColor);
  }
});

const seeMoreBtnElement = document.querySelector('.brand-see-more-button-element');

seeMoreBtnElement.addEventListener('click', () => {
  const activeBrandId = document.querySelector('.brand-nav-button.active').dataset.brandId;
  const productHTML = brandProductsHTML(activeBrandId, true); // Pass true to remove the limit
  seeLessBtnElement.style.display = 'flex';
  document.querySelector('.js-shop-product-grid').innerHTML = productHTML;
});

seeLessBtnElement.addEventListener('click', () => {
  const activeBrandId = document.querySelector('.brand-nav-button.active').dataset.brandId;
  const productHTML = brandProductsHTML(activeBrandId, false); // Pass false to limit to 8
  seeLessBtnElement.style.display = 'none';
  document.querySelector('.js-shop-product-grid').innerHTML = productHTML;
});