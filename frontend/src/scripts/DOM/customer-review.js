import { feedbackReview } from '../data/feedback-review.js';
import { starCount } from '../utils/stars.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const reviewContainer = document.querySelector('.js-customer-feedback');
const searchInput = document.getElementById('feedback-search');
const ratingDropdown = document.getElementById('feedback-review-star');

// Store the original feedbackReview to revert when needed
const originalFeedbackReview = [...feedbackReview];

// Function to generate feedback reviews with optional highlighting
function generateFeedbackReview(reviews, query = '') {
  let reviewHTML = '';

  reviews.forEach(review => {
    // Highlight matching text in the name and feedback (for search only)
    const highlightedName = query ? highlightMatch(review.name, query) : review.name;
    const highlightedFeedback = query ? highlightMatch(review.feedback, query) : review.feedback;

    reviewHTML += `
      <div class="customer-feedback-card ${review.rating}">
        <div class="customer-avatar">
          <img class="customer-picture" src="${review.picture}" alt="customer profile">
        </div>
        <div class="feedback-details">
          <div class="feedback-title-details">
            <div class="customer-detail-container">
              <div class="customer-name">
                ${highlightedName}
              </div>
              <div class="feedback-date">
                ${review.feedbackDate}
              </div>
            </div>
            <div class="feedback-star-container">
              ${starCount(review.rating)}
            </div>
          </div>
          <div class="feedback-content">
            ${highlightedFeedback}
          </div>
        </div>
      </div>
    `;
  });

  return reviewHTML;
}

// Helper function to highlight matching text in search results
function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi'); // Case-insensitive match
  return text.replace(regex, '<mark>$1</mark>'); // Wrap match with <mark>
}

// Update the review container with given reviews and optional query for highlighting
function updateReviewContainer(reviews, query = '') {
  const reviewHTML = generateFeedbackReview(reviews, query);
  reviewContainer.innerHTML = reviewHTML;
}

// Event Listener: Filter by Rating
ratingDropdown.addEventListener('change', (event) => {
  const selectedRating = event.target.value;

  let filteredReviews;

  switch (selectedRating) {
    case 'five-stars':
      filteredReviews = originalFeedbackReview.filter(review => review.rating === 5);
      break;
    case 'four-stars':
      filteredReviews = originalFeedbackReview.filter(review => review.rating === 4);
      break;
    case 'three-stars':
      filteredReviews = originalFeedbackReview.filter(review => review.rating === 3);
      break;
    case 'two-stars':
      filteredReviews = originalFeedbackReview.filter(review => review.rating === 2);
      break;
    case 'one-star':
      filteredReviews = originalFeedbackReview.filter(review => review.rating === 1);
      break;
    default: // 'all-rating'
      filteredReviews = [...originalFeedbackReview];
      break;
  }

  // Update container with filtered reviews
  updateReviewContainer(filteredReviews);
});

// Event Listener: Search by Name or Feedback Content
searchInput.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();

  // Filter reviews only for search without changing rating filter
  const searchedReviews = originalFeedbackReview.filter(review => 
    review.name.toLowerCase().includes(query) || 
    review.feedback.toLowerCase().includes(query)
  );

  // Update container with searched reviews (and highlight matches)
  updateReviewContainer(searchedReviews, query);
});

// Initial rendering of reviews
updateReviewContainer(originalFeedbackReview);

const reviewForm = document.getElementById('review-form');
const writeReviewButton = document.querySelector('.js-write-review-button');

writeReviewButton.addEventListener('click', () => {
  reviewForm.classList.add('active-flex');
  console.log('User clicked on "Write a review" button');
  window.location.href = '#review-form';
});

const dropdowns = document.querySelectorAll('.select-wrapper');

dropdowns.forEach(wrapper => {
  const select = wrapper.querySelector('select');

  // Toggle 'open' class on mousedown (before the dropdown opens)
  select.addEventListener('mousedown', () => {
    wrapper.classList.toggle('open');
  });

  // Remove 'open' class when the user selects an option
  select.addEventListener('change', () => {
    wrapper.classList.remove('open');
  });

  // Remove 'open' class on blur (when the dropdown loses focus)
  select.addEventListener('blur', () => {
    wrapper.classList.remove('open');
  });
});

// Get all the radio buttons
const ratingInputs = document.querySelectorAll('.star-icon input');
let selectedRating; // To store the selected rating number

ratingInputs.forEach(input => {
  input.addEventListener('change', () => {
    selectedRating = input.id.replace('rating', ''); // Get the rating number from the input's id
  });
});

const submitBtnElement = document.getElementById('feedback-submit-btn');
const nameInputElement = document.getElementById('feedback-customer-name');
const emailInputElement = document.getElementById('feedback-customer-email');
const feedbackInputElement = document.getElementById('customer-feedback-message');
const ratingError = document.querySelector('.rating-error');

submitBtnElement.addEventListener('click', () => {
  handleInputError(nameInputElement);
  handleInputError(emailInputElement);
  handleInputError(feedbackInputElement);

  ratingError.classList.remove('high-opacity');

  const name = nameInputElement.value.trim();
  const email = emailInputElement.value.trim();
  const feedback = feedbackInputElement.value.trim();

  // Check if all fields are filled
  let formValid = true;

  if (!name) formValid = false;
  if (!email) formValid = false;
  if (!feedback) formValid = false;
  if (!selectedRating) formValid = false;

  // If any field is invalid, show the rating error
  if (!formValid) {
    if (!selectedRating) ratingError.classList.add('high-opacity');
  } else {
    submitToFeedbackReview(name, email, feedback, selectedRating);
  }
});

// Helper function to manage error display
function handleInputError(inputElement) {
  if (!inputElement.value.trim()) {
    inputElement.classList.add('error-border');
  } else {
    inputElement.classList.remove('error-border');
  }
}

const today = dayjs

function submitToFeedbackReview(name, email, feedback, rating) {
  const newReview = {
    picture: 'frontend/src/images/customers/customer-profile.jpg',
    rating: parseInt(rating),
    name,
    email,
    feedbackDate: today().format('MMMM D, YYYY'),
    feedback,
  };

  // Add the new review at the start of the feedbackReview array
  feedbackReview.unshift(newReview);  // Adds the new review at the top of the array

  updateReviewContainer(feedbackReview); // Update the review display container
  reviewForm.classList.remove('active-flex');
  reviewForm.reset();
}