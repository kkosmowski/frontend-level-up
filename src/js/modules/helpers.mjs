const renderProductPrice = (item, price, renderOldPriceFirst) => {
  price.textContent = item.price.current.text;

  if (item.price.previous.text) {
    const oldPrice = document.createElement('span');
    oldPrice.classList.add('product__previous-price');
    oldPrice.textContent = item.price.previous.text;

    renderOldPriceFirst ? price.prepend(oldPrice) : price.append(oldPrice);
  }
};

const mockedProduct = {
  type: '',
  name: 'Product name',
  price: {
    current: {
      value: 49.99,
      text: '$49.99',
    },
    previous: {
      value: null,
      text: '',
    },
  },
  imageUrl: '//via.placeholder.com/314x400.png',
};

export { renderProductPrice, mockedProduct };
