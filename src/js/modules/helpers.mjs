const priceFormat = (number) => `$${ number.toFixed(2) }`;

const renderProductPrice = (item, price, renderOldPriceFirst) => {
  price.textContent = typeof item.price === 'number'
    ? priceFormat(item.price) // if price is single
    : `${ priceFormat(item.price.from) } - ${ priceFormat(item.price.to) }`; // if price is a range

  if (item.oldPrice) {
    const oldPrice = document.createElement('span');
    oldPrice.classList.add('product__previous-price');
    oldPrice.textContent = priceFormat(item.oldPrice);

    renderOldPriceFirst ? price.prepend(oldPrice) : price.append(oldPrice);
  }
};



export { priceFormat, renderProductPrice };
