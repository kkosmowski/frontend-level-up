import { isDesktop } from './responsiveness';
import { renderProductPrice } from './helpers';

const handleSlider = (productList) => {
  // generate slider
  const sliderPrevButton = document.querySelector('.main-slider__button--prev');
  const sliderNextButton = document.querySelector('.main-slider__button--next');
  const mainSlider = document.querySelector('.main-slider');
  const mainSliderContainer = document.querySelector('.main-slider__container');
  const mainSliderSlides = document.querySelector('.main-slider__slides');

  renderSliderProducts(mainSliderSlides, productList); // render actual products

  if (isDesktop) {
    // buttons and sliding logic should be used only on desktop
    const slide = document.querySelector('.main-slider__slide');
    const move = slide.getBoundingClientRect().width + parseInt(window.getComputedStyle(slide).marginRight);

    mainSliderSlides.style.left = '0';
    sliderPrevButton.disabled = true;

    mainSlider.addEventListener('click', (e) => {
      const maxMove = mainSliderSlides.getBoundingClientRect().width - mainSliderContainer.getBoundingClientRect().width;

      if (e.target === sliderPrevButton && parseInt(mainSliderSlides.style.left) < 0) {
        mainSliderSlides.style.left = Math.min(parseInt(mainSliderSlides.style.left) + move, 0) + 'px';
      }
      else if (e.target === sliderNextButton && parseInt(mainSliderSlides.style.left) < maxMove) {
        mainSliderSlides.style.left = Math.max(parseInt(mainSliderSlides.style.left) - move, -maxMove) + 'px';
      }

      if (parseInt(mainSliderSlides.style.left) === 0) {
        sliderPrevButton.disabled = true;
      } else if (parseInt(mainSliderSlides.style.left) === -maxMove) {
        sliderNextButton.disabled = true;
      } else {
        sliderPrevButton.disabled = false;
        sliderNextButton.disabled = false;
      }
    });
  }
};

const renderMockedSlider = (itemCount) => {
  // map each product from json into slider product slide
  for (let i = 0; i < itemCount; i++) {
    const slide = document.createElement('li');
    slide.classList.add('main-slider__slide', 'product--mocked', 'product', 'product--details-on-image');

    const image = document.createElement('div');
    image.classList.add('product__image');

    const details = document.createElement('p');
    details.classList.add('product__details');

    const name = document.createElement('a');
    name.classList.add('product__name');
    name.href = '#';

    const price = document.createElement('span');
    price.classList.add('product__price');

    details.appendChild(name);
    details.appendChild(price);
    slide.appendChild(image);
    slide.appendChild(details);
    document.querySelector('.main-slider__slides').appendChild(slide);
  }
};

const renderSliderProducts = (slides, productList) => {
  // when products are received, update each mocked product with actual data
  productList.map((item) => {
    const slideElement = document.querySelector('.main-slider__slide.product--mocked');
    slideElement.querySelector('.product__image').style.backgroundImage = `url('${ '//' + item.imageUrl }')`;
    slideElement.querySelector('.product__name').textContent = item.name;

    renderProductPrice(item, slideElement.querySelector('.product__price'), true);

    slideElement.classList.remove('product--mocked'); // product is no longer mocked
  });
};

export default handleSlider;
export { renderMockedSlider };
