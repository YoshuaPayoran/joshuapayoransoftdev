import { productCart, removeFromCart } from "../data/product-cart.js";
import { matchingProductId } from "../utils/matched-id.js";
import { formatPesoMoney } from "../utils/money.js";
import { renderPaymentSummary } from "./payment-summary.js";

export function updateCartSummaryItem() {
  let cartSummaryHTML = '';

  // Generate cart summary HTML
  productCart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchedId = matchingProductId(productId);
    const priceCents = formatPesoMoney(matchedId.priceCents);

    cartSummaryHTML += 
    `
      <div class="cart-item-container js-cart-item-container-${matchedId.id}">
        <div class="item-thumbnail">
          <img src="${matchedId.mainImage}" alt="">
        </div>
        <div class="item-info-block">
          <div class="item-info-container">
            <div class="item-name">
              ${matchedId.name}
            </div>
            <div class="item-price">
              &#8369; ${priceCents}
            </div>
            <div class="item-size">
              Size: ${cartItem.size}
            </div>
            <div class="item-quantity-text">
              Quantity: ${cartItem.quantity}
            </div>
          </div>
          <div class="delete-button js-delete-link" data-product-id="${matchedId.id}" data-product-size="${cartItem.size}">
            <svg class="delete-button-svg" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
              <rect width="24" height="24" fill="none" />
              <g fill="none">
                <path class="path1" fill="grey" d="M8 21h8a2 2 0 0 0 2-2V7H6v12a2 2 0 0 0 2 2" opacity="0.16" />
                <path class="path2" stroke="grey" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-cart-summary')
    .innerHTML = cartSummaryHTML;

  let cartQuantity = 0;
  productCart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-product-cart-quantity-summary')
    .innerHTML = `Items (${cartQuantity}): `;

  document.querySelector('.js-product-cart-summary-quantity')
    .innerHTML = cartQuantity;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const productSize = link.dataset.productSize;
      removeFromCart(productId, productSize);  
      updateCartSummaryItem(); 
      renderPaymentSummary();
    });
  });
}
