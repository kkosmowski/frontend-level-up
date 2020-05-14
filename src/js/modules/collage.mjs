const renderCollageProducts = (productList) => {
  productList.map((item) => {
    const productElement = document.querySelector('.products-collage .product--mocked');

    productElement.querySelector('.product__name').textContent = item.name;
    productElement.querySelector('.product__image').style.backgroundImage = `url('${ '//' + item.imageUrl }')`;

    productElement.classList.remove('product--mocked');
  })
};

export default renderCollageProducts;
