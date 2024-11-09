let currentQuantity = 1;

export function quantityManager() {
  const quantityContainer = document.querySelector(".quantity");
  const minusBtn = quantityContainer.querySelector(".minus");
  const plusBtn = quantityContainer.querySelector(".plus");
  const inputBox = quantityContainer.querySelector(".input-box");

  inputBox.min = inputBox.min || 1;
  inputBox.max = inputBox.max || 10;

  updateButtonStates();

  quantityContainer.addEventListener("click", handleButtonClick);
  inputBox.addEventListener("input", handleQuantityChange);

  function updateButtonStates() {
    const value = parseInt(inputBox.value);
    minusBtn.disabled = value <= parseInt(inputBox.min);
    plusBtn.disabled = value >= parseInt(inputBox.max);
  }

  function handleButtonClick(event) {
    if (event.target.classList.contains("minus")) {
      decreaseValue();
    } else if (event.target.classList.contains("plus")) {
      increaseValue();
    }
  }

  function decreaseValue() {
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? parseInt(inputBox.min) : Math.max(value - 1, parseInt(inputBox.min));
    inputBox.value = value;
    currentQuantity = value;
    updateButtonStates();
    handleQuantityChange();
  }

  function increaseValue() {
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? parseInt(inputBox.min) : Math.min(value + 1, parseInt(inputBox.max));
    inputBox.value = value;
    currentQuantity = value;
    updateButtonStates();
    handleQuantityChange();
  }

  function handleQuantityChange() {
    let value = parseInt(inputBox.value);
    const min = parseInt(inputBox.min);
    const max = parseInt(inputBox.max);

    if (isNaN(value) || value < min) value = min;
    else if (value > max) value = max;

    inputBox.value = value;
    currentQuantity = value;
    updateButtonStates();
  }
}

export function getCurrentQuantity() {
  return currentQuantity;
}
