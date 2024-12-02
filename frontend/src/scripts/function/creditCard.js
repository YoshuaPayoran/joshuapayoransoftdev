export function creditCardPattern() {
  // Format the credit card number input
  const creditCardNumberInput = document.getElementById('creditCard-number-default');
  creditCardNumberInput?.addEventListener('input', (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
  });

  // Restrict CVV input to digits only
  const creditCardCVVInput = document.getElementById('creditCard-cvv-default');
  creditCardCVVInput?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, ''); // Remove non-digits
  });

  // Populate expiry year dropdown
  const yearDropdown = document.getElementById('creditCard-expiry-year');
  if (yearDropdown) {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 10; i++) {
      const year = currentYear + i;
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearDropdown.appendChild(option);
    }
  }
  }
