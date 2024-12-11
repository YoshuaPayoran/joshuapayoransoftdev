let nextBtn = document.getElementById('next-item');
let prevBtn = document.getElementById('prev-item');
let seeMoreBtn = document.querySelector('.see-more-button');
let carousel = document.querySelector('.carousel-inner-container');
let listHTML = document.querySelector('.carousel-inner-container .carousel-list');

nextBtn.addEventListener('click', () => {
  showSlider('next-item');
});

prevBtn.addEventListener('click', () => {
  showSlider('prev-item');
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
  }else {
    let positionLast = items.length - 1;
    listHTML.prepend(items[positionLast]);
    carousel.classList.add('prev');
  }

  clearTimeout(nextPrevClickTimer)
  nextPrevClickTimer = setTimeout(() => {
    nextBtn.style.pointerEvents = 'auto';
    prevBtn.style.pointerEvents = 'auto';
  }, 2000);
}