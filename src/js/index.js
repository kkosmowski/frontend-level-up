import '../styles/style.scss';
import { handleMobileMenu, renderBackgroundsBasedOnDevice, renderLogo } from './modules/header';
import { handleFooterSelects, renderPaymentProviders, setFooterYear } from './modules/footer';
import handleSlider, { renderMockedSlider } from './modules/slider';
import handleScroll from './modules/scroll';
import { handleAllProductsButton, renderMockedItems, renderNewArrivals } from './modules/products';
import renderCollageProducts from './modules/collage';
import HttpService from './modules/httpService';

const init = () => {
  const APIURL = 'https://asos2.p.rapidapi.com/products/v2/list?country=US&currency=USD&sort=freshness&lang=en-US&sizeSchema=US&offset=0&categoryId=4209';
  const sliderItemCount = 7; // amount of products displayed in Slider
  const newArrivalsItemCount = 8; // amount of products displayed in New Arrivals (initially & for each load)
  const collageItemCount = 4; // amount of products in the featured products

  const header = document.querySelector('.main-header');
  const overlay = document.querySelector('.overlay');
  const mobileMenuButton = document.querySelector('.header__mobile-menu-button');

  renderLogo();
  renderBackgroundsBasedOnDevice(header);

  renderMockedSlider(sliderItemCount); // mock the slider
  renderMockedItems(newArrivalsItemCount); // mock the New Arrivals
  // featured products need no mocking, they are static

  (new HttpService()).get(`${ APIURL }&limit=${ sliderItemCount + newArrivalsItemCount + collageItemCount }&store=US`)
    .then(data => { // fetch only as much as we need (for slider, new arrivals and featured)
      const sliderProducts = data.products.slice(0, sliderItemCount);
      const newArrivalsProducts = data.products.slice(sliderItemCount, sliderItemCount + newArrivalsItemCount);
      const collageProducts = data.products.slice(sliderItemCount + newArrivalsItemCount, sliderItemCount + newArrivalsItemCount + collageItemCount);
      handleSlider(sliderProducts); // render actual products in the Slider
      renderNewArrivals(newArrivalsProducts, newArrivalsItemCount); // render actual products in the New Arrivals
      renderCollageProducts(collageProducts); // render actual products in the products collage
    });

  handleAllProductsButton(sliderItemCount + collageItemCount, newArrivalsItemCount);
  setFooterYear();
  renderPaymentProviders();
  handleFooterSelects(header, overlay, mobileMenuButton);
  handleMobileMenu(header, overlay, mobileMenuButton);
  handleScroll(header);
};

document.addEventListener('DOMContentLoaded', () => init());
