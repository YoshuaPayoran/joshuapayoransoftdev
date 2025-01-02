export function scrollEffect() {
  const header = document.querySelector('header');
  let scrollTimeout; // Timer to detect when scrolling stops
  let mouseTimeout; // Timer for mouse move detection
  let isMouseNearTop = false; // Flag to track if mouse is near the top of the page

  window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;

    // Handle resizing effect (still active when scroll position is greater than 300)
    if (scrollPosition > 300) {
      header.classList.add('header-resize');
    } else {
      header.classList.remove('header-resize');
    }

    // Show the header while scrolling
    header.classList.remove('header-hidden');

    // Only hide the header when scroll position is greater than 1000
    if (scrollPosition > 1000 && !isMouseNearTop) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        header.classList.add('header-hidden');
      }, 500); // Delay the hiding a little after scrolling stops
    }

    // Prevent hiding the header if scroll position is below 1000
    if (scrollPosition <= 1000) {
      clearTimeout(scrollTimeout); // Clear the hide timeout if we scroll back up
      header.classList.remove('header-hidden'); // Make sure the header is shown
    }
  });

  // Make the header hide when the mouse moves away from the top
  window.addEventListener('mousemove', function (event) {
    clearTimeout(mouseTimeout); // Clear previous mouse timeout

    // If the mouse is near the top (within 100px), show the header immediately
    if (event.clientY <= 100) {
      isMouseNearTop = true;
      header.classList.remove('header-hidden');
    } else {
      isMouseNearTop = false;
      
      // Hide the header after 1.5 seconds of mouse moving away from the top
      if (window.scrollY > 1000) { // Only hide if scroll position is greater than 1000px
        mouseTimeout = setTimeout(() => {
          header.classList.add('header-hidden');
        }, 500); // Hide after .5 seconds
      }
    }
  });
}
