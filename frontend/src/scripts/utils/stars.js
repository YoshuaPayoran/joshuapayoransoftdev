export const productStars = [{
  starCount: 1, 
  stars: `<span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>`
}, {
  starCount: 1.5,
  stars: `<span class="fa fa-star checked"></span>
          <span class="fa fa-star-half-o checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>`
}, {
  starCount: 2,
  stars: `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>`
}, {
  starCount: 2.5,
  stars: `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-half-o checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>`
}, {
  starCount: 3,
  stars: `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>`
}, {
  starCount: 3.5,
  stars: `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-half-o checked"></span>
          <span class="fa fa-star"></span>`
}, {
  starCount: 4,
  stars: `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>`
}, {
  starCount: 4.5,
  stars: `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-half-o checked"></span>`
}, {
  starCount: 5,
  stars: `<span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>`
}]

export function starRating(products) {
  let matchingStar;

  productStars.forEach((productStar) => {
    if (products.rating.stars === productStar.starCount) {
      matchingStar = productStar;
    }
  });

  return matchingStar;
}