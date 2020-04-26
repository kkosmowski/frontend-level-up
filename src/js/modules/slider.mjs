import { isDesktop } from './responsiveness';
import SliderProducts from '../../assets/slider-products';
import { handlePriceCases, priceFormat, renderProductPrice } from './helpers';

const handleSlider = () => {
  // custom slider, probably an overkill, but I've always wanted to write one
  const sliderPrevButton = document.querySelector('.main-slider__button--prev');
  const sliderNextButton = document.querySelector('.main-slider__button--next');
  const mainSlider = document.querySelector('.main-slider');
  const mainSliderContainer = document.querySelector('.main-slider__container');
  const mainSliderSlides = document.querySelector('.main-slider__slides');

  createSlider(mainSliderSlides);

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

const createSlider = (slides) => {

  // map each product from json into slider product slide
  SliderProducts.map((item) => {
    const slide = document.createElement('li');
    slide.classList.add('main-slider__slide', 'product', 'product--details-on-image');

    const image = document.createElement('div');
    image.classList.add('product__image');

    const details = document.createElement('p');
    details.classList.add('product__details');

    const name = document.createElement('a');
    name.classList.add('product__name');
    name.href = '#';
    name.textContent = item.name;

    const price = document.createElement('span');
    price.classList.add('product__price');
    renderProductPrice(item, price, true);

    details.appendChild(name);
    details.appendChild(price);
    slide.appendChild(image);
    slide.appendChild(details);
    slides.appendChild(slide);
  });
};

export default handleSlider;
