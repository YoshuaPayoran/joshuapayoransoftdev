export function creditCardPattern () {
  document.getElementById('creditCard-number-default').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); 
    e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  });

  document.getElementById('creditCard-cvv-default').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/\D/g, ''); // Removes any non-digit character
  });

  document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    const yearDropdown = document.getElementById('creditCard-expiry-year');

    for (let i = 0; i <= 10; i++) {
      const year = currentYear + i;
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearDropdown.appendChild(option);
    }
  });
}