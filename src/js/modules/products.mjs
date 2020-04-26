const renderProductImages = () => {
  // get a placeholder of exact size and use it as a source to each .product__image element
  [...document.querySelectorAll('.product__image')].map((productImage) => {
    let { width, height } = productImage.getBoundingClientRect();
    productImage.style.backgroundImage = `url(//via.placeholder.com/${ Math.floor(width) }x${ Math.floor(height) }.png)`
  });
};

export default renderProductImages;
