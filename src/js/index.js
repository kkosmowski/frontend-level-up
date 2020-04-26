import '../styles/style.scss';
import { handleMobileMenu, renderBackgroundsBasedOnDevice, renderLogo } from './modules/header';
import { handleFooterSelects, renderPaymentProviders, setFooterYear } from './modules/footer';
import handleSlider from './modules/slider';
import handleScroll from './modules/scroll';
import { handleAllProductsButton, renderNewArrivals } from './modules/products';

const init = () => {
  const header = document.querySelector('.main-header');
  const overlay = document.querySelector('.overlay');
  const mobileMenuButton = document.querySelector('.header__mobile-menu-button');

  renderLogo();
  renderBackgroundsBasedOnDevice(header);
  handleSlider();
  renderNewArrivals();
  handleAllProductsButton();
  setFooterYear();
  renderPaymentProviders();
  handleFooterSelects(header, overlay, mobileMenuButton);
  handleMobileMenu(header, overlay, mobileMenuButton);
  handleScroll(header);
};

document.addEventListener('DOMContentLoaded', () => init());
