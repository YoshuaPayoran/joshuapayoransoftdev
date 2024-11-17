export function generateNewsHTML() {
  const infiniteNews = [
  'Get more for less—shop now!', 
  "Flash sale items—don’t miss out!",
  'Unlock discounts at checkout!',
  'Final sale—best prices today!',
  'Limited-time offers just for you!'
  ]

  let newHTML = '';
  infiniteNews.forEach((news) => {
    newHTML += 
    `
      <li>
        ${news}
      </li>
    `
  });

  document.querySelector('.first-loop')
    .innerHTML = newHTML;
  document.querySelector('.second-loop')
    .innerHTML = newHTML;
}