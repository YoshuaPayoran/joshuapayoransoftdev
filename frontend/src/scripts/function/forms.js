
export function addressFormCompleted() {
    shippingAddressCompleted ();
    shippingMethodActive ();
}
  
  document.querySelector('.shipping-edit-button').addEventListener('click', () => {
    shippingAddressActive ();
    shippingMethodInactive ();
    paymentInactive ();
  });

export function continuePaymentMethod () {
    shippingMethodCompleted ();
    paymentActive ();
  }

  document.querySelector('.s-method-edit-button').addEventListener('click', () => {
    shippingMethodActive ();
    paymentInactive ();
    shippingAddressCompleted ();
  });

  const displayEwallet = document.querySelector('.eWallet-form-container');
  const displayCreditCard = document.querySelector('.payment-via-creditCard-block');

  function togglePaymentOption(selectedOption) {
    if (selectedOption === 'creditCard') {
      displayEwallet.classList.add('inactive');
      displayCreditCard.classList.remove('inactive');
    } else if (selectedOption === 'eWallet') {
      displayEwallet.classList.remove('inactive');
      displayCreditCard.classList.add('inactive');
    }
  }

  document.querySelectorAll('.s-payment-input-radio').forEach((radio) => {
    radio.addEventListener('change', () => {
      const targetId = radio.getAttribute('data-target');
      togglePaymentOption(radio.id.includes('creditCard') ? 'creditCard' : 'eWallet');
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });


  const shippingSummary = document.querySelector('.s-form-summary-info');
  const checkoutStep = document.querySelector('.s-checkout-step');
  const checkoutForm = document.querySelector('.s-checkout-form');
  const shippingFormBody = document.querySelector('.s-form-body-content');

  function shippingAddressActive () {
    checkoutForm.classList.remove('s-checkout-form-completed');
    checkoutStep.classList.remove('s-checkout-step-completed');
    shippingSummary.classList.remove('s-form-summary-info-active');
    shippingFormBody.classList.add('active-block');
  }

  function shippingAddressCompleted () {
    checkoutForm.classList.add('s-checkout-form-completed');
    checkoutStep.classList.add('s-checkout-step-completed');
    shippingSummary.classList.add('s-form-summary-info-active');
    shippingFormBody.classList.remove('active-block');
    shippingMethodStep.classList.add('s-method-step-active')
    shippingMethodStep.classList.remove('s-method-step-completed');
  }

  const shippingMethodHeader = document.querySelector('.s-method-header');
  const shippingMethodSummary = document.querySelector('.s-method-summary');
  const shippingMethodBody = document.querySelector('.s-method-body-content');
  const shippingMethodForm = document.querySelector('.s-method-form');
  const shippingMethodStep = document.querySelector('.s-method-step');

  function shippingMethodActive () {
    shippingMethodForm.classList.remove('s-method-form-completed');
    shippingMethodSummary.classList.remove('s-method-summary-active');
    shippingMethodHeader.classList.add('s-method-header-active');
    shippingMethodBody.classList.add('active-block');
    shippingMethodStep.classList.add('s-method-step-active');
    shippingMethodStep.classList.remove('s-method-step-completed');
  }

  function shippingMethodInactive () {
    shippingMethodHeader.classList.remove('s-method-header-active');
    shippingMethodBody.classList.remove('active-block');
    shippingMethodStep.classList.remove('s-method-step-active');
    shippingMethodSummary.classList.remove('s-method-summary-active');
  }

  function shippingMethodCompleted () {
    shippingMethodStep.classList.remove('s-method-step-active');
    shippingMethodStep.classList.add('s-method-step-completed');
    shippingMethodBody.classList.remove('active-block');
    shippingMethodSummary.classList.add('s-method-summary-active');
    shippingMethodForm.classList.add('s-method-form-completed');
  }

  const paymentHeader = document.querySelector('.s-payment-header');
  const paymentBodyContent = document.querySelector('.s-payment-body-content');
  const paymentStep = document.querySelector('.s-payment-step');

  function paymentActive (){
    paymentHeader.classList.add('s-payment-header-active');
    paymentBodyContent.classList.add('active-block');
    paymentStep.classList.add('s-payment-step-active');
  }

  function paymentInactive (){
    paymentHeader.classList.remove('s-payment-header-active');
    paymentBodyContent.classList.remove('active-block');
    paymentStep.classList.remove('s-payment-step-active');
  }
