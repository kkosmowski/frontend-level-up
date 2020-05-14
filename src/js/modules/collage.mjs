const renderCollageProducts = (productList) => {
  // when products are received, update each mocked product with actual data
  productList.map((item) => { // take single item out of received product list
    const productElement = document.querySelector('.products-collage .product--mocked'); // assign first found mocked product
    // update its name and image
    productElement.querySelector('.product__name').textContent = item.name;
    productElement.querySelector('.product__image').style.backgroundImage = `url('${ '//' + item.imageUrl }')`;

    productElement.classList.remove('product--mocked'); // product is no longer mocked
  })
};

export default renderCollageProducts;
