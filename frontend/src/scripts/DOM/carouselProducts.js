import { saleFiveProducts } from "../data/saleProducts.js";
import { matchingColorId, matchingProductId, matchingSaleProduct } from "../utils/matched-id.js";
import { formatPesoMoney, salePrice } from "../utils/money.js";
import { productStars } from "../utils/stars.js";

let carouselProductsHTML = '';

saleFiveProducts.forEach((product) => {
  const matchedColorId = matchingColorId(product.productId, product.colorId);
  const matchedId = matchingProductId(product.productId);
  const matchingSale = matchingSaleProduct (matchedId.id, matchedColorId.colorId);
  const discountedPrice = salePrice(matchingSale.saleOff, matchedColorId.priceCents);
  const discountedPriceCents = formatPesoMoney(discountedPrice);
  const productStar = productStars.find(star => star.starCount === matchedId.rating.stars);

  carouselProductsHTML += `
    <div class="carousel-item">
      <img src="${matchedColorId.image}" alt="">
      <div class="item-intro">
        <div class="sale-offer-text">
          SALE ${matchingSale.saleOff}%
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

        <button class="see-more-button" data-product-id="${product.productId}" data-color-id="${product.colorId}">
          See more &#8599
        </button>
      </div>
    </div>
  
  `
});

document.querySelector('.carousel-list')
  .innerHTML = carouselProductsHTML;