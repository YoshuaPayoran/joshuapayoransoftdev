import { saleProducts } from "../data/saleProducts.js";
import { matchingColorId, matchingProductId } from "../utils/matched-id.js";
import { formatPesoMoney, salePrice } from "../utils/money.js";
import { productStars } from "../utils/stars.js";

let carouselProductsHTML = '';

saleProducts.forEach((product) => {
  const matchedColorId = matchingColorId(product.productId, product.colorId);
  const matchedId = matchingProductId(product.productId);
  const discountedPrice = salePrice(product.saleOff, matchedColorId.priceCents);
  const discountedPriceCents = formatPesoMoney(discountedPrice);
  const productStar = productStars.find(star => star.starCount === matchedId.rating.stars);

  carouselProductsHTML += `
    <div class="carousel-item">
      <img src="${matchedColorId.image}" alt="">
      <div class="item-intro">
        <div class="sale-offer-text">
          SALE ${product.saleOff}%
        </div>

        <div class="carousel-item-name">
          ${matchedColorId.name}
        </div>

        <div class="star-rating-container">
          <div class="star-rating">
            ${productStar.stars}
          </div>
        </div>

        <div class="carousel-item-price">
          <s style="color: gray">
            &#8369 ${formatPesoMoney(matchedColorId.priceCents)}
          </s>
          <span class="discounted-price">
            &#8369 ${discountedPriceCents}
          </span>
        </div>

        <div class="des-container">
          ${product.productDes}
        </div>

        <button class="see-more-button">
          See more &#8599
        </button>
      </div>
    </div>
  
  `
});

document.querySelector('.carousel-list')
  .innerHTML = carouselProductsHTML;