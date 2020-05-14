const renderProductPrice = (item, price, renderOldPriceFirst) => {
  price.textContent = item.price.current.text;

  if (item.price.previous.text) {
    const oldPrice = document.createElement('span');
    oldPrice.classList.add('product__previous-price');
    oldPrice.textContent = item.price.previous.text;

    renderOldPriceFirst ? price.prepend(oldPrice) : price.append(oldPrice);
  }
};

export { renderProductPrice };
