import { deliveryOptions } from "../data/delivery-options.js";
export function isInputEmpty(inputElements, errorDivs) {
  let isEmpty = false;

  inputElements.forEach((input, index) => {
    if (input.value.trim() === '') {
      isEmpty = true;
      input.classList.add('error');
      errorDivs[index].classList.add('show-object'); 
    } else {
      input.classList.remove('error');
      errorDivs[index].classList.remove('show-object');
    }
  });

  return isEmpty;
}


export function getProvinceStatus(selectElements) {
  const selectionError = document.querySelector('.selection-error');
  let isEmpty = false;
  let province = '';

  selectElements.forEach((select) => {
    if (select.value === 'default' || select.value === '') {
      selectionError.classList.add('show-object');
      isEmpty = true;
      return;
    } else {
      selectionError.classList.remove('show-object');
      province = select.options[select.selectedIndex].text;
    }
  });

  return { isEmpty, province };
}

export function validateZipCode() {
  const zipcodeError = document.querySelector('.zipcode-error');
  let isEmpty = false;
  const zipInput = document.getElementById('s-form-zipcode-default');
  if (zipInput.value.length === 4 && /^\d{4}$/.test(zipInput.value)) {
    zipInput.classList.remove('error');
    zipcodeError.classList.remove('show-object');
    isEmpty = false;
  } else {
    zipcodeError.classList.add('show-object');
    zipInput.classList.add('error');
    isEmpty = true;

  }
  return isEmpty;
}

export function shippingSummaryInfo(inputElements) {
  return {
    firstNameLastName: inputElements[0].value + ' ' + inputElements[1].value,
    barangay: inputElements[3].value + ', ' + inputElements[4].value,
    provinceCity: inputElements[5].value,
  };
}

export function selectedDeliveryOption (selectedShippingOption) {
  let deliverySelected;
  deliveryOptions.forEach((deliveryOption) => {
    if(deliveryOption.id === selectedShippingOption) {
      deliverySelected = deliveryOption;
    }
  }); 
  return deliverySelected
}

