import NewArrivalsProducts from '../../assets/new-arrivals-products';
import { renderProductPrice } from './helpers';

let renderedProducts = 0;
const productsToRender = 8; // amount of products initially displayed / dynamically added

const newArrivalsContent = document.querySelector('.new-arrivals > .section__content');
const allProductsButton = document.querySelector('.new-arrivals > .section__button');

const types = {
  'bestseller': {
    classes: ['fas', 'fa-bullseye'],
    name: 'Bestseller',
  },
  'hot': {
    classes: ['fas', 'fa-fire-alt'],
    name: 'Hot',
  },
  'new': {
    classes: ['fas', 'fa-bolt'],
    name: 'New',
  },
  'top-rate': {
    classes: ['far','fa-star'],
    name: 'Top rate',
  },
  'few-left': {
    classes: ['fas','fa-battery-quarter'],
    name: 'Only a few left',
  },
};

const renderProductImages = () => {
  // get a placeholder of exact size and use it as a source to each .product__image element
  [...document.querySelectorAll('.product__image')].map((productImage) => {
    if (!productImage.style.backgroundImage) {
      let { width, height } = productImage.getBoundingClientRect();
      productImage.style.backgroundImage = `url(//via.placeholder.com/${ Math.floor(width) }x${ Math.floor(height) }.png)`
    }
  });
};

const handleAllProductsButton = () => allProductsButton.addEventListener('click', renderNewArrivals);

const renderNewArrivals = () => {
  const toRenderList = NewArrivalsProducts.slice(renderedProducts, renderedProducts + productsToRender);

  toRenderList.map((item) => {
    const product = document.createElement('div');
    product.classList.add('product', 'new-arrivals__product');

    const image = document.createElement('div');
    image.classList.add('product__image');
    product.append(image);

    const details = document.createElement('div');
    details.classList.add('product__details');

    let type;
    if (item.type) {
      type = document.createElement('span');
      type.classList.add('product__type');

      const typeIcon = document.createElement('i');
      typeIcon.classList.add(...types[item.type].classes);

      const typeName = document.createElement('span');
      typeName.classList.add('product__type-name');
      typeName.textContent = types[item.type].name;

      type.append(typeIcon);
      type.append(typeName);
      details.append(type);
    }

    const name = document.createElement('a');
    name.href = '#';
    name.classList.add('product__name');
    name.textContent = item.name;
    details.append(name);

    let price;
    if (item.price) {
      price = document.createElement('span');
      renderProductPrice(item, price, false);
      details.append(price);
    }

    let buttons;
    if (item.addToCart || item.options) {
      buttons = document.createElement('div');
      buttons.classList.add('product__buttons');

      if (item.addToCart) {
        const addToCart = document.createElement('button');
        addToCart.type = 'button';
        addToCart.classList.add('button', 'button--text', 'product__add-to-cart-button');
        addToCart.textContent = 'Add to cart';
        buttons.append(addToCart);
      }

      if (item.options) {
        const actions = document.createElement('div');
        actions.classList.add('product__actions');

        const detailsOption = document.createElement('button');
        detailsOption.type = 'button';
        detailsOption.classList.add('button', 'button--icon', 'product__details-button');

        const detailsIcon = document.createElement('i');
        detailsIcon.classList.add('fas', 'fa-search');
        detailsOption.append(detailsIcon);

        const favoriteOption = document.createElement('button');
        favoriteOption.type = 'button';
        favoriteOption.classList.add('button', 'button--icon', 'product__favorite-button');

        const favoriteIcon = document.createElement('i');
        favoriteIcon.classList.add('far', 'fa-heart');
        favoriteOption.append(favoriteIcon);

        actions.append(detailsOption);
        actions.append(favoriteOption);
        buttons.append(actions);
      }

      details.append(buttons);
    }

    product.append(details);
    newArrivalsContent.append(product);
    renderedProducts++;

    if (renderedProducts >= NewArrivalsProducts.length) {
      allProductsButton.disabled = true;
      return;
    }
  });

  renderProductImages();
};
export { renderNewArrivals, handleAllProductsButton };
