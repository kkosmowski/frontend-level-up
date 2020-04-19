import './styles/style.scss';
import Logo from './assets/images/logo-zonex.svg';
import PaymentProviders from './assets/images/payment.png';
import SliderProducts from './assets/slider-products';

const isDesktop = matchMedia('(min-width: 1000px) and (pointer: fine').matches;
const isTablet = matchMedia('(min-width: 600px) and (max-width: 1199px) and (pointer: coarse').matches;
const isMobile = matchMedia('(max-width: 599px)').matches;

const renderLogo = () => {
  document.querySelector('.header__logo').src = Logo;
};

const renderBackgroundsDependingOnDevice = () => {
  // optimize assets depending on whether the device is a mobile or desktop

  document.querySelector('.main-header').classList.add(isMobile ? 'mobile' : 'desktop');
};

const renderProductImages = () => {
  [...document.querySelectorAll('.product__image')].map((productImage) => {
    let { width, height } = productImage.getBoundingClientRect();
    productImage.style.backgroundImage = `url(//via.placeholder.com/${ Math.floor(width) }x${ Math.floor(height) }.png)`
  });
};

const handleSlider = () => {
  // custom slider, probably an overkill, but I've always wanted to write one

  const sliderPrevButton = document.querySelector('.main-slider__button--prev');
  const sliderNextButton = document.querySelector('.main-slider__button--next');
  const mainSlider = document.querySelector('.main-slider');
  const mainSliderContainer = document.querySelector('.main-slider__container');
  const mainSliderSlides = document.querySelector('.main-slider__slides');

  createSlider(mainSliderSlides);

  if (isDesktop) {
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
  const format = (number) => `$${ number.toFixed(2) }`;

  SliderProducts.map((item) => {
    const slide = document.createElement('li');
    slide.classList.add('main-slider__slide', 'product', 'product--details-on-image');

    const image = document.createElement('div');
    image.classList.add('product__image');

    const details = document.createElement('p');
    details.classList.add('product__details');

    const name = document.createElement('span');
    name.classList.add('product__name');
    name.textContent = item.name;

    const price = document.createElement('span');
    price.classList.add('product__price');
    price.textContent = typeof item.price === 'number'
      ? format(item.price)
      : `${ format(item.price.from) } - ${ format(item.price.to) }`;

    if (item.oldPrice) {
      const oldPrice = document.createElement('span');
      oldPrice.classList.add('product__previous-price');
      oldPrice.textContent = format(item.oldPrice);

      price.prepend(oldPrice);
    }

    details.appendChild(name);
    details.appendChild(price);
    slide.appendChild(image);
    slide.appendChild(details);
    slides.appendChild(slide);
  });
};

const renderPaymentProviders = () => {
  document.querySelector('.footer__payment-providers > img').src = PaymentProviders;
};

renderLogo();
renderBackgroundsDependingOnDevice();
handleSlider();
renderProductImages();
renderPaymentProviders();
