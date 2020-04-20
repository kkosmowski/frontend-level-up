import './styles/style.scss';
import Logo from './assets/images/logo-zonex.svg';
import PaymentProviders from './assets/images/payment.png';
import SliderProducts from './assets/slider-products';

const isDesktop = matchMedia('(min-width: 1000px) and (pointer: fine').matches;
const isMobile = matchMedia('(max-width: 599px)').matches;

function debounce(f, wait, immediate) { // debounce function to avoid too many event listener function executions
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) f.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) f.apply(context, args);
  };
}

const renderLogo = () => {
  document.querySelector('.header__logo > img').src = Logo;
};

const renderBackgroundsDependingOnDevice = (header) => {
  // optimize assets depending on whether the device is a mobile or desktop
  header.classList.add(isMobile ? 'mobile' : 'desktop');
};

const renderProductImages = () => {
  // get a placeholder of exact size and use it as a source to each .product__image element
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
  const format = (number) => `$${ number.toFixed(2) }`;

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
    price.textContent = typeof item.price === 'number'
      ? format(item.price) // if price is single
      : `${ format(item.price.from) } - ${ format(item.price.to) }`; // if price is a range

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
  // render footer payments image
  document.querySelector('.footer__payment-providers > img').src = PaymentProviders;
};

const handleFooterSelects = (header, overlay, mobileMenuButton) => {
  const customSelects = document.querySelectorAll('div.select');

  [header, overlay, mobileMenuButton].map((item) => item.addEventListener('click', () => {
    // custom blur

    [...customSelects].map((select) => {
      select.querySelector('input[type=checkbox]').checked = false;
    });

    overlay.classList.remove('active', 'overlay--select');
  }));

  [...customSelects].map((select) => {
    const checkbox = select.querySelector('input[type=checkbox]');
    const placeholder = select.querySelector('.placeholder');
    const name = select.dataset.name;

    checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      if (checkbox.checked) overlay.classList.add('overlay--select', 'active');
    });

    select.addEventListener('click', (e) => {
      if (e.target.name === name) {
        e.target.checked = true;
        checkbox.checked = false;
        overlay.classList.remove('active', 'overlay--select');

        placeholder.textContent = e.target.value;
        [...select.querySelectorAll('.option')].map((option) => option.classList.remove('current'));
        e.target.parentNode.classList.add('current');
      }
    });
  });
};

const handleScroll = (header) => {
  const headerBar = document.querySelector('.header__bar');
  const mobileMenu = document.querySelector('.main-nav--mobile');
  const goToTheTop = document.querySelector('.go-to-the-top');
  const height = window.innerHeight;

  const checkScrollY = debounce(() => {
    window.scrollY > height
      ? goToTheTop.classList.add('sticky')
      : goToTheTop.classList.remove('sticky');

    if (window.scrollY > header.getBoundingClientRect().height) {
      headerBar.classList.add('scrolled');
      mobileMenu.classList.add('scrolled');
    } else {
      headerBar.classList.remove('scrolled');
      mobileMenu.classList.remove('scrolled');
    }
  }, 30);

  window.addEventListener('scroll', checkScrollY);
};

const handleMobileMenu = (header, overlay, mobileMenuButton) => {
  const headerWrapper = document.querySelector('.header__wrapper');
  const desktopMenu = document.querySelector('.main-nav');
  const mobileMenu = desktopMenu.cloneNode(true);
  let mobileMenuVisible = false;
  mobileMenu.classList.remove('main-nav');
  mobileMenu.classList.add('main-nav--mobile');

  header.append(mobileMenu);

  const showMenu = () => {
    mobileMenu.classList.add('visible');
    overlay.classList.add('overlay--nav', 'active', 'visible');
  };

  const hideMenu = () => {
    mobileMenu.classList.remove('visible');
    overlay.classList.remove('active', 'visible', 'overlay--nav');
  };

  mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuVisible = !mobileMenuVisible;

    mobileMenuVisible && !overlay.classList.contains('overlay--select') ? showMenu() : hideMenu();
  });

  overlay.addEventListener('click', (e) => {
    e.stopPropagation();

    if (mobileMenuVisible) {
      mobileMenuVisible = !mobileMenuVisible;
      hideMenu();
    }
  });

  [mobileMenu, headerWrapper].map((item) => item.addEventListener('click', () => {
    mobileMenuVisible = !mobileMenuVisible;
    hideMenu();
  }));
};

const init = () => {
  const header = document.querySelector('.main-header');
  const overlay = document.querySelector('.overlay');
  const mobileMenuButton = document.querySelector('.header__mobile-menu-button');

  renderLogo();
  renderBackgroundsDependingOnDevice(header);
  handleSlider();
  renderProductImages();
  renderPaymentProviders();
  handleFooterSelects(header, overlay, mobileMenuButton);
  handleMobileMenu(header, overlay, mobileMenuButton);
  handleScroll(header);
};

init();
