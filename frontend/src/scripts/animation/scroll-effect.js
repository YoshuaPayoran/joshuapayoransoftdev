export function scrollEffect(){
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 10 && scrollPosition < 800) {
      header.classList.add('header-shadow');
    } else {
      header.classList.remove('header-shadow');
    }

    if (scrollPosition > 300) {
      header.classList.add('header-resize');
    } else {
      header.classList.remove('header-resize');
    }
	});
}



