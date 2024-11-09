import { productCart } from "../data/product-cart.js";
import { matchingProductId } from "../utils/matched-id.js";
import { formatPesoMoney } from "../utils/money.js";
import { deliveryOptions } from "../data/delivery-options.js";
import { voucherCode } from "../data/voucher-code.js";

export function renderPaymentSummary () {
  let productPriceCents = 0;

  productCart.forEach((cartItem) => {
    const productItem = matchingProductId(cartItem.productId);
    productPriceCents += productItem.priceCents * cartItem.quantity;
  });

  document.querySelector('.js-items-total-price')
    .innerHTML = `&#8369; ${formatPesoMoney(productPriceCents)}`;

  let deliveryOptionId;
  document.querySelectorAll('.s-method-input-radio')
  .forEach((radio) => {
    if (radio.checked) {
      deliveryOptionId = radio.id;
    }
  });
  
  let shippingPriceCents;
  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.id === deliveryOptionId) {
      shippingPriceCents = deliveryOption.priceCents;
    }
  });
  
  let totalBeforeTaxCents = 0; 
  totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  
  // Change totalBeforeTax to let so it can be updated later
  let totalBeforeTax = formatPesoMoney(totalBeforeTaxCents); // This can be updated later
  document.querySelector('.js-total-before-tax-price')
    .innerHTML = `&#8369; ${totalBeforeTax}`;

  let taxCents = 0;
  taxCents = totalBeforeTaxCents * 0.12;
  let tax = formatPesoMoney(taxCents);
  document.querySelector('.js-estimated-tax')
    .innerHTML = `&#8369; ${tax}`;
  
  let totalPriceCents = 0;
  totalPriceCents = totalBeforeTaxCents + taxCents;
  let totalPrice = formatPesoMoney(totalPriceCents);

  document.querySelector('.js-total-price')
    .innerHTML = `&#8369; ${totalPrice}`;

  let voucherCodeDiscount = 0;

  document.getElementById('sumbit-voucher-code')
    .addEventListener('click', function() {
      const voucherCodeInput = document.getElementById('voucher-code').value; // Renamed variable to avoid conflict

      // Find the voucher in the voucherCode array
      const matchedVoucher = voucherCode.find(discountCode => discountCode.code === voucherCodeInput);

      if (matchedVoucher) {
        // If voucher is valid, apply the discount
        voucherCodeDiscount = matchedVoucher.discount;
        alert(`Voucher applied! You get a discount of ₱ ${formatPesoMoney(voucherCodeDiscount)}`);

        // Recalculate the total prices after applying the voucher
        // Apply the discount to the total before tax
        totalBeforeTaxCents = totalBeforeTaxCents - voucherCodeDiscount;

        // Recalculate the tax based on the new total before tax
        taxCents = totalBeforeTaxCents * 0.12;

        // Recalculate the total price after tax
        totalPriceCents = totalBeforeTaxCents + taxCents;

        // Format the updated prices
        totalBeforeTax = formatPesoMoney(totalBeforeTaxCents); // Reassign after update
        tax = formatPesoMoney(taxCents);
        totalPrice = formatPesoMoney(totalPriceCents);

        // Update the displayed prices
        document.querySelector('.js-total-before-tax-price')
          .innerHTML = `&#8369; ${totalBeforeTax}`;
        document.querySelector('.js-estimated-tax')
          .innerHTML = `&#8369; ${tax}`;
        document.querySelector('.js-total-price')
          .innerHTML = `&#8369; ${totalPrice}`;

        // Optionally, display the discount amount
        document.querySelector('.js-voucher-discount')
          .innerHTML = `&#8369; ${formatPesoMoney(voucherCodeDiscount)}`;

      } else {
        alert('Invalid voucher code');
      }
    });
}


export function updatePaymentShippingOption (selectedShippingOption) {
  let shippingOption;
  deliveryOptions.forEach ((deliveryOption) => {
    if(deliveryOption.id === selectedShippingOption){
      shippingOption = deliveryOption;
    }
  });
  return shippingOption;
}
