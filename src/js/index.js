import '../styles/style.scss';
import { handleMobileMenu, renderBackgroundsBasedOnDevice, renderLogo } from './modules/header';
import { handleFooterSelects, renderPaymentProviders, setFooterYear } from './modules/footer';
import handleSlider, { renderMockedSlider } from './modules/slider';
import handleScroll from './modules/scroll';
import { handleAllProductsButton, renderMockedItems, renderNewArrivals } from './modules/products';
import renderCollageProducts from './modules/collage';
import HttpService from './modules/httpService';

const init = () => {
  const sliderItemCount = 7;
  const newArrivalsItemCount = 8;
  const collageItemCount = 4;

  const header = document.querySelector('.main-header');
  const overlay = document.querySelector('.overlay');
  const mobileMenuButton = document.querySelector('.header__mobile-menu-button');

  renderLogo();
  renderBackgroundsBasedOnDevice(header);
  renderMockedSlider(sliderItemCount);
  renderMockedItems(newArrivalsItemCount);
  const start = (new Date()).getTime();
  (new HttpService()).get(`https://asos2.p.rapidapi.com/products/v2/list?country=US&currency=USD&sort=freshness&lang=en-US&sizeSchema=US&offset=0&categoryId=4209&limit=${ sliderItemCount + newArrivalsItemCount + collageItemCount }&store=US`)
    .then(data => {
      const sliderProducts = data.products.slice(0, sliderItemCount);
      const newArrivalsProducts = data.products.slice(sliderItemCount, sliderItemCount + newArrivalsItemCount);
      const collageProducts = data.products.slice(sliderItemCount + newArrivalsItemCount, sliderItemCount + newArrivalsItemCount + collageItemCount);
      handleSlider(sliderProducts);
      renderNewArrivals(newArrivalsProducts, newArrivalsItemCount);
      renderCollageProducts(collageProducts);
    });

  handleAllProductsButton(sliderItemCount + collageItemCount, newArrivalsItemCount);
  setFooterYear();
  renderPaymentProviders();
  handleFooterSelects(header, overlay, mobileMenuButton);
  handleMobileMenu(header, overlay, mobileMenuButton);
  handleScroll(header);
};

document.addEventListener('DOMContentLoaded', () => init());
