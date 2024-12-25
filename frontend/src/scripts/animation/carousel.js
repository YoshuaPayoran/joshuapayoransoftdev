const nextBtn = document.getElementById('next-item');
const prevBtn = document.getElementById('prev-item');
const seeMoreBtn = document.querySelectorAll('.carousel-inner-container .see-more-button');
const carousel = document.querySelector('.carousel-inner-container');
const listHTML = document.querySelector('.carousel-inner-container .carousel-list');
const closeBtn = document.querySelector('.close-product-overlay');

nextBtn.addEventListener('click', () => {
  showSlider('next-item');
  resetAutoSlide(); // Reset the auto-slide timer when manually clicked
});

prevBtn.addEventListener('click', () => {
  showSlider('prev-item');
  resetAutoSlide(); // Reset the auto-slide timer when manually clicked
});

let nextPrevClickTimer;

function showSlider(type) {
  nextBtn.style.pointerEvents = 'none';
  prevBtn.style.pointerEvents = 'none';

  carousel.classList.remove('next', 'prev');
  let items = document.querySelectorAll('.carousel-inner-container .carousel-list .carousel-item');
  if (type === 'next-item') {
    listHTML.appendChild(items[0]);
    carousel.classList.add('next');
  } else {
    let positionLast = items.length - 1;
    listHTML.prepend(items[positionLast]);
    carousel.classList.add('prev');
  }

  clearTimeout(nextPrevClickTimer);
  nextPrevClickTimer = setTimeout(() => {
    nextBtn.style.pointerEvents = 'auto';
    prevBtn.style.pointerEvents = 'auto';
  }, 2000);
}

// Auto-slide functionality
let autoSlideInterval = setInterval(() => {
  showSlider('next-item');
}, 8000);

// Reset auto-slide when manual action occurs
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    showSlider('next-item');
  }, 8000);
}

seeMoreBtn.forEach((button) => {
  button.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Stop auto-slide when "See More" is clicked
  });
});

closeBtn.addEventListener('click', () => {
  resetAutoSlide(); // Resume auto-slide when the close button is clicked
});
