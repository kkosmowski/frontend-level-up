import { mockedProduct, renderProductPrice } from './helpers';
import HttpService from './httpService';

let renderedProducts = 0;

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

const handleAllProductsButton = (otherItemCount, newArrivalsItemCount) => allProductsButton.addEventListener('click', () => {
  allProductsButton.disabled = true;
  renderMockedItems(newArrivalsItemCount);
  return (new HttpService()).get(`https://asos2.p.rapidapi.com/products/v2/list?country=US&currency=USD&sort=freshness&lang=en-US&sizeSchema=US&offset=${ otherItemCount + renderedProducts }&categoryId=4209&limit=${ newArrivalsItemCount }&store=US`)
    .then(data => {
      renderNewArrivals(data.products);
      allProductsButton.disabled = false;
    });
});

const renderMockedItems = (itemCount) => {
  (new Array(itemCount)).fill(mockedProduct).map((item) => {
    const product = document.createElement('div');
    product.classList.add('product', 'product--mocked', 'new-arrivals__product');

    const image = document.createElement('div');
    image.classList.add('product__image');
    product.append(image);

    const details = document.createElement('div');
    details.classList.add('product__details');

    let type;
    type = document.createElement('span');
    type.classList.add('product__type');
    details.append(type);

    const name = document.createElement('a');
    name.href = '#';
    name.classList.add('product__name');
    details.append(name);

    let price = document.createElement('span');
    price.classList.add('product__price');
    details.append(price);

    let buttons = document.createElement('div');
    buttons.classList.add('product__buttons');

    const addToCart = document.createElement('button');
    addToCart.type = 'button';
    addToCart.classList.add('button', 'button--text', 'product__add-to-cart-button');
    addToCart.textContent = 'Add to cart';
    buttons.append(addToCart);

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

    details.append(buttons);
    product.append(details);
    newArrivalsContent.append(product);
  });
};

const renderNewArrivals = (productList) => {
  renderedProducts += productList.length;

  productList.map((item) => {
    const productElement = document.querySelector('.new-arrivals__product.product--mocked');

    productElement.querySelector('.product__image').style.backgroundImage = `url('${ '//' + item.imageUrl }')`;
    productElement.querySelector('.product__name').textContent = item.name;

    const type = productElement.querySelector('.product__type');
    if (item.isSellingFast) {
      const typeIcon = document.createElement('i');
      typeIcon.classList.add(...types['hot'].classes);

      const typeName = document.createElement('span');
      typeName.classList.add('product__type-name');
      typeName.textContent = types['hot'].name;

      type.append(typeIcon);
      type.append(typeName);
    }

    renderProductPrice(item, productElement.querySelector('.product__price'), false);

    productElement.classList.remove('product--mocked');
  });
};

export { renderMockedItems, renderNewArrivals, handleAllProductsButton };
