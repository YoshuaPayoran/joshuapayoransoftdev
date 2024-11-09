import { creditCardPattern } from '../checkout/creditCard.js';
import { addressFormCompleted, continuePaymentMethod} from '../checkout/forms.js';
import { isInputEmpty, getProvinceStatus, shippingSummaryInfo, selectedDeliveryOption, validateZipCode } from '../function/shippingform.js';
import { deliveryOptions } from '../data/delivery-options.js';
import { formatPesoMoney } from '../utils/money.js'
import { renderPaymentSummary, updatePaymentShippingOption } from '../function/payment-summary.js';
import { updateCartSummaryItem } from '../function/order-items-summary.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
creditCardPattern();

const inputElements = document.querySelectorAll('.js-address-input');
const selectElements = document.querySelectorAll('.js-address-select');
const errorDiv = document.querySelectorAll('.name-error');

document.querySelector(".js-address-button")
  .addEventListener("click", () => {
  validateForm();
});

function validateForm() {
  const provinceStatus = getProvinceStatus(selectElements);
  const hasEmptyInput = isInputEmpty(inputElements, errorDiv);
  const zipCodeDigits = validateZipCode();
  const isEmpty = hasEmptyInput || provinceStatus.isEmpty || zipCodeDigits;

  // Only proceed if `isEmpty` is `false`
  if (!isEmpty) {
    addressFormCompleted();
    shippingSummaryHTML(provinceStatus.province);
    location.href = '#shipping-method'; 
  }
}

function shippingSummaryHTML(province) {
  const summaryInfo = shippingSummaryInfo(inputElements);

  document.querySelector('.s-form-summary')
    .innerHTML = `
      <div>${summaryInfo.firstNameLastName}</div>
      <div>${summaryInfo.barangay}</div>
      <div>${province}, ${summaryInfo.provinceCity}</div>
    `;
}
const today = dayjs();
let deliveryOptionsHTML = '';

deliveryOptions.forEach((deliveryOption, index) => {
  const deliveryDateFrom = today.add(deliveryOption.deliveryDayFrom, 'days');
  const deliveryDateTo = today.add(deliveryOption.deliveryDayTo, 'days');
  const dateFromString = deliveryDateFrom.format('dddd, MMMM D');
  const dateToString = deliveryDateTo.format('dddd, MMMM D');
  const priceString = deliveryOption.priceCents
  === 0
    ? `${priceFree()}`
    : `&#8369; ${formatPesoMoney(deliveryOption.priceCents)}`;

  const checkedAttribute = index === 0 ? 'checked' : '';

  deliveryOptionsHTML += 
  `
    <div class="s-method-container">
      <input type="radio" class="s-method-input-radio" id="${deliveryOption.id}" name="shipping-option1" ${checkedAttribute}>
      <label for="${deliveryOption.id}" class="s-method-label">
        <div class="s-method-title-price">
          <div class="s-method-title">
            ${deliveryOption.name}
          </div>
          <div class="s-method-price">
            ${priceString}
          </div>
        </div>
        <div class="s-method-delivery-time">
          Estimated delivery date is between ${dateFromString} - ${dateToString}
        </div>
      </label>
    </div>
  `
});

document.querySelector('.deliver-options')
  .innerHTML = deliveryOptionsHTML;


let selectedShippingOption = deliveryOptions[0].id;

function updateShippingPrice() {
  const shippingOption = updatePaymentShippingOption(selectedShippingOption);
  const priceString = shippingOption.priceCents === 0
    ? `${priceFree()}`
    : `&#8369; ${formatPesoMoney(shippingOption.priceCents)}`;
  document.querySelector('.js-payment-shipping-price').innerHTML = priceString;
}

updateShippingPrice();

document.querySelectorAll('.s-method-input-radio').forEach((radio) => {
  radio.addEventListener('change', (event) => {
    if (event.target.checked) {
      selectedShippingOption = event.target.id; 
      const shippingOption = updatePaymentShippingOption(selectedShippingOption);
      const priceString = shippingOption.priceCents
      === 0
      ? `${priceFree()}`
      : `&#8369; ${formatPesoMoney(shippingOption.priceCents)}`;

      document.querySelector('.js-payment-shipping-price')
        .innerHTML = priceString;
    }
  });
});

function continueToPayment() {
  if (selectedShippingOption) {
    continuePaymentMethod();
    location.href = '#payment-method'; 
  } else {
    alert("Please select a shipping option before continuing.");
  }
}

document.querySelector('.s-method-button')
  .addEventListener('click', () => {
    continueToPayment();
    const selectedOption = selectedDeliveryOption(selectedShippingOption);
    deliverySummaryHTML (selectedOption);
  });

function deliverySummaryHTML (selectedOption) {
  const deliverySummary = document.querySelector('.s-method-summary-container')
  const deliveryDateFrom = today.add(selectedOption.deliveryDayFrom, 'days');
  const deliveryDateTo = today.add(selectedOption.deliveryDayTo, 'days');
  const dateFromString = deliveryDateFrom.format('MMMM D');
  const dateToString = deliveryDateTo.format('MMMM D');
  const priceString = selectedOption.priceCents
  === 0 
    ? `${priceFree()}`
    : `&#8369; ${formatPesoMoney(selectedOption.priceCents)}`;

  deliverySummary.innerHTML = `
    <div class="s-method-option">${selectedOption.name}</div>
    <div class="delivery-day">${dateFromString} - ${dateToString}</div>
    <div class="delivery-price">${priceString}</div>
  `
} 

function priceFree() {
  return `
    <span class="deprecated-price">
      <s>
        &#8369; 175.00
      </s>
    </span>
    <span style="color: red;">
      FREE
    </span>
  `
}
updateCartSummaryItem();
renderPaymentSummary();