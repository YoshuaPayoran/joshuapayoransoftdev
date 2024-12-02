import { productCart } from "../data/product-cart.js";
import { matchingColorId } from "../utils/matched-id.js";
import { formatPesoMoney } from "../utils/money.js";
import { deliveryOptions } from "../data/delivery-options.js";
import { voucherCode } from "../data/voucher-code.js";

let voucherCodeDiscount = 0;

export function renderPaymentSummary() {
  let productPriceCents = 0;

  productCart.forEach((cartItem) => {
    const productItem = matchingColorId(cartItem.productId, cartItem.colorId);
    productPriceCents += productItem.priceCents * cartItem.quantity;
  });

  document.querySelector('.js-items-total-price').innerHTML = `&#8369; ${formatPesoMoney(productPriceCents)}`;

  let deliveryOptionId;
  document.querySelectorAll('.s-method-input-radio').forEach((radio) => {
    if (radio.checked) {
      deliveryOptionId = radio.id;
    }
  });

  let shippingPriceCents;
  const deliveryOptionPrice = deliveryOptions.find(deliveryOption => 
    deliveryOption.id === deliveryOptionId
  );

  shippingPriceCents = deliveryOptionPrice.priceCents;

  let totalBeforeTaxCents = productPriceCents; 
  if (voucherCodeDiscount) {
    totalBeforeTaxCents -= voucherCodeDiscount;
  }
  
  totalBeforeTaxCents += shippingPriceCents;
  
  let taxCents = totalBeforeTaxCents * 0.12;
  let totalPriceCents = totalBeforeTaxCents + taxCents;

  document.querySelector('.js-total-before-tax-price').innerHTML = `&#8369; ${formatPesoMoney(totalBeforeTaxCents)}`;
  document.querySelector('.js-estimated-tax').innerHTML = `&#8369; ${formatPesoMoney(taxCents)}`;
  document.querySelector('.js-total-price').innerHTML = `&#8369; ${formatPesoMoney(totalPriceCents)}`;
}


export function voucherDiscount() {
  document.getElementById('sumbit-voucher-code').addEventListener('click', function() {

    if (voucherCodeDiscount > 0) {
      alert('Voucher already applied!');
      return; // Prevent reapplying the same voucher
    }

    let totalBeforeTaxString = document.querySelector('.js-total-before-tax-price').innerHTML;
    let totalBeforeTaxCleanedString = totalBeforeTaxString
      .replace(/[^\d.-]/g, '')  // Remove everything except digits and decimal point
      .trim();

    let totalBeforeTaxCents = parseFloat(totalBeforeTaxCleanedString) * 100;

    let taxCents = totalBeforeTaxCents * 0.12;
    let totalPriceCents = totalBeforeTaxCents + taxCents;

    const voucherCodeInput = document.getElementById('voucher-code').value;
    const matchedVoucher = voucherCode.find(discountCode => 
      discountCode.code === voucherCodeInput
    );

    if (matchedVoucher) {
      voucherCodeDiscount = matchedVoucher.discount;
      alert(`Voucher applied! You get a discount of ₱ ${formatPesoMoney(voucherCodeDiscount)}`);

      totalBeforeTaxCents -= voucherCodeDiscount;
      taxCents = totalBeforeTaxCents * 0.12;
      totalPriceCents = totalBeforeTaxCents + taxCents;

      document.querySelector('.js-total-before-tax-price').innerHTML = `&#8369; ${formatPesoMoney(totalBeforeTaxCents)}`;
      document.querySelector('.js-estimated-tax').innerHTML = `&#8369; ${formatPesoMoney(taxCents)}`;
      document.querySelector('.js-total-price').innerHTML = `&#8369; ${formatPesoMoney(totalPriceCents)}`;
      document.querySelector('.js-voucher-discount').innerHTML = `&#8369; ${formatPesoMoney(voucherCodeDiscount)}`;
    } else {
      alert('Invalid voucher code');
    }
  });
}

export function updatePaymentShippingOption(selectedShippingOption) {
  const shippingOption = deliveryOptions.find(deliveryOption =>
      deliveryOption.id === selectedShippingOption
  );
  return shippingOption;
}
