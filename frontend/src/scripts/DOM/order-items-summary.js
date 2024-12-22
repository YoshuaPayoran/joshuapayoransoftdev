import { productCart, removeFromCart } from "../data/product-cart.js";
import { matchingColorId, matchingProductId, matchingSaleProduct } from "../utils/matched-id.js";
import { formatPesoMoney } from "../utils/money.js";
import { renderPaymentSummary } from "../function/payment-summary.js";

export function updateCartSummaryItem() {
  let cartSummaryHTML = '';

  // Generate cart summary HTML
  productCart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const selectedColorId = cartItem.colorId;
    const matchedColorId = matchingColorId(productId, selectedColorId);
    const matchedId = matchingProductId(productId);

    cartSummaryHTML += 
    `
      <div class="cart-item-container js-cart-item-container-${matchedId.id}-${matchedColorId.colorId}">
        <div class="item-thumbnail">
          <img src="${matchedColorId.mainImage}" alt="">
        </div>
        <div class="item-info-block">
          <div class="item-info-container">
            <div class="item-name">
              ${matchedColorId.name}
            </div>
            <div class="item-price">
              ${saleProductPrice(productId, matchedColorId)}
            </div>
            <div class="item-size">
              Size: ${cartItem.size}
            </div>
            <div class="item-quantity-text">
              Quantity: ${cartItem.quantity}
            </div>
          </div>
          <div class="delete-button js-delete-link" data-product-id="${matchedId.id}" data-product-size="${cartItem.size}" data-color-id="${selectedColorId}">
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
      const productColorId = link.dataset.colorId;
      removeFromCart(productId, productSize, productColorId);  
      updateCartSummaryItem(); 
      renderPaymentSummary();
    });
  });
}

function saleProductPrice(productId, matchedColorId) {
  const matchedSaleProduct = matchingSaleProduct(productId, matchedColorId.colorId);
  let cartItemPrice = '';
  if(matchedSaleProduct){
    const saleOffPrice = matchedSaleProduct.saleOff / 100;
    const productOffPrice = matchedColorId.priceCents * saleOffPrice;
    const discountedPriceCents = matchedColorId.priceCents - productOffPrice;
    cartItemPrice = `
      <div>
        <s style="color: gray">
          &#8369 ${formatPesoMoney(matchedColorId.priceCents)}
        </s>
        <span>
          &#8369 ${formatPesoMoney(discountedPriceCents)}
        </span>
      </div>
      <div>
        <span style="color: #007d48">
          ${matchedSaleProduct.saleOff}% OFF 
        </span>
      </div>
    `
  }else {
    cartItemPrice = `
      &#8369 ${formatPesoMoney(matchedColorId.priceCents)}
    `
  }

  return cartItemPrice;
}
